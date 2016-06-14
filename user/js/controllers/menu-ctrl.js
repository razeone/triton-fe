var app = angular.module("App");

app.controller("MenuController", function($scope, $location, $auth, $http)
{
	var service = $scope.service("auth", "logout");

	$scope.logout = function()
	{
		$http.post(service, {}).
		success(function()
		{
			$auth.logout();

			$location.path("/login");
		}).
		error(function()
		{
			$auth.logout();

			$location.path("/login");
		});
	};

	$scope.navClass = function(page)
	{
		var currentRoute = $location.path().substring(1) || 'index';
		return page == currentRoute ? 'active' :'';
	};
});
