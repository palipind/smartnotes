var jira_domain = {
	/* 
	 * This module contains code relating to storing/loading 'User'
	 * jira domain to/from chrome storage api
	 */ 
	storeJiraDomain: function (msg, sendResponse) {
		if(msg.type == "set_domain") {
			chrome.storage.sync.set({"user_jira_domain": msg.user_domain});
			CURRENT_USER_DOMAIN = msg.user_domain;
			sendResponse({ type:"Success" });
            reinit();
		}
	},
    loadJiraDomain: function (callback) {
		chrome.storage.sync.get("user_jira_domain", function (values) {
			CURRENT_USER_DOMAIN = 
				(values.user_jira_domain == undefined) ? "" : values.user_jira_domain;
			callback();
		});
    }
}