var config = require('./config');
var app = angular.module("App", ["ngRoute", "toaster", "satellizer", "ngAnimate", "nvd3"]);

app.run(function($rootScope, toaster)
{
	$rootScope.accessAPI = config.auth.api;
	$rootScope.appAPI = config.app.api;
	$rootScope.endpoints = config.endpoints;

	$rootScope.social_auth_providers = [];
	for(social in config.auth.social)
	{
		$rootScope.social_auth_providers.push(social);
	}

	var showMessage = function(message, type)
	{
		toaster.pop
		({
			body: message,
			type: type,
			showCloseButton: true,
			timeout: 3000
		});
	}

	$rootScope.showSuccess = function(message)
	{
		showMessage(message, "alert");
	}

	$rootScope.showError = function(message)
	{
		showMessage(message, "error");
	}

	$rootScope.validField = function(field, fieldName)
	{
		if(typeof field == "undefined" || field.length == 0)
		{
			$scope.showError(fieldName + " is required");
			return false;
		}
		return true;
	}
});

app.config(function($routeProvider, $authProvider)
{
	$authProvider.baseUrl = config.auth.api;
	$authProvider.loginUrl = config.endpoints.login;
	$authProvider.signupUrl = config.endpoints.signup;
	$authProvider.authToken = 'JWT';

	$authProvider.facebook
	({
		clientId: config.auth.social.facebook
	});

	$authProvider.github
	({
		clientId: config.auth.social.github
	});

	$authProvider.google
	({
		clientId: config.auth.social.google
	});

	var skipIfLoggedIn = function($q, $location, $auth)
	{
      var deferred = $q.defer();
      if($auth.isAuthenticated()) { deferred.reject(); }
		else { deferred.resolve(); }
      return deferred.promise;
	};

	var loginRequired = function($q, $location, $auth)
	{
      var deferred = $q.defer();
      if($auth.isAuthenticated()) { deferred.resolve(); }
		else { $location.path("/login"); }
      return deferred.promise;
	};

	if(config.navigation.test) loginRequired = skipIfLoggedIn;

	var navigation = config.navigation.screens;
	var templates = config.navigation.templates;

	for(n in navigation)
	{
		var nav = navigation[n];
		$routeProvider.when(nav.url,
		{
			templateUrl: templates + nav.tpl,
			controller: nav.ctrl,
			resolve: { resolve: nav.login ? loginRequired : skipIfLoggedIn }
		});
	}

	$routeProvider.otherwise
	({
		redirectTo: "/"
	});
});
