var app = angular.module("App");

app.controller("ForgotController", function($scope, $location)
{
	var val = $scope.validation;

	$scope.form = {};


	$scope.rescue = function()
	{
		var params = val.params($scope.form, ["email"]);
		if(params == null) { $scope.error("email required"); return; }

		if(!val.email(params.email))
		{
			$scope.error("email invalid");
			return;
		}

		$scope.call("app", "user", "recover_request", params, "post", function(response)
		{
			$location.path("/");
			$scope.success("check your mail inbox");
		});
	};
});
