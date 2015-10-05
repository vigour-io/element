describe('properties performance', function () {
  // this is buggy shit
  var Base = require('vjs/lib/base')
  var Element = require('../../../../lib/element')
  var Property = require('../../../../lib/property')

  it('translate', function ( done ) {
    this.timeout(50e3)

    var elem = new Element({})

    var amount = 1e6

    expect(function () {
      for (var i = 0; i < amount; i++) {
        elem.set({
          x: Math.random() * 200
        })
      }

      for (var i = 0; i < amount; i++) {
        elem.set({
          y: Math.random() * 300
        })
      }

    }).performance({
      margin: 3,
      method: function () {
        console.log(1)

      }
    }, done)
  })

})
