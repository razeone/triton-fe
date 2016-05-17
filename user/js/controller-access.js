var app = angular.module("App");

app.controller("AccessController", function($scope, $location, $auth, $http, toaster)
{
	$scope.login = function()
	{
		if(typeof $scope.email == "undefined" || typeof $scope.password == "undefined")
		{
			$scope.showError("mail and password required");
			return;
		}

		$scope.credentials =
		{
			email: $scope.email,
			password: $scope.password
		};

		$auth.login($scope.credentials).then(function(response)
		{
			var data = response.data;

			if(!data.success)
			{
				$scope.showError(data.error);
				return;
			}

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
		if(typeof $scope.name == "undefined" || typeof $scope.lastname == "undefined" || typeof $scope.email == "undefined" || typeof $scope.password == "undefined")
		{
			$scope.showError("name, lastname, mail and password required");
			return;
		}

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

			if(!data.success)
			{
				$scope.showError(data.error);
				return;
			}

			$location.path("/");
			$scope.showSuccess("check your mail inbox");
		},
		function(response)
		{
			$scope.showError(response.data ? response.data.error : "service not available");
		});
	};

	$scope.toggleModal = function()
	{
		$('#t_and_c_m').modal();
	};
});
