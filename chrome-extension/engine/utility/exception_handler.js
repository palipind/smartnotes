var exception_handler = {
    /**
     * Handles any exception caused from any API call.
     * Usage:  error: function(xhr){ exception_handler.handle(xhr); },
     * @param {xhr} The error response.
     */
    handle: function(xhr) {
        var errorMessage = JSON.parse(xhr.responseText);
        console.log("Error" +errorMessage);
        switch(true) {
            case (xhr.status == 400 && errorMessage.errorMessages[0] == GLOBAL_MESSAGE.AUTHENTICATION_ERROR) :
                this.handleAuthentication();
                break;
        }
    },
    
    /**
     * Called if user is not logged in 
     * if jira domain is set open jira cloud login page
     * else open popup to make user enter jira domain.
     */
    handleAuthentication: function () {
        var domain = jira_domain.getJiraDomain()
        if(domain != null) {
            window.open('https://'+domain+'/', '_blank');
        }
        else {
            this.handleUnsetDomain();
        }
    },

    handleUnsetDomain: function () {
        window.open("popup/popup.html", "extension_popup", "width=400,height=100");
    }
};


