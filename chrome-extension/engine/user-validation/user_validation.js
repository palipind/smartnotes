var authentication = {

    /**
     * Validates if user validation criteria is met by making get user api call
     * Validation criteria -
     * 1) Valid Jira domain - If response contains displayName or error response is 401(Unauthorized)
     * 2) User authentication - Parsing response throws exception or error response
     */
    handleValidation: function(callback) {
        $.ajax({
            url: 'https://'+CURRENT_USER_DOMAIN+'/rest/api/2/myself',
            type: 'GET',
            success: function(response) {
                try {
                    var data = response["displayName"];
                    VALID_DOMAIN = true;
                    USER_AUTHENTICATION = data != null ? true : false;
                }
                catch (e) {
                    VALID_DOMAIN = false;
                    USER_AUTHENTICATION = false;
                }
                callback();
            },
            error: function(xhr, status, errorThrown) {
                //can there be a case when domain is invalid and it returns error//
                if (xhr.status == 401 || errorThrown == AUTHENTICATION_ERROR_THROWN) {
                    VALID_DOMAIN = true;
                 }
                else {
                    VALID_DOMAIN = false;
                }
                USER_AUTHENTICATION = false;
                callback();
            },
            timeout: 3000
        });
    },
    validate: function() {
        this.handleValidation(function() {
            if(VALID_DOMAIN && USER_AUTHENTICATION) {
                chrome.browserAction.setIcon({ path: { "19": "resources/valid_icon19.png",
                    "38": "resources/valid_icon38.png" } });
            }
            else {
                chrome.browserAction.setIcon({ path: { "19": "resources/invalid_icon19.png",
                    "38": "resources/invalid_icon38.png" } });
            }
            menu.redesign();
        });
    }
}