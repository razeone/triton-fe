var app = angular.module("App", ["satellizer"]);

var api = 'http://localhost:8085'

var valid_endpoints =
{
	'login': '/auth/login',
	'signup': '/auth/signup',
	'authtest': '/auth/test'
}

app.config(function($authProvider)
{
	$authProvider.baseUrl = api;
	$authProvider.loginUrl = valid_endpoints.login;
	$authProvider.signupUrl = valid_endpoints.signup;
	$authProvider.authToken = 'JWT';
});

app.controller("AccessController", function($scope, $auth, $http)
{
	$scope.login = function()
	{
		$scope.credentials =
		{
			username: $scope.username,
			password: $scope.password
		}

		$auth.login($scope.credentials).then(function(response)
		{
			var data = response.data;

			if(data.success) alert("access granted");
			else alert(data.error);
		});
	}

	$scope.signup = function()
	{
		$scope.credentials =
		{
			username: $scope.username,
			password: $scope.password
		}

		$auth.signup($scope.credentials).then(function(response)
		{
			var data = response.data;

			if(data.success) alert("user created");
			else alert(data.error);
		});
	}

	$scope.logout = function()
	{
		$auth.logout();
		alert("out");
	}

	$scope.test = function()
	{
		$http.get(api + valid_endpoints.authtest).
		then(function(response)
		{
			var data = response.data;
			alert(data);
		},
		function(response)
		{
			console.log(response);
		});
	}
});
