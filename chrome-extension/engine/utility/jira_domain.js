var jira_domain = ( function () {
	return {
		storeJiraDomain: function (msg, sendResponse) {
			if(msg.type == "set_domain") {
				chrome.storage.sync.set({"user_jira_domain": msg.user_domain});
				CURRENT_USER_DOMAIN = msg.user_domain;
				sendResponse({ type:"Success" });
			}
		},
		fetchJiraDomain: function (sendResponse) {
			sendResponse({type: "Success", user_domain: this.getJiraDomain()});
		},
        //remove this method and use CURRENT_USER_DOMAIN wherever this method is used//
        getJiraDomain: function () {
        	if(!CURRENT_USER_DOMAIN) {
        		chrome.storage.sync.get("user_jira_domain", function (values) {
        			CURRENT_USER_DOMAIN = 
        				(values.user_jira_domain == undefined) ? "" : values.user_jira_domain;
        		});
        	}
        	return CURRENT_USER_DOMAIN;
        },
        //This function is required for onload, since we need to make sure we have
        //jira domain before we can make get tickets request.
        //@TODO: Research if we can safely remove the null check in getJiraDomain
        //since we would already have the domain once loadJiraDomain is called.
        //CURRENT_USER_DOMAIN should be set onLoad as the app uses the global variable to get the domain
        loadJiraDomain: function (callback) {
    		chrome.storage.sync.get("user_jira_domain", function (values) {
    			CURRENT_USER_DOMAIN = 
    				(values.user_jira_domain == undefined) ? "" : values.user_jira_domain;
    			callback();
    		});
        }
	};
})();