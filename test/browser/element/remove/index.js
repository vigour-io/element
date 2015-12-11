describe('Element Remove',function () {
  var Element = require('../../../../lib/element/')
  var App = require('../../../../lib/app')
  var elem
  var app
  var documentBody = document.implementation.createHTMLDocument('test').body
  beforeEach(function () {
    app = new App({
      node: documentBody
    })
    elem = new Element()
    app.set({
      elem: new elem.Constructor({
        key: 'a'
      })
    })
  })
  context('When removing an element', function () {
    beforeEach(function () {
      app.elem.remove()
    })

    it('elem should be removed', function () {
      expect(app.elem).to.be.null
    })

    it('elem should not be in the DOM', function () {
      expect(app.children).to.be.undefined
    })
  })
})
