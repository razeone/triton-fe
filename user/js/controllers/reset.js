var app = angular.module("App");

app.controller("ResetController", function($scope, $location, $auth, $routeParams, $http, toaster)
{
	var token = $routeParams.token;

	$scope.reset = function()
	{
		var params =
		{
			token: token,
			password: $scope.newPass
		};

		$scope.call("auth", "user", "recover", params, "post", function(response)
		{
			$location.path("/");
			$scope.success("password updated");
		});
	};
});
