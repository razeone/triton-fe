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

app.run(function($rootScope, $http, toaster)
{
	var utils = require('./helpers/utils')(content);
	utils.services($rootScope, config.api, $http);
   utils.alerts($rootScope, toaster);
   utils.form($rootScope);

	$rootScope.social_auth_providers = [];
	for(social in config.social_auth)
	{
		$rootScope.social_auth_providers.push(social);
	}
});
