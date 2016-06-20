var app = angular.module("App");

app.controller("ProfileController", function($scope, $location, $auth, $http, toaster)
{
	var service = $scope.service("app", "profile");

	$scope.formData = {};

	$scope.getProfile = function()
	{
		$http.get(service)
		.then(function(response)
		{
			var profile = response.data;
			$scope.formData.name = profile.name;
			$scope.formData.lastname = profile.lastname;
			$scope.formData.mail = profile.email;
		},
		function(error)
		{
			$scope.error(response.data ? response.data.error : "service not available");
		});
	};

	$scope.saveProfile = function()
	{
		var params =
		{
			name: $scope.formData.name,
			lastname: $scope.formData.name,
		};

		$http.post(service, params)
		.then(function(response)
		{
			$scope.success("Changes saved");
		},
		function(error)
		{
			$scope.error(response.data ? response.data.error : "service not available");
		});
	};

	$scope.getProfile();
});
