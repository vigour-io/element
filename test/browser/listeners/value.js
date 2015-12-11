describe('Element Event value',function () {
  var Element = require('../../../lib/element/')
  var fireEvent = require('../util/util').fireEvent
  var elem
  var spy
  var refefenceObject
  beforeEach(function () {
    elem = new Element()
    elem._on.set({
      value: function () {
      }
    })
  })

  context('When declaring a value listener to an element', function () {
    beforeEach(function () {
      refefenceObject = new Element()
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



// var Element = require('../../../lib/element')
// var elem = new Element()
// var valueCount

// // add value listener to original
// describe('Add value listener', function () {
//   before(function () {
//     valueCount = 0
//   })

//   it('elem._on.set({ value:function(){ valueCount++ } })', function () {
//     elem._on.set({
//       value: function () {
//         valueCount++
//       }
//     })
//   })

//   it('elem now has a value listener', function () {
//     expect(elem._on.value).to.be.ok
//   })

//   it('valueCount is zero', function () {
//     expect(valueCount).to.be.zero
//   })
// })

// // value value of element
// describe('Set value', function () {
//   before(function () {
//     valueCount = 0
//   })

//   it('elem.val = 1', function () {
//     elem.val = 1
//   })

//   it('value fired, valueCount is 1', function () {
//     expect(valueCount).to.equal(1)
//   })
// })

// // set key
// describe('Set key ', function () {
//   before(function () {
//     valueCount = 0
//   })

//   it("elem.set({key:'a'})", function () {
//     elem.set({key: 'a'})
//   })

//   it('value did not fire, valueCount is 0', function () {
//     expect(valueCount).to.equal(0)
//   })
// })

// // add to parent
// describe('Add elem to parent', function () {
//   before(function () {
//     valueCount = 0
//   })

//   it('var parent = new Element({ elem:elem })', function () {
//     var parent = new Element({ elem: elem })
//   })

//   it('value did not fire, valueCount is 0', function () {
//     expect(valueCount).to.equal(0)
//   })
// })

// // set reference
// describe('Set reference', function () {
//   before(function () {
//     valueCount = 0
//   })

//   it('var ref = new Element(); elem.val = ref', function () {
//     var ref = new Element()
//     elem.val = ref
//   })

//   it('value fired, valueCount is 1', function () {
//     expect(valueCount).to.equal(1)
//   })
// })

// // set child
// describe('Add child', function () {
//   before(function () {
//     valueCount = 0
//   })

//   it('elem.set({child:{}})', function () {
//     elem.set({child: {}})
//   })

//   it('value did not fire, valueCount is 0', function () {
//     expect(valueCount).to.equal(0)
//   })
// })

// // set child on child
// describe('Add nested child', function () {
//   before(function () {
//     valueCount = 0
//   })

//   it('elem.child.set({child:{}})', function () {
//     elem.child.set({child: {}})
//   })

//   it('value did not fire, valueCount is 0', function () {
//     expect(valueCount).to.equal(0)
//   })
// })

// // remove nested child
// describe('Remove nested child', function () {
//   before(function () {
//     valueCount = 0
//   })

//   it('elem.child.child.remove()', function () {
//     elem.child.child.remove()
//   })

//   it('value did not fire, valueCount is 0', function () {
//     expect(valueCount).to.equal(0)
//   })
// })

// // remove child
// describe('Remove child', function () {
//   before(function () {
//     valueCount = 0
//   })

//   it('elem.child.remove()', function () {
//     elem.child.remove()
//   })

//   it('value did not fire, valueCount is 0', function () {
//     expect(valueCount).to.equal(0)
//   })
// })
