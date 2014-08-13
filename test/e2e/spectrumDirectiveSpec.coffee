Helper = require './SpecHelper'

describe 'color change', ->
  it 'should correctly set the color output after paste', ->
    Helper.colorpicker.toggle()

    # open
    # choose color via picker
    # focus field
    # ctrl +a, ctrl +v
    # change color in picker to color A
    # ctrl +a, ctrl +v
    #
    # -> color should be color in clipboard but is color A
