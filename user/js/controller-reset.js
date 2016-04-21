var app = angular.module("App");

app.controller("resetController", function($scope, $location, $auth, $routeParams, $http, toaster)
{
	var accessAPI = 'http://microservicios.org/v1';
	var accessEndpoints =
	{
		recover: "/auth/recover"
	};

	var token = $routeParams.token;

	$scope.reset = function()
	{
		var password = $scope.newPass;

		var data = 
		{
			token: token,
			password: password
		};

		$http.post(accessAPI + accessEndpoints.recover, data).
		then(function(response)
		{
			var data = response.data;

			if(!data.success)
			{
				showError(data.error);
				return;
			}

			$location.path("/");
			showSuccess("password updated");
		},
		function(response)
		{
			showError(response.data ? response.data.error : "service not available");
		});
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
