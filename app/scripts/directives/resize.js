(function() {
    'use strict';
    angular.module('resize', [])
    .directive('resize', ['$window', '_', function($window, _) {
      return {
        link: function($scope, element, attrs) {
          
          // debounce event for better performance
          var fireEvent = _.debounce(function(e) {
            $scope.$broadcast('resize::resize');
          }, 500);
          
          angular.element($window).on('resize', fireEvent);
        }
      }
    }]);
})();