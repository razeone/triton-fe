var app = angular.module("App");

app.controller("forgotController", function($scope, $location, $auth, $http, toaster)
{
	var accessAPI = 'http://microservicios.org/v1';
	var accessEndpoints =
	{
		recover: "/auth/recover_request"
	};

    $scope.rescue = function()
	{
		var email = $scope.email;

		var data = 
		{
			email: email
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
			showSuccess("check your mail inbox");
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

