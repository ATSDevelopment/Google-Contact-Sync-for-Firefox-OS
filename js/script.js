CLIENT_ID = "367393827472-t1tfnn1m9l6jskem07nasottck3lotp6.apps.googleusercontent.com";

$(document).ready(function(){

	$("#btn-login").click(function() {

		location.href = "https://accounts.google.com/o/oauth2/auth?response_type=code&client_id="+CLIENT_ID+"&redirect_uri=http%3A%2F%2Flocalhost%2Fwww%2FG_SYNC%2Findex.html&scope=http%3A%2F%2Fwww.google.com%2Fm8%2Ffeeds&state=5604e3b5c51e2";

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
			alert(JSON.stringify(data));
		});
	}
});