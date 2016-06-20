var app = angular.module("App");

app.controller("HomeController", function($scope, $location, $auth, $http)
{
	$scope.session = $auth.isAuthenticated();
});
