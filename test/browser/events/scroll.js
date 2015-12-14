describe('Element Scroll events',function () {
  var Element = require('../../../lib/element/')
  var App = require('../../../lib/app')
  var fireEvent = require('../util/util').fireEvent
  var documentBody = document.implementation.createHTMLDocument('test').body
  var elem
  var spy

  describe('Scroll',function () {
    beforeEach(function () {
      elem = new Element()
      app = new App({
        node: documentBody
      })
      app.set({elem: elem})
    })
    context('When adding scroll listener to an element', function () {
      beforeEach(function () {
        elem.set({
          on: {
            scroll: function () {
            }
          }
        })
        spy = sinon.spy(elem._on.scroll.fn, 'val')
      })

      afterEach(function () {
        spy.reset()
      })

      it('should trigger scroll when the triggered from the element', function () {
        app.elem.emit('scroll')
        expect(spy.calledOnce).to.be.true
      })

      it('should not trigger scroll on the element when triggered form document body', function(){
        fireEvent(documentBody, 'scroll')
        expect(spy.calledOnce).to.not.be.true
      })

    })
  })
})
