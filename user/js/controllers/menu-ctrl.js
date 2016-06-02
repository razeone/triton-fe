var app = angular.module("App");

app.controller("MenuController", function($scope, $location, $auth, $http)
{
	var logoutService = $scope.accessAPI + $scope.endpoints.logout;

	$scope.logout = function()
	{
		$http.post(logoutService, {}).
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
