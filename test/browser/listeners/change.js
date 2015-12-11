describe('Element Event change',function () {
  var Element = require('../../../lib/element/')
  var elem
  var spy
  beforeEach(function () {
    elem = new Element()
    elem._on.set({
      data: function () {
      }
    })
  })

  context('When declaring a change(data) listener to an element', function () {
    beforeEach(function () {
      spy = sinon.spy(elem._on.data.fn,'val')
    })

    afterEach(function () {
      spy.reset()
    })

    it('should get triggered when the val is changed', function () {
      elem.val = 1
      expect(spy.called).to.be.true
    })

    it('should get triggered when set a new key', function () {
      elem.set({key: 'a'})
      expect(spy.called).to.be.true
    })

    it('should not trigger if a parent element is added', function () {
      let parent = new Element({ elem: elem })
      expect(spy.called).to.not.be.true
    })

    it('should get triggered if a new reference is added', function () {
      let ref = new Element()
      elem.val = ref
      expect(spy.called).to.be.true
    })

    it('should get triggered if a new child is added', function () {
      elem.set({child: new Element()})
      expect(spy.called).to.be.true
    })

    it('should get triggered if a child element was removed', function () {
      elem.set({child: new Element()})
      elem.child.remove()
      expect(spy.calledTwice).to.be.true
    })
  })
})

