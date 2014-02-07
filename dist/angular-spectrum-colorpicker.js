/*!
 * angular-spectrum-colorpicker v0.0.0
 * https://github.com/Jimdo/angular-spectrum-colorpicker
 *
 * Angular directive for a colorpicker, that bases on spectrum.
 *
 * Copyright 2014, Jimdo, Hendrike Heydenreich <hendrike@jimdo.com>
 * Released under the MIT license
 */
(function(angular) {
  'use strict';

  // src/js/spectrumColorpicker.module.js
  var angularSpectrumColorpicker = angular.module('angularSpectrumColorpicker', []);

  // src/js/spectrumColorpicker.directive.js
  angularSpectrumColorpicker.directive('spectrumColorpicker', function() {
    return {
      restrict: 'E',
      require: 'ngModel',
      scope: false,
      replace: true,
      template: '<span><input class="input-small" /></span>',
      link: function($scope, $element, attrs, $ngModel) {
        var input = $element.find('input');
        var options = angular.extend({
          color: $ngModel.$viewValue,
          change: function(color) {
            $scope.$apply(function() {
              $ngModel.$setViewValue(color.toHexString());
            });
          }
        }, $scope.$eval(attrs.options));
  
        $ngModel.$render = function() {
          input.spectrum('set', $ngModel.$viewValue || '');
        };
  
        input.spectrum(options);
      }
    };
  });
})(angular);
