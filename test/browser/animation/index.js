var Observable = require('vigour-js/lib/observable')
var Operator = require('vigour-js/lib/operator')
Observable.prototype.inject(require('../../../lib/animation'))

describe('Animation', function () {
  var animation = new Observable({
    val: 1,
    $animation: {
      time: 9
    }
  })

  it('has operator animation', function () {
    expect(animation.$animation).ok
    expect(animation.$animation instanceof Operator).ok
  })

  it('has initial value 1', function () {
    expect(animation.val === 1).ok
  })

// it('animates when changing the value', function () {
//   var arr = []
//   animation.on(function () {
//     arr.push(this.val)
//   })
//   animation.val = 10
//   expect(arr).deep.equals([2, 3, 4, 5, 6, 7, 8, 9, 10])
// })
})
