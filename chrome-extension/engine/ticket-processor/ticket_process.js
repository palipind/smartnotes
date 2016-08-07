var ticket_process = {
    /**
     * A callback method which gets tickets assigned
     * to the currently logged in user.
     * This is a async call therefore pass function
     * as an argument when calling this method to handle the callback response.
     */
    getTickets: function(callback) {
        $.ajax({
            url: 'https://'+CURRENT_USER_DOMAIN+'/rest/api/2/search',
            type: 'GET',
            data: 'jql=status!=done AND assignee='+USER_NAME,
            success: function(response) {
                var issues = response["issues"];
                var ticketIds = [];
                for(var i=0;i<issues.length;i++) {
                    ticketIds.push(issues[i]["key"]);
                }
                callback(ticketIds);
            }
        });
    },
    addComment: function(issueId, selectionText) {
        var request_data = "{\"body\": "+JSON.stringify(selectionText)+"}";
        $.ajax({
            url: 'https://'+CURRENT_USER_DOMAIN+'/rest/api/2/issue/'+issueId+'/comment',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            type: 'POST',
            data: request_data
        }).fail( function(response){
            console.log('ERROR: \nStatus Code: '+response.status
                + '\tStatus Text: '+response.statusText);
            console.log(response);
        });
    }
}