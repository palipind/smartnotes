var menu = ( function () {
	return {
		designContextMenu: function (callback) {
			//Just Create the Parent- Add children Dynamically
			chrome.contextMenus.create({"id": "issues_parent", "title": "Issues",
				"contexts":["selection"]});
			callback();
		},
		postNote: function (info, tab) {
			postComment = info.selectionText + "\nAdded From: " + info.pageUrl;
			ticket_process.addComment(ISSUES_MAP[info.menuItemId], postComment);
		},
		updateContextMenu: function (tickets) {
			len = tickets.length;
			add_more = (len > ISSUES_NUMBER); //Check to see if we need to create more
			min = add_more ? ISSUES_NUMBER : len;
			for (i = 0; i < min; ++i)
			{
				id_s = "issues" + i;
				issue_name = tickets[i];
				chrome.contextMenus.update(id_s, {"title": issue_name});
				ISSUES_MAP[id_s] = issue_name;
			}
			if(add_more) {
				for(i = min; i < len; ++i)
				{
					id_s = "issues" + i;
					issue_name = tickets[i];
					var item = chrome.contextMenus.create({"id" : id_s, "title": issue_name,
									"parentId": "issues_parent" ,"contexts":["selection"], 
									"onclick": this.postNote});
					ISSUES_MAP[id_s] = issue_name;
				}
			} else {
				for(i = min; i < ISSUES_NUMBER; ++i)
				{
					id_s = "issues"+i;
					chrome.contextMenus.remove(id_s); //remove surplus
					delete ISSUES_MAP[id_s];
				}
			}
			ISSUES_NUMBER = len;
		},
		cleanUp: function () {
			for(i = 0; i < ISSUES_NUMBER; ++i)
			{
				id_s = "issues"+i;
				chrome.contextMenus.remove(id_s);
			}
			ISSUES_NUMBER = 0;
		},
		redesign: function () {
			if(VALID_DOMAIN && USER_AUTHENTICATION) {
				ticket_process.getTickets( function(ticketIds) {
			        menu.updateContextMenu(ticketIds);
			    });
			} else {
				//Clear the right-click menu
				this.cleanUp();
			}
		}
	};
})();