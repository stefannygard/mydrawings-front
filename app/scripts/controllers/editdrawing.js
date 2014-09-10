'use strict';

/**
 * @ngdoc function
 * @name mydrawingsApp.controller:EditdrawingCtrl
 * @description
 * # EditdrawingCtrl
 * Controller of the mydrawingsApp
 */
angular.module('mydrawingsApp')
  .controller('EditdrawingCtrl', ['$scope', 'Drawdata', 'DrawingService', 'Notifications', 
  function ($scope, Drawdata, DrawingService, Notifications) {
    $scope.drawingData = {
      amplitudeX: 150,
      amplitudeY: 150,
      color: '#ff00ff',
      shape: 'rectangle'
    };
   
    $scope.data = {
      name: Drawdata.get().name,
      r:250,
      g:0,
      b:250
    };

    var _this = this;
    $scope.hasChanges = false;
      
    var componentToHex = function(c) {
      var hex = c.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    var rgbToHex = function(r, g, b) {
      return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
    };
      
    $scope.updateColor = function() {
      $scope.drawingData.color = rgbToHex($scope.data.r,$scope.data.g,$scope.data.b);
      $scope.update(true);
    };
    
    $scope.fireResizeEvent = function() {
      $scope.$broadcast('refreshSlider');
    };
    
    $scope.changeName = function() {
      Drawdata.setParam('name',$scope.data.name);
      $scope.hasChanges = true;
    };
    
    $scope.update = function(redraw) {
      if(Drawdata.getObjects().length!==0) {
        Drawdata.setObject($scope.drawingData, Drawdata.getLatestObject);
        if(redraw) {
          $scope.$broadcast('DRAWING:UPDATE');
        }
        $scope.hasChanges = true;
      }
    };
    
    $scope.addObject = function() {
      Drawdata.addObject($scope.drawingData);
      $scope.$broadcast('DRAWING:ADD');
      $scope.hasChanges = true;
    };
    
    $scope.saveDrawing = function() {
      _this.stage.toDataURL({
          callback: function(dataUrl) {
            Drawdata.setParam('img_thumb', dataUrl);
            DrawingService.save( 
              function(response){ 
                Notifications.sendMessage(response.flash); 
              }
            );
          }
        });

      $scope.hasChanges = false;
    };
    
    $scope.$on('KINETIC:READY', function kineticReady (event, stage) {
      _this.stage = stage;
    });
    
  }]);
