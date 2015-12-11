describe('Element Event property',function () {
  var Element = require('../../../lib/element/')
  var fireEvent = require('../util/util').fireEvent
  var elem
  var spy
  var refefenceObject
  beforeEach(function () {
    elem = new Element()
    elem._on.set({
      property: function () {
      }
    })
  })

  context('When declaring a property listener to an element', function () {
    beforeEach(function () {
      refefenceObject = new Element()
      spy = sinon.spy(elem._on.property.fn,'val')
    })

    afterEach(function () {
      spy.reset()
    })

    it('should not get triggered if the element val is changed', function () {
      elem.val = 1
      expect(spy.called).to.not.be.true
    })

    it('should get triggered if set a new property in element', function () {
      elem.set({
        a:new Element()
      })
      expect(spy.called).to.be.true
    })

    it('should get triggered a child was removed', function () {
      elem.set({
        child:new Element()
      })
      elem.child.remove()
      expect(spy.calledTwice).to.be.true
    })

  })
})
