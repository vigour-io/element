describe('Element Instances',function () {
  var Element = require('../../../lib/element/')
  var elem
  beforeEach(function () {
    elem = new Element()
  })
  context('When instantiating a new element', function () {

    it('elem should be a instance of Element', function () {
      expect(elem).to.be.instanceOf(Element)
    })

    it('elem should have no key by default', function () {
      expect(elem.key).to.equal(void 0)
    })
  })

  context('When setting a key on the element', function () {
    beforeEach(function () {
      elem.set({key: 'a'})
    })

    it('elem should have the key "a"', function () {
      expect(elem.key).to.equal('a')
    })
  })

  context('When adding child element', function () {
    beforeEach(function () {
      elem.set({key: 'a'})
      elem.set({ elemChild: {} })
    })

    it('elem.child should be an instance of Element', function () {
      expect(elem.elemChild instanceof Element).to.equal(true)
    })

    it('elem.child should have a key "elemChild"', function () {
       expect(elem.elemChild.key).to.equal('elemChild')
    })
  })
})
