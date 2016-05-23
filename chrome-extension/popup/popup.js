window.onload =  function () {
	//Function to set Text Box with set Jira Domain
	chrome.runtime.sendMessage({type: "get_domain"}, function (response) {
		if(response.type == "Error") {
			console.log("Error: "+ response.emsg);
			document.getElementById('user_domain').value = "";
		}
		console.log("Setting Text with value: " + response.user_domain);
		document.getElementById('user_domain').value = response.user_domain;
	});

	document.getElementById('set_domain').onclick = function () {
		var user_domain = document.getElementById('user_domain').value;
		chrome.runtime.sendMessage({type: "set_domain", user_domain: user_domain}, function (response) {
			if(response.type == "Error") {
				console.log("Error: " + response.emsg);
				console.log("Resetting the user domain");
				chrome.runtime.sendMessage({type: "get_domain"}, function (response) {
					if(response.type == "Error") {
						document.getElementById('user_domain').value = "";
					} else {
						document.getElementById('user_domain').value = response.user_domain;
					}
				});
			}
		});
	}
}
