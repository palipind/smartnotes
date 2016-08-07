window.onload = function () {
	//Get Jira Domain on background load.
	jira_domain.loadJiraDomain(function() {
		console.log(CURRENT_USER_DOMAIN);

        //Design right click menu
        menu.designContextMenu( function() {
			//Enable/Disable Plugin based on validation
	        replay();
		});
	});
}

function replay() {
	authentication.validate();
    refreshPopup();
    setTimeout(replay, 5000);
}

function refreshPopup() {
    chrome.runtime.sendMessage({type: "refresh_popup", valid_domain: VALID_DOMAIN, user_authentication:USER_AUTHENTICATION});
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	try {
		//TODO: Make this a switch case in future
		if(request.type == "set_domain") {
			jira_domain.storeJiraDomain(request, sendResponse);
		} else if(request.type == "get_startup_properties") {
            sendResponse({type: "Success", user_domain: CURRENT_USER_DOMAIN, valid_domain: VALID_DOMAIN,
                user_authentication: USER_AUTHENTICATION});
		}
	} catch(err) {
		console.log('Error: Message Type or User Domain undefined');
		sendResponse({type:"Error", emsg: err.message});
	}
	return true; 
	//This is required to tell reciever that we will be sending 						
	//response asynchronously
});
