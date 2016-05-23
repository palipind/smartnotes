chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	try {
		//TODO: Make this a switch case in future
		if(request.type == "set_domain") {
			jira_domain.storeJiraDomain(request, sendResponse);
		} else if(request.type == "get_domain") {
			jira_domain.loadJiraDomain(sendResponse);
		}
	} catch(err) {
		console.log('Error: Message Type or User Domain undefined');
		sendResponse({type:"Error", emsg: err.message});
	}
	return true;		//This is required to tell reciever that we will be sending 						//response asynchronously
});
