'use strict';

angular.module('wordleApp')
  .directive('viewer', function () {
    return {
      templateUrl: 'app/viewer/viewer.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
