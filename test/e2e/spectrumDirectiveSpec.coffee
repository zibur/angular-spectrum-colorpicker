Helper = require './SpecHelper'

describe 'color change', ->
  it 'should correctly set the color output after a paste', ->
    Helper.colorpicker.toggle()
    Helper.colorpicker.chooseColorAtPoint(15, 20)
    expect(Helper.input.value()).toBe '#dac0c0'

    blue = '#0000ff'
    Helper.colorpicker.enterValue blue
    expect(Helper.input.value()).toBe blue
