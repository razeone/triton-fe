var app = angular.module("App");

app.controller("ProfileController", function($scope, $location, $auth, $http, toaster)
{
	var accessAPI = 'http://microservicios.org/v1';
	//var accessAPI = 'http://localhost:8086/v1';
	var accessEndpoints =
	{
		profile: "/profile/profile"
	};

	$scope.formData = {};

	$scope.getProfile = function()
	{
		$http.get(accessAPI + accessEndpoints.profile)
		.then(function(response)
		{
			var data = response.data;

			if(!data.success)
			{
				showError(data.error);
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

		$http.post(accessAPI + accessEndpoints.profile, params)
		.then(function(response)
		{
			showSuccess("Changes saved");
		});
	};

	$scope.getProfile();

	function showMessage(message, type)
	{
		toaster.pop
		({
			body: message,
			type: type,
			showCloseButton: true,
			timeout: 3000
		});
	}

	function showSuccess(message)
	{
		showMessage(message, "alert");
	}

	function showError(message)
	{
		showMessage(message, "error");
	}
});
