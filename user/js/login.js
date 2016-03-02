$(function(){

	var valid_endpoints = {
		'login': 'http://localhost:8085/auth/login'
	}

	var active_controllers = ['login_button'];

	function login(){
		var username = $('#email').val()
		var password = $('#password').val()
		var data = {"username": username, "password": password}
		// TO-DO add this function
		$.ajax({
		  method: "POST",
		  url: valid_endpoints.login,
		  contentType: "application/json",
		  data: JSON.stringify(data)
		})
		.done(function( msg ) {
		  alert( "Data Saved: " + JSON.stringify(msg) );
		});
	}

	$('#loginButton').click(function(){
		login();
	});

});
