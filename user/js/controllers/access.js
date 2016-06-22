var app = angular.module("App");

app.controller("AccessController", function($scope, $location, $auth, $http, toaster)
{
	$scope.login = function()
	{
		var form =
		{
			email: $scope.email,
			password: $scope.password
		};

		var params = $scope.params(form, ["email", "password"], []);
		if(params == null) return;

		$auth.login(form).then(function(response)
		{
			var data = response.data;

			$location.path("/account");
			$scope.success("access granted");
		},
		function(response)
		{
			var data = error.data;
			var message = data ? (data.msg ? data.msg : "service not found") : "service not available";
			$scope.error(message);
		});
	};

	$scope.signup = function()
	{
		var form =
		{
			email: $scope.email,
			password: $scope.password,
			name: $scope.name,
			lastname: $scope.lastname
		};

		var params = $scope.params(form, ["email", "password", "name", "lastname"], []);
		if(params == null) return;

		$auth.signup(form).then(function(response)
		{
			var data = response.data;

			$location.path("/");
			$scope.success("check your mail inbox");
		},
		function(response)
		{
			var data = error.data;
			var message = data ? (data.msg ? data.msg : "service not found") : "service not available";
			$scope.error(message);
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
			$location.path("/account");
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
