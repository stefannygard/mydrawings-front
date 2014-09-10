(function() {
    'use strict';
    angular.module('kinetic', [])
    .directive('stage', ['$rootScope',
    function stageDirective ($rootScope) {
        return {
            restrict: 'EA',
            scope: {
                maxWidth: '@width',
                maxHeight: '@height'
            },
            link: function linkFn (scope, elem, attrs) {
                var id = attrs["id"];
                if (!id) {
                    id = Math.random().toString(36).substring(8);
                    elem.attr('id', id);
                }
                var maxWidth = scope.maxWidth || 800;
                var maxHeight = scope.maxHeight || 600;

                var kinetic = {
                    stage: new Kinetic.Stage({
                        container: id,
                        width: maxWidth,
                        height: maxHeight
                    })
                };

                scope.kinetic = kinetic;
                // console.log('New Stage Created', kinetic.stage);
                
                // Check to see if window is less than desired width and calls sizing functions
                // Sets scale and dimensions of stage in relation to window size
                function resizeStage() {
                    var padding = 40;
                    var scalePercentage = (window.innerWidth - padding) / maxWidth;
                    kinetic.stage.setAttr('scaleX', scalePercentage);
                    kinetic.stage.setAttr('scaleY', scalePercentage);
                    kinetic.stage.setAttr('width', maxWidth * scalePercentage);
                    kinetic.stage.setAttr('height', maxHeight * scalePercentage);
                    kinetic.stage.draw();
                };

                //Sets scale and dimensions of stage to max settings
                function maxStageSize() {
                    kinetic.stage.setAttr('scaleX', 1);
                    kinetic.stage.setAttr('scaleY', 1);
                    kinetic.stage.setAttr('width', maxWidth);
                    kinetic.stage.setAttr('height', maxHeight);
                    kinetic.stage.draw();
                };
                var setStageWidth = function() {
                    if (window.innerWidth < maxWidth) {
                        resizeStage();
                    } else {
                        maxStageSize();
                    };
                };
                
                scope.$on('resize::resize', function() {
                  setStageWidth();
                });
                
                // On load we set stage size based on window size
                setStageWidth();

                // On window resize we resize the stage size
                //window.addEventListener('resize', setStageWidth);
                
                $rootScope.$broadcast('KINETIC:READY', kinetic.stage);
            }
        };
    }]);
})();