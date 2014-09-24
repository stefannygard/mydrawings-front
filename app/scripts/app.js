'use strict';

/**
 * @ngdoc overview
 * @name mydrawingsApp
 * @description
 * # mydrawingsApp
 *
 * Main module of the application.
 */
var app = angular
  .module('mydrawingsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'underscore',
    'kinetic',
    'formAutofillFix',
    'resize',
    'vr.directives.slider',
    'notifications'
  ]);
  app.config(function ($routeProvider) {
    $routeProvider
      .when('/logga-in', {
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl as auth'
      })
      .when('/registrera', {
        templateUrl: 'views/registrera.html',
        controller: 'AuthCtrl as auth'
      })
      .when('/studio', {
        templateUrl: 'views/studio.html',
        controller: 'StudioCtrl',
        resolve: { 
          images: ['DrawingService', '$route', function(DrawingService){
            return DrawingService.getOwn().then(function (response) {
              return response.data.drawings;
            });
          }] 
        }
      })
      .when('/galleri', {
        templateUrl: 'views/galleri.html',
        controller: 'GalleriCtrl',
        resolve: { 
          images: ['DrawingService', '$route', function(DrawingService){
            return DrawingService.get().then(function (response) {
              return response.data.drawings;
            });
          }] 
        }
      })
      .when('/bild/:drawingId', {
        templateUrl: 'views/viewdrawing.html',
        controller: 'ViewdrawingCtrl',
        resolve: { 
          load: ['DrawingService', '$route', function(DrawingService, $route){
            return DrawingService.load($route.current.params.drawingId).then(function (response) {
              return response.data;
            });
          }] 
        }
      })
      .when('/bild/editera/:drawingId', {
        templateUrl: 'views/editdrawing.html',
        controller: 'EditdrawingCtrl',
        resolve: { 
          load: ['DrawingService', '$route', function(DrawingService, $route){
            return DrawingService.load($route.current.params.drawingId).then(function (response) {
              return response.data;
            });
          }] 
        }
      })
      .otherwise({
        redirectTo: '/galleri'
      });
  });
