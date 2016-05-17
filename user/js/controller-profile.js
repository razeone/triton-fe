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
			var data = response.data;

			if(!data.success)
			{
				$scope.showError(data.error);
				return;
			}

			var profile = data.profile[0];

			$scope.formData.name = profile.name;
			$scope.formData.lastname = profile.lastname;
		});
	};

	$scope.saveProfile = function()
	{
		var params =
		{
			name: $scope.formData.name,
			lastname: "Mundo" //$scope.lastname
		};

		$http.post(profileService, params)
		.then(function(response)
		{
			$scope.showSuccess("Changes saved");
		});
	};

	$scope.getProfile();
});
