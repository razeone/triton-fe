// main.js
window.$ = window.jQuery = require('../node_modules/jquery/dist/jquery.min.js');
var bootstrap = require('../node_modules/bootstrap/dist/js/bootstrap.min.js');
var bootstrap_material_design = require('bootstrap-material-design');
var ripples = require ('../node_modules/bootstrap-material-design/dist/js/ripples.js');
var angular = require('../node_modules/angular/angular.min.js');
var angular_route = require('../node_modules/angular-route/angular-route.min.js');
var animate = require ('../node_modules/angular-animate/angular-animate.min.js');
var toaster = require('../node_modules/angularjs-toaster/toaster.min.js');
var satellizer = require('../node_modules/satellizer/satellizer.min.js');
$.material.init();

var app = require('./app.js');
var access_controller = require('./controllers/access-ctrl.js');
var index_controller = require('./controllers/index-ctrl.js');
var home_controller = require('./controllers/home-ctrl.js');
var menu_controller = require('./controllers/menu-ctrl.js');
var profile_controller = require('./controllers/profile-ctrl.js');
var forgot_controller = require('./controllers/forgot-ctrl.js');
var reset_controller = require('./controllers/reset-ctrl.js');
var scrollChange = require('./directive-scroll.js');
var tabs = require('./directive-tabs.js');
var nv = require('./nv.d3.js');
