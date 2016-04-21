var app = angular.module("App");

app.controller("AccessController", function($scope, $location, $auth, $http, toaster)
{
	$scope.login = function()
	{
        if(typeof $scope.email == "undefined" || typeof $scope.password == "undefined")
        {
            showError("mail and password required");
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
				showError(data.error);
				return;
			}

			showMessage("access granted");
			$location.path("/");
		},
		function(response)
		{
			showError(response.data ? response.data.error : "service not available");
		});
	};

	$scope.signup = function()
	{
        if(typeof $scope.email == "undefined" || typeof $scope.password == "undefined")
        {
            showError("mail and password required");
            return;
        }

		$scope.credentials =
		{
			email: $scope.email,
			password: $scope.password
		};

		$auth.signup($scope.credentials).then(function(response)
		{
			var data = response.data;

			if(!data.success)
			{
				showError(data.error);
				return;
			}

			$location.path("/");
			showSuccess("check your mail inbox");
		},
		function(response)
		{
			showError(response.data ? response.data.error : "service not available");
		});
	};

	$scope.toggleModal = function()
	{
		$('#t_and_c_m').modal();
	};

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
