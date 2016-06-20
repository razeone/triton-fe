var app = angular.module("App");

app.directive("scroll", function($window)
{
	return function($scope, element, attrs)
	{
		angular.element($window).bind("scroll", function()
		{
			$scope.change = (this.pageYOffset >= 600);
			$scope.changeRegister = (this.pageYOffset >= 800);
			$scope.peopleIn = (this.pageYOffset >= 1200);
			$scope.$apply();
		});
	};
});
