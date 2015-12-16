'use strict'
describe('Element Event value',function () {
  var Element = require('../../../lib/element/')
  var elem
  var spy
  beforeEach(function () {
    elem = new Element()
    elem._on.set({
      value: function () {
      }
    })
  })

  context('When declaring a value listener to an element', function () {
    beforeEach(function () {
      spy = sinon.spy(elem._on.value.fn,'val')
    })

    afterEach(function () {
      spy.reset()
    })

    it('should get triggered if the element val is changed', function () {
      elem.val = 1
      expect(spy.called).to.be.true
    })

    it('should get triggered if the element val is changed to another element', function () {
      elem.val = new Element()
      expect(spy.called).to.be.true
    })

    it('should not get triggered when setting a new key', function () {
      elem.set({key: 'a'})
      expect(spy.called).to.not.be.true
    })
  })
})
