var app = angular.module("App");

app.controller("AccessController", AccessController);
AccessController.$inject = ['$scope', '$auth', '$location'];
function AccessController($scope, $auth, $location)
{
	var val = $scope.validation;

	$scope.form = {};


	$scope.login = function()
	{
		var params = val.params($scope.form, ["email", "password"]);
		if(params === null) { $scope.error("params required"); return; }

		if(!val.email(params.email))
		{
			$scope.error("email invalid");
			return;
		}

		$scope.call("auth", "user", "login", params, "post", function(response)
		{
			$auth.setToken(response.token);

			$location.path("/account");
			$scope.success("access granted");
		});
	};

	$scope.signup = function()
	{
		var params = val.params($scope.form, ["email", "password", "name", "lastname"]);
		if(params === null) { $scope.error("params required"); return; }

		if(!val.email(params.email))
		{
			$scope.error("email invalid");
			return;
		}

		$scope.call("auth", "user", "signup", params, "post", function(response)
		{
			$location.path("/login");
			$scope.success("check your mail inbox");
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
}
