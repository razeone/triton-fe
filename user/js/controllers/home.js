var app = angular.module("App");

app.controller("HomeController", function($scope, $auth)
{
	$scope.session = $auth.isAuthenticated();
});
