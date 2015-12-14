describe('Element Animations',function () {
  var Element = require('../../../lib/element/')
  var Observable = require('vigour-js/lib/observable')
  var Operator = require('vigour-js/lib/operator')
  var App = require('../../../lib/app')
  Observable.prototype.inject(require('../../../lib/animation'))
  var documentBody = document.implementation.createHTMLDocument('test').body
  var elem
  var spy
  beforeEach(function () {
    elem = new Element()
    app = new App({
      node: documentBody
    })
    app.set({elem: elem})
  })

  context('When setting animation property on an Element', function () {
    beforeEach(function () {
      elem.set({
        on:{
          transitionEnd () {}
        },
        x:{
          val: 1,
          $animation: {}
        }
      })
    })
    it('should have animation property', function () {
      expect(elem.x.$animation).to.not.be.undefined
    })

    it('should be able to set animation time', function () {
      elem.x.$animation.set({duration:100})
      expect(elem.x.$animation.duration.val).to.be.equal(100)
    })

    it('should be able to set animation start', function () {
      elem.x.$animation.set({start:100})
      expect(elem.x.$animation.start.val).to.be.equal(100)
    })

  })

  context('When animating an Element', function () {
    beforeEach(function () {
      elem.set({
        on:{
          transitionEnd () {console.log("shit")}
        },
        x:{
          val: 10,
          $animation: {}
        }
      })
      spy = sinon.spy(elem._on.transitionEnd.fn, 'val')
    })
    //check with youzi
    it.skip('should use the duration time to animate the element',function () {



      elem.set({x:100})
      elem.x.$animation.set({duration:100})
      elem.x.val = 123
      expect(spy.called).to.be.true
    })
  })
})
