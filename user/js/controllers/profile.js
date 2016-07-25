var app = angular.module("App");

app.controller("ProfileController", ProfileController);
ProfileController.$inject = ['$scope', '$location'];
function ProfileController($scope, $location)
{
	var val = $scope.validation;

	$scope.formData = {};


	$scope.getProfile = function()
	{
		$scope.call("app", "user", "profile", {}, "get", function(response)
		{
			$scope.formData.name = response.name;
			$scope.formData.lastname = response.lastname;
			$scope.formData.mail = response.email;
		});
	};

	$scope.saveProfile = function()
	{
		var params = val.params($scope.formData, ["name", "lastname"]);
		if(params === null) { $scope.error("params required"); return; }

		$scope.call("auth", "user", "profile", params, "post", function(response)
		{
			$scope.success("Changes saved");
			$location.path("/account");
		});
	};

	$scope.getProfile();
}
