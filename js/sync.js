CLIENT_ID = "367393827472-dm44e1puvndsd9je57ceatdldd05sjju.apps.googleusercontent.com";

$(document).ready(function(){

	$("#btn").click(function() {
		var config = {
			'client_id': CLIENT_ID,
			"immediate": true,
			'scope': 'https://www.google.com/m8/feeds'
		};

		try{
			gapi.auth.authorize(config, function(){
				var token = gapi.auth.getToken();
				console.log(token);
			});
		}catch(exception){
			console.log("Erro ao obter token");
			console.log(exception);
		}
	});

});