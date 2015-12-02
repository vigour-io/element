var Element = require('../../../lib/element')
var app = require('../../../lib/app')
var count = 0

Element.prototype.inject(require('../../../lib/events/render'))

beforeEach(function () {
  count = 0
})

describe('on rendered', function () {
  var el = new Element({
    key: 'elem',
    on: {
      render () {
        console.log('render', this)
      }
    }
  })

  it('add el to rendered parent', function () {
    var parent = new Element({
      rendered:true,
      child:el
    })
  })
})
