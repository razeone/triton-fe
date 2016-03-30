$(function(){

	var valid_endpoints = {
		'login': 'http://localhost:8085/auth/login'
	};

	var active_controllers = ['login_button'];

	function login(){
		var username = $('#username').val();
		var password = $('#password').val();
		// TO-DO add this function
		$.ajax({
		  method: "POST",
		  url: valid_endpoints.login,
		  data: {
							'username': username,
							'password': password
						},
			beforeSend: function( xhr ) {
		    xhr.overrideMimeType( "application/json;" );
		  }

		})
		  .done(function( msg ) {
		    alert( "Data Saved: " + msg );
		  });

			}

	$('#loginButton').click(function(){
		login();
	});

});
