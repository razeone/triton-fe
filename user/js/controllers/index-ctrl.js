var app = angular.module("App");

app.controller("IndexController", function($scope, $location, $auth, $http)
{
	$scope.session = $auth.isAuthenticated();
});
