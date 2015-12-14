var Element = require('../../../lib/element')
var app = require('../../../lib/app')
var count = 0

Element.prototype.inject(require('../../../lib/events/render'))

beforeEach(function () {
  count = 0
})

describe('Element render', function () {
  var el = new Element({
    key: 'elem',
    on: {
      render () {
      }
    }
  })
  it.skip('add el to rendered parent', function () {
    var parent = new Element({
      rendered:true,
      child:el
    })
  })
})
