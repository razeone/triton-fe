angular.module('menu', ['ngRoute'])

.config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'slider.html'
      })
      .when('/facturar',{
      controller: 'ControladorFacturar',
      templateUrl: 'billing.html'
    })
    .when('/perfiles',{
      controller: 'ControladorPerfiles',
      templateUrl: 'profiles.html'
    })
    .when('/addperfil',{
      controller: 'ControladorAddPerfil',
      templateUrl: 'add_profile.html'
    })
      .otherwise({
        redirectTo: '/'
      });
  });