var myApp = angular.module('colorpickerApp', ['angularSpectrumColorpicker']);

myApp.controller('ColorPickerCtrl', function($scope) {
  $scope.uschi = "Hello Uschi";
});

// .directive('myApp', function() {
//   return {
//     restrict: 'E',
//     replace: false,
//     template: '<div my-directive></div>',
//     controller: ['$scope', function($scope) {
//       /* do something with $scope */
//       $scope.bar = 'lorem';
//     }]
//   };
// });
//angular.bootstrap(document, ['myApp']);
