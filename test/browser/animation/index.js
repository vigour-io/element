describe('Element Animations',function () {
  var Element = require('../../../lib/element/')
  var Observable = require('vigour-js/lib/observable')
  var Operator = require('vigour-js/lib/operator')
  Observable.prototype.inject(require('../../../lib/animation'))
  var elem
  var spy
  beforeEach(function () {
    elem = new Element()
  })

  context('When setting animation property on an Element', function () {
    beforeEach(function () {
      elem.set({
        val: 1,
        $animation: {

        }
      })
      // spy = sinon.spy(elem._on.value.fn,'val')
    })

    afterEach(function () {
      // spy.reset()
    })

    it('should have animation property', function () {
      expect(elem.$animation).to.be.ok
    })

    it('should be able to set animation time', function () {
      elem.$animation.set({duration:100})
      expect(elem.$animation.duration.val).to.be.equal(100)
    })

    it('should be able to set animation start', function () {
      console.log(elem.$duration)
      elem.$animation.set({start:100})
      expect(elem.$animation.start.val).to.be.equal(100)
    })
  })
})







// var Observable = require('vigour-js/lib/observable')
// var Operator = require('vigour-js/lib/operator')
// Observable.prototype.inject(require('../../../lib/animation'))

// describe('Animation', function () {
//   var animation = new Observable({
//     val: 1,
//     $animation: {
//       time: 9
//     }
//   })

//   it('has operator animation', function () {
//     expect(animation.$animation).ok
//     expect(animation.$animation instanceof Operator).ok
//   })

//   it('has initial value 1', function () {
//     expect(animation.val === 1).ok
//   })

// // it('animates when changing the value', function () {
// //   var arr = []
// //   animation.on(function () {
// //     arr.push(this.val)
// //   })
// //   animation.val = 10
// //   expect(arr).deep.equals([2, 3, 4, 5, 6, 7, 8, 9, 10])
// // })
// })
