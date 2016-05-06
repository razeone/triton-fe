var app = angular.module("App").directive("scroll", function ($window) {
    return function($scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
             if (this.pageYOffset >= 600) {
                 $scope.change = true;
             } else {
                 $scope.change = false;
             }
            if (this.pageYOffset >= 800) {
                 $scope.changeRegister = true;
             } else {
                 $scope.changeRegister = false;
             }
            if(this.pageYOffset >= 1200){
                $scope.peopleIn = true;
            }else{
                $scope.peopleIn = false;
            }
            $scope.$apply();
        });
    };
});
