describe('Element Mouse events',function () {
  var Element = require('../../../lib/element/')
  var App = require('../../../lib/app')
  var fireEvent = require('../util/util').fireEvent
  var documentBody = document.implementation.createHTMLDocument('test').body
  var elem
  var spy

  describe('Mousedown',function () {
    beforeEach(function () {
      elem = new Element()
      app = new App({
        node: documentBody
      })
      app.set({elem: elem})
    })

    context('When adding mousedown listener to an element', function () {
      beforeEach(function () {
        elem.set({
          on: {
            mousedown: function () {
            }
          }
        })
        spy = sinon.spy(elem._on.mousedown.fn, 'val')
      })

      afterEach(function () {
        spy.reset()
      })

      it('should trigger mousedown when the mouse button is pressed on the element', function () {
        app.elem.emit('mousedown')
        expect(spy.calledOnce).to.be.true
      })

      it('should not trigger mousedown on the element when triggered form document body', function(){
        fireEvent(documentBody, 'mousedown')
        expect(spy.calledOnce).to.not.be.true
      })

      context('when inherited',function () {
        beforeEach(function () {
          elem2 =  new elem.Constructor()
        })
        afterEach(function () {
          spy.reset()
        })


        it('should inherit the mousedown event',function () {
          elem2.emit('mousedown')
          expect(spy.calledOnce).to.be.true
        })
        it('should be possible to remove the event',function() {
          elem2._on.mousedown.remove()
          expect(elem2._on.mousedown).to.not.be.ok
        })

        it('should not trigger if removed',function () {
          elem2._on.mousedown.remove()
          elem2.emit('mousedown')
          expect(spy.calledOnce).to.not.be.true
        })

      })
    })
  })

  describe('Mouse Up' ,function () {
    beforeEach(function () {
      elem = new Element()
      app = new App({
        node: documentBody
      })
      app.set({elem: elem})
    })
    context('when adding mouseup listener to an element', function () {
      beforeEach(function () {
        elem.set({
          on: {
            mouseup: function () {
            }
          }
        })
        spy = sinon.spy(elem._on.mouseup.fn, 'val')
      })

      afterEach(function () {
        spy.reset()
      })

      it('should trigger mousedup when the mouse button is pressed on the elementv',function () {
        app.elem.emit('mouseup')
        expect(spy.calledOnce).to.be.true
      })

      it('should not trigger mouseup on the element when triggered form document body', function(){
        fireEvent(documentBody, 'mouseup')
        expect(spy.calledOnce).to.not.be.true
      })

      context('when inherited',function () {

        beforeEach(function () {
          elem2 = new elem.Constructor()
        })
        afterEach(function () {
          spy.reset()
        })

        it('should inherit the mouseup event',function () {
          elem2.emit('mouseup')
          expect(spy.calledOnce).to.be.true
        })
        it('should be possible to remove the event',function() {
          elem2._on.mouseup.remove()
          expect(elem2._on.mouseup).to.not.be.ok
        })

        it('should not trigger if removed',function () {
          elem2._on.mouseup.remove()
          elem2.emit('mouseup')
          expect(spy.calledOnce).to.not.be.true
        })

      })

    })
  })
})
