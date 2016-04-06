var app = angular.module("App");

app.controller("addProfController", function($scope, $location, $auth, $http){
    $scope.toggleModal = function(){
        $('#t_and_c_m').modal();
    };
});
