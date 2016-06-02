var app = angular.module("App");

app.controller("ForgotController", function($scope, $location, $auth, $http, toaster)
{
	var recoverRequestService = $scope.accessAPI + $scope.endpoints.recover_request;

    $scope.rescue = function()
	{
		var email = $scope.email;

		var data =
		{
			email: email
		};

		$http.post(recoverRequestService, data).
		then(function(response)
		{
			var data = response.data;
			$location.path("/");
			$scope.showSuccess("check your mail inbox");
		},
		function(response)
		{
			$scope.showError(response.data ? response.data.error : "service not available");
		});
    };
});
