var app = angular.module("App");

app.controller("ProfileController", function($scope, $location, $auth, $http, toaster)
{
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
		var params =
		{
			name: $scope.formData.name,
			lastname: $scope.formData.name,
		};

		$scope.call("auth", "user", "profile", params, "post", function(response)
		{
			$scope.success("Changes saved");
			$location.path("/account");
		});
	};

	$scope.getProfile();
});
