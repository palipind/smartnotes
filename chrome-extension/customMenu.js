var menu = ( function () {
	return {
		designContextMenu: function () {
			//get current user tickets
			//Replace with Rohans API: var tickets = getJiraTickets();
			
			//Just Create the Parent- Add children Dynamically
			chrome.contextMenus.create({"id": "issues_parent", "title": "Issues",
				"contexts":["selection"]});

			
		},
		postNote: function (info, tab) {
			console.log('Clicked: '+ JSON.stringify(info));
			console.log('Next step- Update web');
			console.log('TAB: '+tab);
		},
		updateContextMenu: function () {
			var tickets = [
				{"name": "Issue1"},
				{"name": "Issue2"},
				{"name": "Issue3"}
				];
			for( i in tickets)
			{
				//console.log(tickets[ticket]);
				var item = chrome.contextMenus.create({"title": tickets[i].name,
								"parentId": "issues_parent" ,"contexts":["selection"], "onclick": this.postNote});
			}
		}
	};
})();