$(function(){

	var valid_endpoints = {
		'login': '/'
	}

	var active_controllers = ['login_button'];

	function login(){
		var username = $('#username').val()
		var password = $('#password').val()
		// TO-DO add this function
		alert("Username: " + username + "\nPassword: " + password)
	}

	$('#loginButton').click(function(){
		login();
	});

});