/* jshint unused: false */
/* global initGlobals, $, $compile, $rootScope, console, createDirective */
describe('SpectrumDirective', function() {
  'use strict';

  it('should be able to find the angular module', function() {
    expect(angular.module('angularSpectrumColorpicker')).toBeDefined();
  });

  describe('legacy', function() {

    beforeEach(function() {
      initGlobals();
    });

    it('should initialize spectrum when compiling the directive tag', function() {
      var d = createDirective({
        'ng-model': 'targetColor'
      });

      expect(d.elm.find('input').length > 0).toBe(true);
      expect($('.sp-container').length > 0).toBe(true);
    });


    it('should update the model when changing the color in the colorpicker', function() {
      $rootScope.targetColor = 'green';
      var d = createDirective({
        'ng-model': 'targetColor'
      });

      // set value within the colorpicker
      $('input.sp-input').val('#0000ff').trigger('change');

      // scope should have been changed!
      expect($rootScope.targetColor.toString()).toBe('#0000ff');

      // preview should have been updated!
      expect(d.elm.find('.sp-preview-inner').css('background-color')).toEqual('rgb(0, 0, 255)');
    });

    it('should initialize the colorpicker with the correct default color', function() {
      var defaultColor = '#123456';
      var defaultColorRgb = 'rgb(18, 52, 86)';
      $rootScope.targetColor = 'green';
      var d = createDirective({
        'ng-model': 'targetColor',
        'options': JSON.stringify({
          color: defaultColor
        })
      });

      expect($rootScope.targetColor).toBe(defaultColor);
      expect(d.elm.find('.sp-preview-inner').css('background-color')).toEqual(defaultColorRgb);
    });


    it('should use via the directive given options', function() {
      var d = createDirective({
        'ng-model': 'targetColor',
        'options': JSON.stringify({
          showInput: true
        })
      });

      expect($('.sp-container').hasClass('sp-input-disabled')).toBe(false);
    });

    it('should toggle the colorpicker, when the given toggler is clicked', function() {
      var $label = $('<label id="theTrigger">Click here to toggle!</label>');
      $(document.body).append($label);
      var d = createDirective({
        'ng-model': 'targetColor',
        'trigger-id': 'theTrigger',
        'options': JSON.stringify({
          showInput: true
        })
      });

      $label.trigger('click');
      expect(d.elm.find('.sp-replacer').hasClass('sp-active')).toBe(true);
      $label.remove();
    });

    it('should destroy the spectrum picker when destroying the directive', function() {
      var d = createDirective({
        'ng-model': 'targetColor',
        'options': JSON.stringify({
          showInput: true
        })
      });
      expect($('.sp-container').length).toBe(1);
      d.scope.$destroy();
      expect($('.sp-container').length).toBe(0);
    });

    it('should cope with falsy color values', function() {
      var $label = $('<label id="theTrigger">Click here to toggle!</label>');
      $(document.body).append($label);
      $rootScope.targetColor = false;
      var d = createDirective({
        'ng-model': 'targetColor',
        'trigger-id': 'theTrigger',
        'options': JSON.stringify({
          allowEmpty: true
        })
      });

      $label.trigger('click');
      $('.sp-cancel').click();
      expect($rootScope.targetColor).toBe(null);
      $label.remove();
    });

    it('should reset the color to the fallback value, if provided', function() {
      var $label = $('<label id="theTrigger">Click here to toggle!</label>');
      $(document.body).append($label);
      var fallback = {};
      $rootScope.fallbackValue = fallback;
      $rootScope.targetColor = false;
      var d = createDirective({
        'ng-model': 'targetColor',
        'trigger-id': 'theTrigger',
        'fallback-value': 'fallbackValue',
        'options': JSON.stringify({
          allowEmpty: true
        })
      });

      $label.trigger('click');
      $('.sp-cancel').click();
      expect($rootScope.targetColor).toBe(fallback);
      $label.remove();
    });

    it('should return hex-values when format is set to hex', function() {
      $rootScope.targetColor = 'green';
      var d = createDirective({
        'ng-model': 'targetColor',
        'format': JSON.stringify('hex')
      });

      // set value to an rgba-color
      $('input.sp-input').val('rgba(255, 0, 0, 0.6)').trigger('change');

      // since format is set to hex, we should still get hex back, not rgba
      expect($rootScope.targetColor.toString()).toBe('#ff0000');
    });

    it('should return rgb-values when format is set to rgb via evaluated value', function() {
      $rootScope.targetColor = 'green';
      $rootScope.format = 'rgb';
      var d = createDirective({
        'ng-model': 'targetColor',
        'format': 'format'
      });

      // set value to an hsv-color
      $('input.sp-input').val('hsv(0, 100%, 100%)').trigger('change');
      // since format is now set to an evaluated value of rgb, we should now get rgb back
      expect($rootScope.targetColor.toString()).toBe('rgb(255, 0, 0)');
    });

    it('should return the same value if there is no format set', function() {
      $rootScope.targetColor = 'green';
      var d = createDirective({
        'ng-model': 'targetColor'
      });

      var formats = [
        'rgba(255, 0, 0, 0.6)',
        'rgb(255, 0, 0)',
        '#f0f0f0',
        'hsv(0, 100%, 100%)'
      ];

      for (var i = 0; i < formats.length; i++) {
        $('input.sp-input').val(formats[i]).trigger('change');
        expect($rootScope.targetColor.toString()).toBe(formats[i]);
      }
    });
  });

});
