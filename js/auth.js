LINK = "https://accounts.google.com/o/oauth2/auth";
RESPONSE_TYPE = "?response_type=none";
CLIENT_ID = "&client_id=367393827472-dm44e1puvndsd9je57ceatdldd05sjju.apps.googleusercontent.com";
REDIRECT_URI = "&redirect_uri=http://gsync.redir.com/index.html";
SCOPE = "&scope=http://www.google.com/m8/feeds";

URL = LINK+RESPONSE_TYPE+CLIENT_ID+REDIRECT_URI+SCOPE;

$(document).ready(function () {
	// autenticação
	$("#btn-login").click(function(){
		location.href = URL;
	});

});