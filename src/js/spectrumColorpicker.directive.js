(function(undefined) {
  'use strict';
  angularSpectrumColorpicker.directive('spectrumColorpicker', function() {
    return {
      restrict: 'E',
      require: 'ngModel',
      scope: {
        fallbackValue: '=',
        format: '=?',
        options: '=?',
        triggerId: '@?'
      },
      replace: true,
      templateUrl: 'directive.html',
      link: function($scope, $element, attrs, $ngModel) {

        var $input = $element.find('input');

        function setViewValue(color) {
          var value = $scope.fallbackValue;

          if (color) {
            value = color.toString($scope.format);
          } else if (angular.isUndefined($scope.fallbackValue)) {
            value = color;
          }

          $ngModel.$setViewValue(value);
        }

        var onChange = function(color) {
          $scope.$apply(function() {
            setViewValue(color);
          });
        };
        var onToggle = function() {
          $input.spectrum('toggle');
          return false;
        };
        var options = angular.extend({
          color: $ngModel.$viewValue,
          change: onChange,
          move: onChange,
          hide: onChange
        }, $scope.options);

        function getTriggerElement() {
          return angular.element(document.body).find('#' + $scope.triggerId);
        }

        if ($scope.triggerId) {
          getTriggerElement().on('click', onToggle);
        }

        $ngModel.$render = function() {
          $input.spectrum('set', $ngModel.$viewValue || '');
        };

        if (options.color) {
          $input.spectrum('set', options.color || '');
          setViewValue(options.color);
        }

        $input.spectrum(options);

        $scope.$on('$destroy', function() {
          if ($scope.triggerId) {
            getTriggerElement().off('click', onToggle);
          }
          $input.spectrum('destroy');
        });
      }
    };
  });
})();
