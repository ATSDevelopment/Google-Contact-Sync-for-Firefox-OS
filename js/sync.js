REQUEST_CONFIG = {'client_id': '367393827472-dm44e1puvndsd9je57ceatdldd05sjju.apps.googleusercontent.com','immediate':true,'scope': 'https://www.google.com/m8/feeds'};

$(document).ready(function(){
	// fetch contacts

	$("#btn-sync").click(function(){
		gapi.auth.authorize(REQUEST_CONFIG, function(){
			console.log(gapi.auth.getToken());
		});
		alert('asd');
	});

});