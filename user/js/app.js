var app = angular.module("App", ["ngRoute", "satellizer"]);

var accessAPI = 'http://localhost:8085';
var accessEndpoints =
{
	login: "/auth/login",
	signup: "/auth/signup"
};

var navigation =
{
	index: "./templates/index.html",
	login: "./templates/login.html"
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
		resolve: { loginRequired: loginRequired }
	})
	.when("/login",
	{
		templateUrl: navigation.login,
		controller: "AccessController",
		resolve:{ skipIfLoggedIn: skipIfLoggedIn }
	})
	.otherwise({
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
			$location.path("/");
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
