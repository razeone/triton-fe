var app = angular.module("App");

app.controller("MenuController", function($scope, $location, $auth, $http)
{
	$scope.logout = function()
	{
		console.log("logout");
		$auth.logout();
		$location.path("/login");
	}
});
