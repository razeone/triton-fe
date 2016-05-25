var app = angular.module("App");

app.controller("AccessController", function($scope, $location, $auth, $http, toaster)
{
	$scope.login = function()
	{
		var complete = $scope.validField($scope.email, "email");
		complete = complete && $scope.validField($scope.password, "password");
		if(!complete) return;

		$scope.credentials =
		{
			email: $scope.email,
			password: $scope.password
		};

		$auth.login($scope.credentials).then(function(response)
		{
			var data = response.data;
			$scope.showSuccess("access granted");
			$location.path("/");
		},
		function(response)
		{
			$scope.showError(response.data ? response.data.error : "service not available");
		});
	};

	$scope.signup = function()
	{
		var complete = $scope.validField($scope.email, "email");
		complete = complete && $scope.validField($scope.password, "password");
		complete = complete && $scope.validField($scope.name, "name");
		complete = complete && $scope.validField($scope.lastname, "lastname");
		if(!complete) return;

		$scope.credentials =
		{
			email: $scope.email,
			password: $scope.password,
			name: $scope.name,
			lastname: $scope.lastname
		};

		$auth.signup($scope.credentials).then(function(response)
		{
			var data = response.data;
			$location.path("/");
			$scope.showSuccess("check your mail inbox");
		},
		function(response)
		{
			$scope.showError(response.data ? response.data.error : "service not available");
		});
	};

	$scope.social_auth = function(provider)
	{
		if($scope.social_auth_providers.indexOf(provider) < 0)
		{
			$scope.showError("auth not available");
			return;
		}

		$auth.authenticate(provider)
		.then(function()
		{
			$scope.showSuccess("access granted");
			$location.path("/");
		})
		.catch(function(error)
		{
			if(error.error) $scope.showError(error.error);
			else if(error.data) $scope.showError(error.data.message);
			else $scope.showError(error);
		});
	};

	$scope.toggleModal = function()
	{
		$('#t_and_c_m').modal();
	};
});
