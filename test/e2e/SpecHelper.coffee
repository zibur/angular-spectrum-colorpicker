sandboxUrl = 'http://localhost:8765/test/e2e/env/index.html'

# global.By = protractor.By
global.ptor = protractor.getInstance()

beforeEach ->
  browser.get sandboxUrl

colorpicker =
  toggle: ->
    element(By.css '#myPicker').click

module.exports =
  colorpicker: colorpicker
