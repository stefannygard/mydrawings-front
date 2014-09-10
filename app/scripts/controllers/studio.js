'use strict';

/**
 * @ngdoc function
 * @name mydrawingsApp.controller:StudiotCtrl
 * @description
 * # StudioCtrl
 * Controller of the mydrawingsApp
 */
angular.module('mydrawingsApp')
  .controller('StudioCtrl', ['images', '$scope', '$http', '$route', '$location', 'DrawingService', 'Notifications', 
  function (images, $scope, $http, $route, $location, DrawingService, Notifications) {
    $scope.images = images;
    $scope.remove = function(event, id) {
      DrawingService.remove(id, function(response){ $route.reload();Notifications.sendMessage(response.flash); });
    };
    
    $scope.create = function() {
      DrawingService.create(function(response){ $location.path( '/bild/editera/'+response.id ); });
    };
    
  }]);
