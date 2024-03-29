var app = angular.module("App");

app.controller("AccessController", function($scope, $location, $auth, $http)
{
	$scope.login = function()
	{
		$scope.credentials =
		{
			email: $scope.email,
			password: $scope.password
		};

		$auth.login($scope.credentials).then(function(response)
		{
			var data = response.data;

			if(data.success)
			{
				$location.path("/");
			}
			else
			{
				alert(data.error);
			}
		});
	};

	$scope.signup = function()
	{
		$scope.credentials =
		{
			email: $scope.email,
			password: $scope.password
		};

		$auth.signup($scope.credentials).then(function(response)
		{
			var data = response.data;

			if(data.success)
			{
				$location.path("/");
			}
			else
			{
				alert(data.error);
			}
		});
	};

   $scope.go = function (url) {
      $location.path(url);
	};
});
