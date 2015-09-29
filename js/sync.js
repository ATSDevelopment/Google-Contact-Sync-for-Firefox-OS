$(document).ready(function(){
	$("#btn").click(function(){

		var param = location.href;
		param = param.split('#')[1];
		param = param.split('&')[0];

		var URL = 'https://www.google.com/m8/feeds/contacts/default/full?max-results=99999999&alt=json&'+param;

		var httpRequest = new XMLHttpRequest();

		httpRequest.onreadystatechange = function(){
			if (httpRequest.readyState === 4) {
				if (httpRequest.status === 200) {
					var response = httpRequest.responseText;

					var json = JSON.parse(response);

					var entrys = json.feed.entry;

					entrys.forEach(save);
				} else {
					console.log('There was a problem with the request.');
				}
			}
		};
		httpRequest.open('GET', URL);
		httpRequest.send();
	});

	function save(value, index, ar){
		var nome = value.title.$t;
		var mail, fone;
		try{
			mail = value.gd$mail[0].address;
		}catch(exception){}

		try{
			fone = value.gd$phoneNumber[0].$t;
		}catch(exception){}

		//console.log(nome+" - "+mail+" - "+fone);

		var givenName;
		var familyName;
		var nickname;

		if(nome.indexOf(' ') > 0){
			var array = nome.split(' ');
			givenName = array[0];
			familyName = "";
			nickname = array[0]+" "+array[1];
			array.forEach(function(value, index, array){
				if(index > 0){
					familyName = familyName+" "+value;
				}
			});
		}else{
			givenName = nome;
			familyName = "";
			nickname = nome;
		}

		var person = new mozContact();
		person.givenName  = [givenName];
		person.familyName = [familyName];
		person.nickname   = [nickname];
		person.tel = [{
			carrier: " ",
			value: fone
		}];
		person.email = [{
			type:["personal"],
			value: mail
		}];

		//console.log(person);
		var saving = navigator.mozContacts.save(person);
		saving.onsuccess = function(){
			console.log(nome+" Salvo!");
		};
		saving.onerror = function(){
			console.log("Erro ao salvar "+nome+" !")
		};
	}
});