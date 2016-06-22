var app = angular.module("App");

app.controller("ForgotController", function($scope, $location, $auth, $http, toaster)
{
	$scope.rescue = function()
	{
		var params =
		{
			email: $scope.email
		};

		$scope.call("app", "user", "recover_request", params, "post", function(response)
		{
			$location.path("/");
			$scope.success("check your mail inbox");
		});
	};
});
