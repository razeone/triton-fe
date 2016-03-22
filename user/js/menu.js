angular.module('menu', ['ngRoute'])

.config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'slider.html'
      })
      .when('/facturar',{
      controller: 'ControladorFacturar',
      templateUrl: 'facturar.html'
    })
    .when('/perfiles',{
      controller: 'ControladorPerfiles',
      templateUrl: 'Perfiles.html'
    })
    .when('/AddPerfil',{
      controller: 'ControladorAddPerfil',
      templateUrl: 'añadir_perfil.html'
    })
      .otherwise({
        redirectTo: '/'
      });
  })

/*
.when('/', {
        templateUrl: 'slider.html'
      })

*/