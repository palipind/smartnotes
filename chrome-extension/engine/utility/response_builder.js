var response_builder = {
	makeStartupResponse: function(callback) {
		callback({
    		type: "Success", 
    	 	user_domain: CURRENT_USER_DOMAIN, 
    	 	valid_domain: VALID_DOMAIN,
      		user_authentication: USER_AUTHENTICATION
        });
	}
}