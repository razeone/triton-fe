var config = require('./config');
var content = require('./content');

var app = angular.module("App", ["ngRoute", "satellizer", "toaster", "ngAnimate", "nvd3"]);
var navigation = require('./navigation')(content);


app.config(function($routeProvider, $authProvider)
{
	$authProvider.baseUrl = config.api.auth;
	$authProvider.loginUrl = content.services.login;
	$authProvider.signupUrl = content.services.signup;
	$authProvider.authToken = 'JWT';

	$authProvider.facebook
	({
		clientId: config.social_auth.facebook
	});

	$authProvider.github
	({
		clientId: config.social_auth.github
	});

	$authProvider.google
	({
		clientId: config.social_auth.google
	});

	navigation.create($routeProvider);
});

app.run(function($rootScope, toaster)
{
	$rootScope.service = function(type, service)
	{
		return config.api[type] + content.services[service];
	}

	$rootScope.success = function(message)
	{
		toaster.pop
		({
			type: "alert",
			body: message,
			showCloseButton: true,
			timeout: 2000
		});
	}

	$rootScope.error = function(message)
	{
		toaster.pop
		({
			type: "error",
			body: message,
			showCloseButton: true,
			timeout: 3000
		});
	}

	$rootScope.field = function(field, fieldName)
	{
		if(typeof field === "undefined" || field.length === 0)
		{
			$scope.error(fieldName + " is required");
			return false;
		}
		return true;
	};

	$rootScope.social_auth_providers = [];
	for(social in config.social_auth)
	{
		$rootScope.social_auth_providers.push(social);
	}
});
