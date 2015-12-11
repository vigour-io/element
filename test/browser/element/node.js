describe('Element Dom node',function () {
  var Element = require('../../../lib/element/')
  var elem

  beforeEach(function () {
    elem = new Element()
  })
  context('When instantiating a new element', function () {

    it('elem default node should be div', function () {
      expect(elem.node.tagName).to.equal('DIV')
    })

    it('should be able to specify the node type', function () {
      let newElem = new Element({node:'p'})
      expect(newElem.node.tagName).to.equal('P')
    })
  })

  context('When adding more elements to an existing element', function () {
    beforeEach(function () {
      elem = new Element()
      elem.set({"elem2":new Element()})
      elem.set({"elem3":new Element()})
      elem.set({"elem1":new Element({insertBefore:'elem2'})})
    })

    it('should insert the elem3 as a slibling of elem2(previous) by default', function () {
      expect(elem.elem2.node.nextSibling.className).to.equal('elem3')
    })

    it('should be able to insert an element before another element', function () {
      expect(elem.elem2.node.previousSibling.className).to.equal('elem1')
    })
  })
})
