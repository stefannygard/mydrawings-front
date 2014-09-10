'use strict';

/**
 * @ngdoc service
 * @name mydrawingsApp.drawingservice
 * @description
 * # drawingservice
 * Service in the mydrawingsApp.
 */
angular.module('mydrawingsApp')
  .service('DrawingService', ['$http', '$location', 'Drawdata', 'Indexservice', 
  function DrawingService($http, $location, Drawdata, Indexservice) {
    return {
        save: function (successCallback) {
            return $http.post(Indexservice.backendUrl('drawings/save/'+Drawdata.get().id), Drawdata.get()).success(successCallback); 
        },
        load: function (drawingId) {
            return $http.get(Indexservice.backendUrl('drawings/drawing/'+drawingId)).success(function(data){Drawdata.load(data[0]);});
        },
        create: function (successCallback) {
            return $http.post(Indexservice.backendUrl('drawings/create')).success(successCallback);
        },
        remove: function (drawingId, successCallback) {
            return $http.post(Indexservice.backendUrl('drawings/remove/'+drawingId)).success(successCallback);
        },
        get: function () {
            return $http.get(Indexservice.backendUrl('drawings/index'));
        },
        getOwn: function () {
            return $http.get(Indexservice.backendUrl('user/drawings'));
        }
    };
  }]);
