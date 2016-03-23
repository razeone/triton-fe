var app = angular.module("App");

app.controller("AccessController", function($scope, $location, $auth, $http)
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

			if(data.success)
			{
				alert("access granted");
				$location.path("/");
			}
			else
			{
				alert(data.error);
			}
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

			if(data.success)
			{
				alert("user created");
				$location.path("/");
			}
			else
			{
				alert(data.error);
			}
		});
	}
});
