$(document).ready(function(){
	$("#btn").click(function(){
		var LINK = "https://accounts.google.com/o/oauth2/auth";
		var RESPONSE_TYPE = "?response_type=token";
		var CLIENT_ID = "&client_id=367393827472-dm44e1puvndsd9je57ceatdldd05sjju.apps.googleusercontent.com";
		var REDIRECT_URI = "&redirect_uri=http://gsync.app/auth-c.html";
		var SCOPE = "&scope=http://www.google.com/m8/feeds";

		var URL = LINK+RESPONSE_TYPE+CLIENT_ID+REDIRECT_URI+SCOPE;

		location.href=URL;
		
	});
});