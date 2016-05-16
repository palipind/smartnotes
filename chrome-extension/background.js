
current_user_domain = null; 		//Initially null
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse){
	try
	{
		if(request.type == "set_domain")
		{
			storeJiraDomain(request, sendResponse);
		}
		else if(request.type == "get_domain")
		{
			getJiraDomain(sendResponse);
		}
	}
	catch(err)
	{
		console.log('Error: Message Type or User Domain undefined');
		sendResponse({type:"Error", emsg: err.message});
	}
	return true;		//This is required to tell reciever that we will be sending 
						//response asynchronously
});

function storeJiraDomain(msg, sendResponse)
{
	if(msg.type == "set_domain")
	{
		chrome.storage.sync.set({"user_jira_domain": msg.user_domain});
		sendResponse({type:"Success"});
		current_user_domain = msg.user_domain;
	}
}

function getJiraDomain(sendResponse)
{
	if(current_user_domain)
	{
		sendResponse({type:"Success", user_domain:current_user_domain});
	}
	else
	{	
		chrome.storage.sync.get("user_jira_domain", function(values)
		{
			current_user_domain = values.user_jira_domain; //lazy initialization
			sendResponse({type: "Success", user_domain: current_user_domain});
		});
	}
}