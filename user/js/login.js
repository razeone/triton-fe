var app = angular.module("App", ["satellizer"]);

var valid_endpoints =
{
	'login': 'http://localhost:8085/auth/login'
}

app.config(function($authProvider)
{
	$authProvider.loginUrl = valid_endpoints.login;
});

app.controller("LoginController", function($scope, $auth)
{
	console.log($auth.isAuthenticated());

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

			if(data.success)
			{
				alert("ok");
			}
			else
			{
				alert(data.error);
			}

			console.log($auth.isAuthenticated());
		});
	}
});

