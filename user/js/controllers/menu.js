var app = angular.module("App");

app.controller("MenuController", MenuController);
MenuController.$inject = ['$scope', '$auth', '$location'];
function MenuController($scope, $auth, $location)
{
	$scope.logout = function()
	{
		$scope.call("auth", "user", "logout", {}, "post", function(response)
		{
			$auth.logout();
			$location.path("/login");
		},
		function(error)
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
}
