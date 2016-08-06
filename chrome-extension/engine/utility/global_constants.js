var CURRENT_USER_DOMAIN = null;//Initially null
var VALID_DOMAIN = false;// Initially false
var USER_AUTHENTICATION = false;// Initially false
var AUTHENTICATION_ERROR_THROWN = "Unauthorized";
var GLOBAL_MESSAGE = {
    AUTHENTICATION_ERROR : "Field 'assignee' does not exist or this field cannot be viewed by anonymous users."
};
var ISSUES_NUMBER = 0; //This variable will hold the number of Issues assigned to the user currently
var ISSUES_MAP = {};