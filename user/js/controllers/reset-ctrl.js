var app = angular.module("App");

app.controller("ResetController", function($scope, $location, $auth, $routeParams, $http, toaster)
{
	var recoverService = $scope.accessAPI + $scope.endpoints.recover;
	var token = $routeParams.token;

	$scope.reset = function()
	{
		var password = $scope.newPass;

		var data =
		{
			token: token,
			password: password
		};

		$http.post(recoverService, data).
		then(function(response)
		{
			var data = response.data;
			$location.path("/");
			$scope.showSuccess("password updated");
		},
		function(response)
		{
			$scope.showError(response.data ? response.data.error : "service not available");
		});
    };
});
