var app = angular.module("App", ["ngRoute", "toaster", "satellizer", "ngAnimate", "nvd3"]);

var accessAPI = "http://microservicios.org/v1";
var appAPI = "http://microservicios.org/v1";

var endpoints =
{
	login: "/auth/login",
	signup: "/auth/users",
	logout: "/auth/logout",
	recover: "/auth/recover",
	recover_request: "/auth/recover_request",
	profile: "/profile/profile"
};

var navigation =
{
	login: "templates/login.html",
	signup: "templates/signup.html",
	index: "templates/index.html",
	profiles: "templates/profiles.html",
	add_profile: "templates/add_profile.html",
	billing: "templates/billing.html",
	forgot: "templates/forgot.html",
	reset: "templates/reset.html",
	home: "templates/home.html"
};

var testNavigation = false;

app.run(function($rootScope, toaster)
{
	$rootScope.accessAPI = accessAPI;
	$rootScope.appAPI = appAPI;
	$rootScope.endpoints = endpoints;

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
});

app.config(function($routeProvider, $authProvider)
{
	$authProvider.baseUrl = accessAPI;
	$authProvider.loginUrl = endpoints.login;
	$authProvider.signupUrl = endpoints.signup;
	$authProvider.authToken = 'JWT';

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

	if(testNavigation) loginRequired = skipIfLoggedIn;

	$routeProvider
	.when("/",
	{
		templateUrl: navigation.index,
		controller: "IndexController",
		resolve: { loginRequired: loginRequired }
	})
	.when("/login",
	{
		templateUrl: navigation.login,
		controller: "AccessController",
		resolve:{ skipIfLoggedIn: skipIfLoggedIn }
	})
	.when("/signup",
	{
		templateUrl: navigation.signup,
		controller: "AccessController",
		resolve:{ skipIfLoggedIn: skipIfLoggedIn }
	})
	.when("/profiles",
	{
		templateUrl: navigation.profiles,
		controller: "IndexController",
		resolve: { loginRequired: loginRequired }
	})
	.when("/add_profiles",
	{
		templateUrl: navigation.add_profile,
		controller: "IndexController",
		resolve: { loginRequired: loginRequired }
	})
	.when("/billing",
	{
		templateUrl: navigation.billing,
		controller: "IndexController",
		resolve: { loginRequired: loginRequired }
	})
	.when("/forgot",
	{
		templateUrl: navigation.forgot,
		controller: "IndexController",
		resolve: { skipIfLoggedIn: skipIfLoggedIn }
	})
    .when("/home",
	{
		templateUrl: navigation.home,
		controller: "IndexController",
		resolve: { skipIfLoggedIn: skipIfLoggedIn }
	})
	.when("/reset/:token",
	{
		templateUrl: navigation.reset,
		controller: "IndexController",
		resolve: { skipIfLoggedIn: skipIfLoggedIn }
	})
	.otherwise
	({
		redirectTo: "/"
	});
});
