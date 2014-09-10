'use strict';

/**
 * @ngdoc service
 * @name mydrawingsApp.drawdata
 * @description
 * # drawdata
 * Service in the mydrawingsApp.
 */
angular.module('mydrawingsApp')
  .service('Drawdata', ['_', function Drawdata(_) {
  
    var defaultObjects = [{
      shape: 'rectangle',
      amplitudeX: 150,
      amplitudeY: 150,
      color: '#ff00ff'
    }];
    
    var data = {};

    return {
        getObjects: function () {
            return data.drawing_objects;
        },
        get: function () {
            return data;
        },
        getLatestObject: function () {
          return data.drawing_objects[data.drawing_objects.length-1];
        },
        load: function(_data) {
          data = _data;
        },
        setParam: function(name, value) {
           data[name] = value;
        },
        setObject: function (_data, defaults) {
          if(defaults) {
            data.drawing_objects[data.drawing_objects.length-1] = _.defaults(_.clone(_data), data.drawing_objects[data.drawing_objects.length-1]);
          }
          else {
            data.drawing_objects[data.drawing_objects.length-1] = _.clone(_data);
          }
        },
        addObject: function (_data) {
          data.drawing_objects[data.drawing_objects.length] = _(_data).clone();
        },
        reset: function () {
          data.drawing_objects.length = 0;
        }
    };
  }]);
