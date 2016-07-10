/*var g_issues = chrome.contextMenus.create({"title": "Issues"});
//Replace with Rohans API: var tickets = getJiraTickets();
g_child1 = chrome.contextMenus.create({"title": "Issue1", "parentId": g_issues, 
			"contexts":["selection"], "onclick": postNote});
g_child2 = chrome.contextMenus.create({"title": "Issue2", "parentId": g_issues, 
			"contexts":["selection"], "onclick": postNote});
*/
window.onload = function () {
	jira_domain.getJiraDomain(); 	//Get Jira Domain on background load.
	menu.designContextMenu();		//Design right click menu
}
/*
function postNote()
{
	console.log('Clicked: '+ JSON.stringify(info));
			console.log('Next step- Update web');
			console.log('TAB: '+tab);
}*/


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	try {
		//TODO: Make this a switch case in future
		if(request.type == "set_domain") {
			jira_domain.storeJiraDomain(request, sendResponse);
		} else if(request.type == "get_domain") {
			jira_domain.fetchJiraDomain(sendResponse);
		}
        else if(request.type == "get_tickets") {
        }
	} catch(err) {
		console.log('Error: Message Type or User Domain undefined');
		sendResponse({type:"Error", emsg: err.message});
	}
	return true; //This is required to tell reciever that we will be sending 						//response asynchronously
});
