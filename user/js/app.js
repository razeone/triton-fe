var app = angular.module("App", ["ngRoute", "toaster", "satellizer", "ngAnimate"]);

var accessAPI = 'http://localhost:8085/v1';
var accessEndpoints =
{
	login: "/auth/login",
	signup: "/auth/users"
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
	reset: "templates/reset.html"
};

var testNavigation = true;

app.config(function($routeProvider, $authProvider)
{
	$authProvider.baseUrl = accessAPI;
	$authProvider.loginUrl = accessEndpoints.login;
	$authProvider.signupUrl = accessEndpoints.signup;
	$authProvider.authToken = 'JWT';

	var skipIfLoggedIn = function($q, $location, $auth)
	{
      var deferred = $q.defer();
      if($auth.isAuthenticated())
		{
			deferred.reject();
      }
		else
		{
			deferred.resolve();
      }
      return deferred.promise;
	};

	var loginRequired = function($q, $location, $auth)
	{
      var deferred = $q.defer();
      if($auth.isAuthenticated())
		{
        deferred.resolve();
      }
		else
		{
        $location.path("/login");
      }
      return deferred.promise;
	};

	if(testNavigation) loginRequired = skipIfLoggedIn;

	$routeProvider
	.when("/",
	{
		templateUrl: navigation.index,
		controller: "IndexController",
		resolve: { loginRequired: loginRequired } //
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
		resolve: { loginRequired: loginRequired } //
	})
	.when("/add_profiles",
	{
		templateUrl: navigation.add_profile,
		controller: "IndexController",
		resolve: { loginRequired: loginRequired } //
	})
	.when("/billing",
	{
		templateUrl: navigation.billing,
		controller: "IndexController",
		resolve: { loginRequired: loginRequired } //
	})
	.when("/forgot",
	{
		templateUrl: navigation.forgot,
		controller: "IndexController",
		resolve: { skipIfLoggedIn: skipIfLoggedIn }
	})
	.when("/reset",
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
