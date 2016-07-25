var jquery = require('jquery');
window.$ = window.jQuery = jquery;
var bootstrap = require('bootstrap');
var bootstrap_material = require('bootstrap-material-design');
var angular = require('angular');
var angular_route = require('angular-route');
var angular_animate = require('angular-animate');
var satellizer = require('satellizer');
var toaster = require('angularjs-toaster');
/*var nv = require('./nv.d3');*/
$.material.init();
var app = require('./app');
//var directives = require('./directives');
var controllers = require('./controllers');
