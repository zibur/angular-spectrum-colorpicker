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
      var onToggle = function() {
        $input.spectrum('toggle');
        return false;
      };
      var options = angular.extend({
        color: $ngModel.$viewValue,
        change: onChange,
        move: onChange,
        hide: onChange
      }, $scope.$eval(attrs.options));


      if(attrs.triggerId) {
        angular.element(document.body).on('click', '#' + attrs.triggerId, onToggle);
      }


      $ngModel.$render = function() {
        $input.spectrum('set', $ngModel.$viewValue || '');
      };

      $input.spectrum(options);
    }
  };
});
