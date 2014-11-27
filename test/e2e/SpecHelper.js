/* global browser, global, protractor */
var port = process.env.E2E_SANDBOX_PORT || 8765;
var sandboxUrl = 'http://localhost:' + port + '/';

global.By = protractor.By;
global.ptor = protractor.getInstance();

beforeEach(function() {
  browser.get(sandboxUrl);
});

var colorpicker = {
  chooseColorAtPoint: function(x, y) {
    global.ptor.actions()
      .mouseMove(element(protractor.By.css('.sp-val')), {x: x, y: y })
      .mouseDown()
      .perform();
  },

  enterValue: function(value) {
    element(protractor.By.css('.sp-input'))
      .clear()
      .sendKeys(value)
      .sendKeys(protractor.Key.ENTER);
  }
};

module.exports = {
  input: {
    get: function() {
      return element(protractor.By.css('.input-small'));
    },
    value: function() {
      return element(protractor.By.id('color')).getAttribute('value');
    }
  },
  colorpicker: colorpicker
};
