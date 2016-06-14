var app = angular.module("App");

app.controller("ForgotController", function($scope, $location, $auth, $http, toaster)
{
	var service = $scope.service("auth", "recover_request");

	$scope.rescue = function()
	{
		var email = $scope.email;

		var params =
		{
			email: email
		};

		$http.post(service, params).
		then(function(response)
		{
			var data = response.data;

			$location.path("/");
			$scope.success("check your mail inbox");
		},
		function(response)
		{
			$scope.error(response.data ? response.data.error : "service not available");
		});
    };
});
