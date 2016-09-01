window.onload =  function () {
	//Function to set Text Box with set Jira Domain
	chrome.runtime.sendMessage({type: "get_startup_properties"}, function (response) {
		if(response.type == "Error") {
			console.log("Error: "+ response.emsg);
			document.getElementById('user_domain').value = "";
		}
		console.log("Setting Text with value: " + response.user_domain);
		document.getElementById('user_domain').value = response.user_domain;
        loadPopupBody(response.valid_domain, response.user_authentication);

	});

	document.getElementById('set_domain').onclick = function () {
		var user_domain = document.getElementById('user_domain').value;
        $('#wait_indicator').removeClass("hide");
		chrome.runtime.sendMessage({type: "set_domain", user_domain: user_domain}, function (response) {
			if(response.type == "Error") {
				console.log("Error: " + response.emsg);
				console.log("Resetting the user domain");
				chrome.runtime.sendMessage({type: "get_startup_properties"}, function (response) {
					if(response.type == "Error") {
						document.getElementById('user_domain').value = "";
					} else {
						document.getElementById('user_domain').value = response.user_domain;
					}
				});
			}
		});
	};

    document.getElementById('auth_row').onclick = function () {
        var domain = "http://"+document.getElementById('user_domain').value;
        window.open(domain);
    };
};

chrome.runtime.onMessage.addListener(function (request) {
    if(request.type == "refresh_popup") {
        loadPopupBody(request.valid_domain, request.user_authentication);
    }
});

function loadPopupBody(isValidDomain, isAuthenticated) {
	$('#wait_indicator').addClass("hide");
    if (isValidDomain == true) {
        $('#domain_success').removeClass("hide");
        $('#domain_error').addClass("hide");
        $('#user_domain').removeClass("invalid");
        $('#label_user_domain').removeClass("red-text");

    }
    else {
        $('#domain_error').removeClass("hide");
        $('#domain_success').addClass("hide");
        $('#user_domain').addClass("invalid");
        $('#label_user_domain').addClass("red-text");
    }

    if(isValidDomain == true && isAuthenticated == true) {
        document.getElementById('imgDomainVerified').className = "visible";
        document.getElementById('imgDomainUnverified').className = "invisible";
        document.getElementById('auth_row').style.visibility = "hidden";
    }
    else if (isValidDomain == true && isAuthenticated == false) {
        document.getElementById('imgDomainVerified').className = "visible";
        document.getElementById('imgDomainUnverified').className = "invisible";
        document.getElementById('auth_row').style.visibility = "visible";

    }
    else {
        document.getElementById('imgDomainVerified').className = "invisible";
        document.getElementById('imgDomainUnverified').className = "visible";
        document.getElementById('auth_row').style.visibility = "hidden";
    }
}

