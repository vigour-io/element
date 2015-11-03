var Element = require('../../../lib/element')
var Observable = require('vigour-js/lib/observable')
Element.prototype.inject(
  require('../../../lib/property/text')
)

describe('--> text', function () {
  it('should accept strings', function () {
    var value = 'hello'
    var element = new Element({
      text: value
    })
    expect(element.node.childNodes[0].nodeValue).to.equal(value)
  })
  it('should accept observables', function () {
    var value = 'allo'
    var obs = new Observable({
      val: value
    })
    var element = new Element({
      text: obs
    })
    expect(element.node.childNodes[0].nodeValue).to.equal(value)
  })
  it('should accept properties of observables', function () {
    var value = 'hola'
    var obs = new Observable({
      greeting: {
        val: value
      }
    })
    var element = new Element({
      text: obs.greeting
    })
    expect(element.node.childNodes[0].nodeValue).to.equal(value)
  })
  it("should accept observables who don't yet have values", function () {
    try {
      var obs = new Observable({})
      var element = new Element({
        text: obs
      })
    } catch (e) {
      expect(e).not.to.exist
    }
    expect(element.node).to.exist
  })
  it('should listen to observables for value changes', function () {
    var value = 'hoi'
    var obs = new Observable({})
    var element = new Element({
      text: obs
    })
    obs.val = value
    expect(element.node.childNodes[0].nodeValue).to.equal(value)
  })
})
