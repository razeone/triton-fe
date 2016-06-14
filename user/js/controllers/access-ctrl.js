var app = angular.module("App");

app.controller("AccessController", function($scope, $location, $auth, $http, toaster)
{
	$scope.login = function()
	{
		var complete = $scope.field($scope.email, "email");
		complete = complete && $scope.field($scope.password, "password");
		if(!complete) return;

		$scope.credentials =
		{
			email: $scope.email,
			password: $scope.password
		};

		$auth.login($scope.credentials).then(function(response)
		{
			var data = response.data;

			$location.path("/");
			$scope.success("access granted");
		},
		function(response)
		{
			$scope.error(response.data ? response.data.error : "service not available");
		});
	};

	$scope.signup = function()
	{
		var complete = $scope.field($scope.email, "email");
		complete = complete && $scope.field($scope.password, "password");
		complete = complete && $scope.field($scope.name, "name");
		complete = complete && $scope.field($scope.lastname, "lastname");
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
			$scope.success("check your mail inbox");
		},
		function(response)
		{
			$scope.error(response.data ? response.data.error : "service not available");
		});
	};

	$scope.social_auth = function(provider)
	{
		if($scope.social_auth_providers.indexOf(provider) < 0)
		{
			$scope.error("auth not available");
			return;
		}

		$auth.authenticate(provider)
		.then(function()
		{
			$scope.success("access granted");
			$location.path("/");
		})
		.catch(function(error)
		{
			if(error.error) $scope.error(error.error);
			else if(error.data) $scope.error(error.data.message);
			else $scope.error(error);
		});
	};

	$scope.toggleModal = function()
	{
		$('#t_and_c_m').modal();
	};
});
