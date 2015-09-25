CLIENT_ID = "367393827472-dm44e1puvndsd9je57ceatdldd05sjju.apps.googleusercontent.com";
REDIRECT_URI = "http://gsyncredir.atsdevelopment.com.br";

$(document).ready(function(){
	$("#btn-login").click(function() {

		location.href = "https://accounts.google.com/o/oauth2/auth?response_type=code&client_id="+CLIENT_ID+"&redirect_uri="+REDIRECT_URI+"&scope=http%3A%2F%2Fwww.google.com%2Fm8%2Ffeeds";

	});

	$("#btn-sync").click(function() {
		$("#img-logo").attr("src", "img/loading.gif");

		var config = {
			'client_id': CLIENT_ID,
			'immediate':true,
			'scope': 'https://www.google.com/m8/feeds'
		};

		gapi.auth.authorize(config, function(){
			var token = gapi.auth.getToken();
			if(token != null){
				start_sync(token);

				$("#img-logo").attr("src", "img/google-logo.png");
			}else{
				alert("Você deve fazer login primeiro!");
			}
		});
	});

	function start_sync(token){
		$.ajax({
			url: 'https://www.google.com/m8/feeds/contacts/default/full?max-results=99999999&alt=json',
			dataType: 'jsonp',
			data: token
		}).done(function(data) {
			//console.log(JSON.stringify(data));
			var entrys = JSON.parse(JSON.stringify(data)).feed.entry;

			entrys.forEach(save);
		});
	}

	function save(value, index, ar){
		//var contact = new mozContact();

		var nome = value.title.$t;
		var mail, fone;

		try{
			mail = value.gd$mail[0].address;
		}catch(exception){}

		try{
			fone = value.gd$phoneNumber[0].$t;
		}catch(exception){}

		if(!exists(fone)){
			//cria contato
		}
	}

	function exists(number){
		var cursor = navigator.mozContacts.getAll({});

		cursor.onsuccess = function () {
			if(cursor.result()){
				console.log(cursor.result);
				cursor.continue();
			}
		}
	}



	function createContact(){
		var contact = new mozContact();
		contact.init({name: ['Contato Inicial']});

		var request = navigator.mozContacts.save(contact);

		request.onsuccess = function(){
			alert("Primeiro contato salvo!");
		}
		request.onerror = function(){
			alert("Erro ao salvar o primeiro contato: ");

		}
	}

	createContact();

});