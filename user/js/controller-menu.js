var app = angular.module("App");

app.controller("MenuController", function($scope, $location, $auth, $http)
{
	var accessAPI = 'http://microservicios.org/v1';
	var accessEndpoints =
	{
		logout: "/auth/logout"
	};

	$scope.logout = function()
	{
		$http.post(accessAPI + accessEndpoints.logout,{}).
		success(function()
		{
			$auth.logout();
			$location.path("/login");
		});
	};

    $scope.navClass = function (page) {
        var currentRoute = $location.path().substring(1) || 'index';
        return page == currentRoute ? 'active' :'';
    };
});
