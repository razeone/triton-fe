var app = angular.module("App").directive("scroll", function ($window) {
    return function($scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
             if (this.pageYOffset >= 500) {
                 $scope.change = true;
             } else {
                 $scope.change = false;
             }
            if (this.pageYOffset >= 800) {
                 $scope.changeRegister = true;
             } else {
                 $scope.changeRegister = false;
             }
            $scope.$apply();
        });
    };
});
