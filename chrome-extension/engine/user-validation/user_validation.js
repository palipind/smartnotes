var authentication = {

    /**
     * Validates if user validation criteria is met by making get user api call
     * Validation criteria -
     * 1) Valid Jira domain - If response contains displayName or error response is 401(Unauthorized)
     * 2) User authentication - Parsing response throws exception or error response
     */
    computeGlobalAuthConstants: function(callback) {
        $.ajax({
            url: 'https://'+CURRENT_USER_DOMAIN+'/rest/api/2/myself',
            type: 'GET',
            success: function(response) {
                try {
                    var username = response["name"];
                    VALID_DOMAIN = true;
                    USER_AUTHENTICATION = username != null ? true : false;
                    USER_NAME = username;
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
    }
}