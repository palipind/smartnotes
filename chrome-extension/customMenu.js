var menu = ( function () {
	return {
		designContextMenu: function (callback) {
			//Just Create the Parent- Add children Dynamically
			chrome.contextMenus.create({"id": "issues_parent", "title": "Issues",
				"contexts":["selection"]});
			callback();
		},
		postNote: function (info, tab) {
			console.log('Clicked: '+ JSON.stringify(info));
			console.log('Next step- Update web');
			console.log('TAB: '+tab);
		},
		updateContextMenu: function (tickets) {
			len = tickets.length;
			add_more = (len > ISSUES_NUMBER); //Check to see if we need to create more
			min = add_more ? ISSUES_NUMBER : len; 
			for (i = 0; i < min; ++i)
			{
				id_s = "issues" + i;
				chrome.contextMenus.update(id_s, {"title": tickets[i]});
			}
			if(add_more) {
				for(i = min; i < len; ++i)
				{
					id_s = "issues" + i;
					var item = chrome.contextMenus.create({"id" : id_s, "title": tickets[i],
									"parentId": "issues_parent" ,"contexts":["selection"], 
									"onclick": this.postNote});
				}
			} else {
				for(i = min; i < ISSUES_NUMBER; ++i)
				{
					id_s = "issues"+i;
					chrome.contextMenus.remove(id_s); //remove surplus
				}
			}
			ISSUES_NUMBER = len;
		}
	};
})();