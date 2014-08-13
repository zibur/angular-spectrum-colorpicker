sandboxUrl = 'http://localhost:8765/test/e2e/env/index.html'

# global.By = protractor.By
global.ptor = protractor.getInstance()

beforeEach ->
  browser.get sandboxUrl

colorpicker =
  toggle: ->
    element(By.css '#myPicker').click()

  chooseColorAtPoint: (x, y) ->
    ptor.actions()
      .mouseMove(element(By.css('.sp-val')), {x: x, y: y })
      .mouseDown()
      .perform()

  enterValue: (value) ->
    element(By.css '.sp-input')
      .clear()
      .sendKeys(value)
      .sendKeys(protractor.Key.ENTER)


module.exports =
  input:
    value: -> element(By.id 'color').getAttribute('value')
  colorpicker: colorpicker
