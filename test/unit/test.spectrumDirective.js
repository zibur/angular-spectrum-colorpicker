/* jshint unused: false */
/* global $, $compile, $rootScope, console */
describe('SpectrumDirective', function() {
  'use strict';


  it('should be able to find the angular module', function() {
    expect(angular.module('angularSpectrumColorpicker')).toBeDefined();
  });


  it('should initialize spectrum when compiling the directive tag', function() {
    var $pickerElement = angular.element('<spectrum-colorpicker ng-model="targetColor"></spectrum-colorpicker>');
    $compile($pickerElement)($rootScope);
    expect($pickerElement.find('input').length > 0).toBe(true);
    expect($('.sp-container').length > 0).toBe(true);
  });


  it('should update the model when changing the color in the colorpicker', function() {
    var $pickerElement = angular.element('<spectrum-colorpicker ng-model="targetColor"></spectrum-colorpicker>');
    var $scope = $rootScope.$new();
    $scope.targetColor = 'green';
    $compile($pickerElement)($scope);
    $rootScope.$digest();

    // set value within the colorpicker
    $('input.sp-input').val('#0000ff').trigger('change');

    // scope should have been changed!
    expect($scope.targetColor.toString()).toBe('#0000ff');

    // preview should have been updated!
    expect( $pickerElement.find('.sp-preview-inner').css('background-color') ).toEqual('rgb(0, 0, 255)');
  });

  it('should initialize the colorpicker with the correct default color', function() {
    var defaultColor = '#123456';
    var defaultColorRgb = 'rgb(18, 52, 86)';
    var $pickerElement = angular.element('<spectrum-colorpicker options="' + '{color: \'' + defaultColor + '\'}' + '" ng-model="targetColor"></spectrum-colorpicker>');
    var $scope = $rootScope.$new();
    $scope.targetColor = 'green';
    $compile($pickerElement)($scope);
    $rootScope.$digest();

    expect($scope.targetColor).toBe(defaultColor);
    expect($pickerElement.find('.sp-preview-inner').css('background-color')).toEqual(defaultColorRgb);
  });


  it('should use via the directive given options', function() {
    var $pickerElement = angular.element('<spectrum-colorpicker ng-model="targetColor" options="{showInput: true}"></spectrum-colorpicker>');
    var $scope = $rootScope.$new();
    $scope.targetColor = 'green';
    $compile($pickerElement)($scope);
    $rootScope.$digest();

    expect($('.sp-container').hasClass('sp-input-disabled')).toBe(false);
  });

  it('should toggle the colorpicker, when the given toggler is clicked', function() {
    var $label = $('<label id="theTrigger">Click here to toggle!</label>');
    $(document.body).append($label);
    var $pickerElement = angular.element('<spectrum-colorpicker trigger-id="theTrigger" ng-model="targetColor" options="{showInput: true}"></spectrum-colorpicker>');
    var $scope = $rootScope.$new();
    $compile($pickerElement)($scope);
    $rootScope.$digest();

    $label.trigger('click');
    expect( $pickerElement.find('.sp-replacer').hasClass('sp-active') ).toBe(true);
    $label.remove();
  });

  it('should destroy the spectrum picker when destroying the directive', function() {
    var $pickerElement = angular.element('<spectrum-colorpicker ng-model="targetColor" options="{showInput: true}"></spectrum-colorpicker>');
    var $scope = $rootScope.$new();
    $compile($pickerElement)($scope);
    $rootScope.$digest();
    expect($('.sp-container').length).toBe(1);
    $pickerElement.scope().$destroy();
    expect($('.sp-container').length).toBe(0);
  });

  it('should cope with falsy color values', function() {
    var $label = $('<label id="theTrigger">Click here to toggle!</label>');
    $(document.body).append($label);
    var $pickerElement = angular.element('<spectrum-colorpicker trigger-id="theTrigger" ng-model="targetColor" options="{allowEmpty: true}"></spectrum-colorpicker>');
    var $scope = $rootScope.$new();
    $scope.targetColor = false;
    $compile($pickerElement)($scope);
    $label.trigger('click');
    $('.sp-cancel').click();
    expect($scope.targetColor).toBe(null);
    $label.remove();
  });

  it('should reset the color to the fallback value, if provided', function() {
    var $label = $('<label id="theTrigger">Click here to toggle!</label>');
    $(document.body).append($label);
    var $pickerElement = angular.element('<spectrum-colorpicker fallback-value="fallbackValue" trigger-id="theTrigger" ng-model="targetColor" options="{allowEmpty: true}"></spectrum-colorpicker>');
    var $scope = $rootScope.$new();
    var fallback = {};
    $scope.fallbackValue = fallback;
    $scope.targetColor = false;
    $compile($pickerElement)($scope);
    $label.trigger('click');
    $('.sp-cancel').click();
    expect($scope.targetColor).toBe(fallback);
    $label.remove();
  });

  it('should return hex-values when format is set to hex', function() {
    var $pickerElement = angular.element('<spectrum-colorpicker ng-model="targetColor" format="\'hex\'"></spectrum-colorpicker>');
    var $scope = $rootScope.$new();
    $scope.targetColor = 'green';
    $compile($pickerElement)($scope);
    $rootScope.$digest();

    // set value to an rgba-color
    $('input.sp-input').val('rgba(255, 0, 0, 0.6)').trigger('change');

    // since format is set to hex, we should still get hex back, not rgba
    expect($scope.targetColor.toString()).toBe('#ff0000');
  });

  it('should return rgb-values when format is set to rgb via evaluated value', function() {
    var $pickerElement = angular.element('<spectrum-colorpicker ng-model="targetColor" format="format"></spectrum-colorpicker>');
    var $scope = $rootScope.$new();
    $scope.targetColor = 'green';
    $scope.format = 'rgb';
    $compile($pickerElement)($scope);
    $rootScope.$digest();

    // set value to an hsv-color
    $('input.sp-input').val('hsv(0, 100%, 100%)').trigger('change');
    // since format is now set to an evaluated value of rgb, we should now get rgb back
    expect($scope.targetColor.toString()).toBe('rgb(255, 0, 0)');
  });

  it('should return the same value if there is no format set', function() {
    var $pickerElement = angular.element('<spectrum-colorpicker ng-model="targetColor"></spectrum-colorpicker>');
    var $scope = $rootScope.$new();
    $scope.targetColor = 'green';
    $compile($pickerElement)($scope);
    $rootScope.$digest();

    var formats = [
      'rgba(255, 0, 0, 0.6)',
      'rgb(255, 0, 0)',
      '#f0f0f0',
      'hsv(0, 100%, 100%)'
    ];

    for (var i = 0; i < formats.length; i++) {
      $('input.sp-input').val(formats[i]).trigger('change');
      expect($scope.targetColor.toString()).toBe(formats[i]);
    }
  });

});
