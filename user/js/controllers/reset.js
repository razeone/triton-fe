var app = angular.module("App");

app.controller("ResetController", ResetController);
ResetController.$inject = [$scope, $location, $auth, $routeParams, $http, toaster];
function ResetController($scope, $location, $auth, $routeParams, $http, toaster)
{
	var val = $scope.validation;
	var token = $routeParams.token;

	$scope.form = {};


	$scope.reset = function()
	{
		var params = val.params($scope.form, ["password", "confirm"]);
		if(params === null) { $scope.error("password required"); return; }
		params.token =  token;

		$scope.call("auth", "user", "recover", params, "post", function(response)
		{
			$location.path("/");
			$scope.success("password updated");
		});
	};
}
