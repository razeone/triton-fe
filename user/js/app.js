var app = angular.module("App", ["ngRoute", "satellizer"]);

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
	billing: "templates/billing.html"
};

app.config(function($routeProvider, $authProvider)
{
	$authProvider.baseUrl = accessAPI;
	$authProvider.loginUrl = accessEndpoints.login;
	$authProvider.signupUrl = accessEndpoints.signup;
	$authProvider.authToken = 'JWT';

	$routeProvider
	.when("/",
	{
		templateUrl: navigation.index,
		controller: "IndexController",
		resolve: { loginRequired: skipIfLoggedIn } //loginRequired
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
		resolve: { loginRequired: skipIfLoggedIn } //loginRequired
	})
	.when("/add_profiles",
	{
		templateUrl: navigation.add_profile,
		controller: "IndexController",
		resolve: { loginRequired: skipIfLoggedIn }//loginRequired
	})
	.when("/billing",
	{
		templateUrl: navigation.billing,
		controller: "IndexController",
		resolve: { skipIfLoggedIn: skipIfLoggedIn }//loginRequired
	})
	.otherwise
	({
		redirectTo: "/"
	});

	function skipIfLoggedIn($q, $location, $auth)
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
    }

	function loginRequired($q, $location, $auth)
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
    }
});
