var Element = require('../../../lib/element')
var app = require('../../../lib/app')
var count = 0

beforeEach(function () {
  count = 0
})

describe('on rendered', function () {
  var el = new Element({
    key: 'elem',
    on: {
      render: function () {
        console.log('party!!', this)
      }
    }
  })

  it('blur', function () {
    el.on('property', function () {
      console.error('!')
    })

    el.set({
      rendered: true
    })
  })

})
