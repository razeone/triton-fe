var app = angular.module("App");

app.controller("HomeController", HomeController);
HomeController.$inject = ['$scope', '$auth'];
function HomeController($scope, $auth)
{
	$scope.session = $auth.isAuthenticated();
}
