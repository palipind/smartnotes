var jira_domain = ( function () {
	return {
		storeJiraDomain: function (msg, sendResponse) {
			if(msg.type == "set_domain") {
				chrome.storage.sync.set({"user_jira_domain": msg.user_domain});
				CURRENT_USER_DOMAIN = msg.user_domain;
				sendResponse({ type:"Success" });
                authentication.validate();
			}
		},
		fetchJiraDomain: function (sendResponse) {
			sendResponse({type: "Success", user_domain: CURRENT_USER_DOMAIN});
		},
        loadJiraDomain: function (callback) {
    		chrome.storage.sync.get("user_jira_domain", function (values) {
    			CURRENT_USER_DOMAIN = 
    				(values.user_jira_domain == undefined) ? "" : values.user_jira_domain;
    			callback();
    		});
        }
	};
})();