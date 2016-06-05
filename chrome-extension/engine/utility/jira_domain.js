var jira_domain = ( function () {
	return {
		storeJiraDomain: function (msg, sendResponse) {
			if(msg.type == "set_domain") {
				chrome.storage.sync.set({"user_jira_domain": msg.user_domain});
				CURRENT_USER_DOMAIN = msg.user_domain;
				sendResponse({ type:"Success" });
			}
		},
		loadJiraDomain: function (sendResponse) {
			if(CURRENT_USER_DOMAIN) {
				sendResponse({ type:"Success", user_domain: CURRENT_USER_DOMAIN });
			} else {	
				chrome.storage.sync.get("user_jira_domain", function (values) {
					CURRENT_USER_DOMAIN = values.user_jira_domain; //lazy initialization
					sendResponse({type: "Success", user_domain: CURRENT_USER_DOMAIN});
				});
			}
		},
        getJiraDomain: function() {
            if(CURRENT_USER_DOMAIN != "" || CURRENT_USER_DOMAIN != null) {
                return CURRENT_USER_DOMAIN;
            }
            else {
                window.open("popup/popup.html", "extension_popup", "width=400,height=100");
            }
            return null;
        }
	};
})();