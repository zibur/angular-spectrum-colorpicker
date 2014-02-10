angularSpectrumColorpicker.directive('spectrumColorpicker', function() {
  return {
    restrict: 'E',
    require: 'ngModel',
    scope: false,
    replace: true,
    template: '<span><input class="input-small" /></span>',
    link: function($scope, $element, attrs, $ngModel) {
      var $input = $element.find('input');
      var onChange = function(color) {
        $scope.$apply(function() {
          $ngModel.$setViewValue(color);
        });
      };
      var options = angular.extend({
        color: $ngModel.$viewValue,
        change: onChange
      }, $scope.$eval(attrs.options));


      // update colorpicker, each time the model has changed
      $ngModel.$render = function() {
        $input.spectrum('set', $ngModel.$viewValue || '');
      };

      $input.spectrum(options);
    }
  };
});
