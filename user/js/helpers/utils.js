function init(content)
{
	var helper = {};

	var site = content.site;
	var home = site.home ? site.home : "#";
	var account = site.account ? site.account : "/account";


	var authFunctions = function($scope, $storage, $auth, $http, $location)
	{
		$scope.auth = function(service, params, role)
	   {
			$scope.call("auth", role, service, params, "post", function(response)
			{
				$auth.setToken(response.token);
	         $storage.role = role;
	         $storage.user = response;

				$location.path(account);
			});
	   }

		$scope.logout = function()
		{
			$auth.logout();
	      $storage.user = null;

	      $location.path(home);
		}

		$scope.role = function()
	   {
	      return $storage.role;
	   }

	   $scope.user = function()
	   {
	      return $storage.user;
	   }

		$scope.check = function(role)
		{
			if(role != $storage.role) $location.path(account);
		}
	}

	var serviceFunctions = function($scope, api, $http)
	{
		var services = content.services;

		$scope.service = function(type, role, service)
	   {
	      return api[type] + services[role][service];
	   }

		$scope.call = function(type, role, service, params, method, callback)
		{
			var webservice = api[type] + services[role][service];

			$http[method](webservice, params).
			then(function(response)
			{
				var data = response.data;
				callback(data);
			},
			function(error)
			{
				var data = error.data;
				var message = data ? (data.msg ? data.msg : "service not found") : "service not available";
				$scope.error(message);
			});
		}
	}

	var alertFunctions = function($scope, toaster)
	{
		$scope.success = function(message)
	   {
	      toaster.pop
	      ({
	         type: "alert",
	         body: message,
	         showCloseButton: true,
	         timeout: 2000
	      });
	   }

	   $scope.error = function(message)
	   {
	      toaster.pop
	      ({
	         body: message,
	         type: "error",
	         showCloseButton: true,
	         timeout: 3000
	      });
	   }
	}

	var formFunctions = function($scope)
	{
		$scope.params = function(form, required, optional)
		{
			var values = {};

			for(k in required)
			{
				var key = required[k];
				if(typeof form[key] == "undefined")
				{
					$scope.error("params required");
					return null;
				}
				values[key] = form[key];
			}

			for(k in optional)
			{
				var key = optional[k];
				values[key] = form[key];
			}

			return values;
		}
	}

	helper.auth = authFunctions;
	helper.services = serviceFunctions;
	helper.alerts = alertFunctions;
	helper.form = formFunctions;

	return helper;
}

module.exports = init;
