describe('Element Event reference',function () {
  var Element = require('../../../lib/element/')
  var fireEvent = require('../util/util').fireEvent
  var elem
  var spy
  var refefenceObject
  beforeEach(function () {
    elem = new Element()
    elem._on.set({
      reference: function () {
      }
    })
  })

  context('When declaring a reference listener to an element', function () {
    beforeEach(function () {
      refefenceObject = new Element()
      spy = sinon.spy(elem._on.reference.fn,'val')
    })

    afterEach(function () {
      spy.reset()
    })

    it('should not get triggered if the element val is changed to an object that is not an observable', function () {
      elem.val = 1
      expect(spy.called).to.not.be.true
    })

    it('should get triggered if the element val is changed to an object that is observable', function () {
      elem.val = refefenceObject
      expect(spy.called).to.be.true
    })

    it('should get triggered if the element val is an observable instance, and it gets removed', function () {
      elem.val = refefenceObject
      elem.val.remove()
      expect(spy.called).to.be.true
    })

    it('should not get triggered if the element val is any value and it get changed to another any value', function () {
      elem.val = 1
      elem.val = 2
      expect(spy.called).to.not.be.true
    })
  })
})
