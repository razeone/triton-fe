var app = angular.module("App");

app.controller("ProfileController", function($scope, $location, $auth, $http, toaster)
{
	var profileService = $scope.appAPI + $scope.endpoints.profile;

	$scope.formData = {};

	$scope.getProfile = function()
	{
		$http.get(profileService)
		.then(function(response)
		{
			var profile = response.data;
			$scope.formData.name = profile.name;
			$scope.formData.lastname = profile.lastname;
			$scope.formData.mail = profile.email;
		},
		function(error)
		{
			$scope.showError(response.data ? response.data.error : "service not available");
		});
	};

	$scope.saveProfile = function()
	{
		var params =
		{
			name: $scope.formData.name,
			lastname: $scope.formData.name,
		};

		$http.post(profileService, params)
		.then(function(response)
		{
			$scope.showSuccess("Changes saved");
		},
		function(error)
		{
			$scope.showError(response.data ? response.data.error : "service not available");
		});
	};

	$scope.getProfile();
});
