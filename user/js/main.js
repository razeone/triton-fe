// main.js
window.$ = window.jQuery = require('jquery');
var bootstrap = require('bootstrap');
var bootstrap_material_design = require('bootstrap-material-design');
var ripples = require ('../node_modules/bootstrap-material-design/dist/js/ripples.js');
var angular = require('angular');
var angular_route = require('angular-route');
var satellizer = require('satellizer');
//require('../css/main.css');
$.material.init();
var app = require('./app.js');
var access_controller = require('./controller-access.js');
var index_controller = require('./controller-index.js');
var menu_controller = require('./controller-menu.js');
