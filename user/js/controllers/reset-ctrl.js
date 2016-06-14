var app = angular.module("App");

app.controller("ResetController", function($scope, $location, $auth, $routeParams, $http, toaster)
{
	var service = $scope.service("auth", "recover");
	var token = $routeParams.token;

	$scope.reset = function()
	{
		var password = $scope.newPass;

		var params =
		{
			token: token,
			password: password
		};

		$http.post(service, params).
		then(function(response)
		{
			var data = response.data;
			
			$location.path("/");
			$scope.success("password updated");
		},
		function(response)
		{
			$scope.error(response.data ? response.data.error : "service not available");
		});
    };
});
