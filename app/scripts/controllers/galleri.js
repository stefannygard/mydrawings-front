'use strict';

/**
 * @ngdoc function
 * @name mydrawingsApp.controller:GalleriCtrl
 * @description
 * # GalleriCtrl
 * Controller of the mydrawingsApp
 */
angular.module('mydrawingsApp')
  .controller('GalleriCtrl', ['images', '$scope', function (images, $scope) {
    $scope.images = images;
  }]);
