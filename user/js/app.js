var app = angular.module("App", ["ngRoute", "satellizer", "toaster", "ngAnimate", "nvd3"]);
var config = require('./config');
var content = require('./content');


app.config(function($routeProvider, $authProvider)
{
	$authProvider.baseUrl = config.api.auth;
	$authProvider.loginUrl = content.services.user.login;
	$authProvider.signupUrl = content.services.user.signup;
	$authProvider.authToken = 'JWT';

	for(provider in config.social_auth)
	{
		$authProvider[provider]
		({
			clientId: config.social_auth[provider]
		});
	}

	var navigation = require('./helpers/navigation')(content);
	navigation.create($routeProvider);
});

app.run(function($rootScope, $auth, $http, $location, toaster)
{
	var alerts = require('./helpers/alerts')(toaster);
	var validation = require('./helpers/validation')();
	var services = require('./helpers/services')(config.api, content.services, $http, alerts.error);

	$rootScope.success = alerts.success;
   $rootScope.error = alerts.error;
   $rootScope.validation = validation;
   $rootScope.call = services.call;
   $rootScope.session = $auth.isAuthenticated;

	$rootScope.social_auth_providers = [];
	for(social in config.social_auth)
	{
		$rootScope.social_auth_providers.push(social);
	}
});
