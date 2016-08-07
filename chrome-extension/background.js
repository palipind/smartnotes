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
	reinit();
    setTimeout(replay, 5000);
}

function refreshPopup() {
    chrome.runtime.sendMessage({type: "refresh_popup", valid_domain: VALID_DOMAIN, user_authentication:USER_AUTHENTICATION});
}

function reinit() {
	authentication.computeGlobalAuthConstants(function() {
        if(VALID_DOMAIN && USER_AUTHENTICATION) {
            chrome.browserAction.setIcon({ path: { "19": "resources/valid_icon19.png",
                "38": "resources/valid_icon38.png" } });
        }
        else {
            chrome.browserAction.setIcon({ path: { "19": "resources/invalid_icon19.png",
                "38": "resources/invalid_icon38.png" } });
        }
        //menu.redesign() should be called only once computeGlobalAuthConstants returns. USER_NAME is set by that call
        menu.redesign();
        refreshPopup();
    });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	try {
		if(request.type == "set_domain") {
			jira_domain.storeJiraDomain(request, sendResponse);
		} else if(request.type == "get_startup_properties") {
            response_builder.makeStartupResponse(sendResponse);
		}
	} catch(err) {
		console.log('Error: Message Type or User Domain undefined');
		sendResponse({type:"Error", emsg: err.message});
	}
	return true; 
	//This is required to tell reciever that we will be sending 						
	//response asynchronously
});
