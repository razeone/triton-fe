var app = angular.module("App");

app.controller("addProfController", function($scope, $location, $auth, $http){
    $scope.formData = [];
    $scope.submit = function(){
        console.log($scope.formData);
        console.log('O_O');
    };
});
