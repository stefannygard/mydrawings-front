'use strict';

/**
 * @ngdoc function
 * @name mydrawingsApp.controller:ViewdrawingCtrl
 * @description
 * # ViewdrawingCtrl
 * Controller of the mydrawingsApp
 */
angular.module('mydrawingsApp')
  .controller('ViewdrawingCtrl', ['$scope', '$rootScope', 'Drawdata', function ($scope, $rootScope, Drawdata) {
    var _this = this;
    _this.kinObjArr = [];
    
    var sX = function(x) {
      return x/_this.stage.getScale().x;
    };
    var sY = function(y) {
      return y/_this.stage.getScale().y;
    };
    
    _this.drawOne = function(index) {
      var shape;

      if(Drawdata.getObjects()[index].shape === 'rectangle') {
        shape = new Kinetic.Rect({
          x: 0,
          y: 0,
          width: 50,
          height: 50,
          fill: Drawdata.getObjects()[index].color
        });
      } 
      else {
        shape = new Kinetic.Star({
          x: 0,
          y: 0,
          numPoints: 5,
          innerRadius: 40,
          outerRadius: 70,
          fill: Drawdata.getObjects()[index].color
        });
      }

      shape.orgTime = Drawdata.getObjects()[index].time || 0;
     
      _this.layer.add(shape);
      
      _this.kinObjArr[index] = shape;
      
      var period = 2000;
      var centerX = sX(_this.stage.width()/2)-shape.getWidth()/2;
      var centerY = sY(_this.stage.height()/2)-shape.getHeight()/2;
        _this.kinObjArr[index].animation = new Kinetic.Animation(function(frame) {
          Drawdata.getObjects()[index].time = frame.time + shape.orgTime;
          var x = Drawdata.getObjects()[index].amplitudeX * Math.sin(Drawdata.getObjects()[index].time * 2 * Math.PI / period) + centerX;
          var y = Drawdata.getObjects()[index].amplitudeY * Math.sin(Drawdata.getObjects()[index].time * 2 * Math.PI / period) + centerY;
           _this.kinObjArr[index].setX(x);
           _this.kinObjArr[index].setY(y);
        }, _this.layer);
      
      _this.kinObjArr[index].animation.start();
      
      
      return shape;
    };
    
    _this.draw = function() {
      for(var i = 0, l = Drawdata.getObjects().length; i < l; i++) {
        _this.currentShape = _this.drawOne(i);
      }
    };
    
    _this.reDrawLatest = function() {
      if(_this.currentShape.animation) {
        _this.currentShape.animation.stop();
      }
      _this.currentShape.remove();
      _this.currentShape = _this.drawOne(Drawdata.getObjects().length-1);
    };
     
    $scope.$on('DRAWING:UPDATE', function(event) {
      _this.reDrawLatest();
    });
    $scope.$on('DRAWING:ADD', function(event) {
      _this.currentShape = _this.drawOne(Drawdata.getObjects().length-1);
    });
    
    $scope.$on('KINETIC:READY', function kineticReady (event, stage) {
      _this.layer = new Kinetic.Layer();
      _this.stage = stage;
      _this.stage.add(_this.layer);
      _this.draw();
    });
    
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      for(var i=0,l=_this.kinObjArr.length; i<l; i++) {
        if(_this.kinObjArr[i].animation) {
          _this.kinObjArr[i].animation.stop();
        }
      }
      Drawdata.reset();
      _this.kinObjArr = [];
    });
  }]);
