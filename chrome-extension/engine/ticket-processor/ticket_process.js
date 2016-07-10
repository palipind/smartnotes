var ticket_process = {
    /**
     * A callback method which gets tickets assigned
     * to the currently logged in user.
     * This is a async call therefore pass function
     * as an argument when calling this method to handle the callback response.
     */
    getTickets: function(callback) {
        var domain = jira_domain.getJiraDomain();
        this.getAssignee(domain, function(assignee) {
                $.ajax({
                    url: 'https://'+domain+'/rest/api/2/search',
                    type: 'GET',
                    data: 'jql=assignee='+assignee,
                    success: function(response) {
                        var issues = response["issues"];
                        var ticketIds = [];

                        for(var i=0;i<issues.length;i++) {
                            ticketIds.push(issues[i]["key"]);
                        }
                        callback(ticketIds);
                    }
                });
            });
    },

    /**
     * A call to JIRA is made to get the username
     * of currently logged in user.
     */
    getAssignee: function(domain, callback) {
        $.ajax({
            url: 'https://'+domain+'/rest/gadget/1.0/currentUser',
            type: 'GET',
            success: function(response) {
                var data = response["username"];
                callback(data);
            }
        });
    }
}