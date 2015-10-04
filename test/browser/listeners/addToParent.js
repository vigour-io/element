var Element = require('../../../lib/element')
var elem = new Element()
var parentCount

// add parent listener to original
describe('Add parent listener', function () {
  before(function () {
    parentCount = 0
  })

  it('elem._on.set({ parent:function(){ parentCount++ } })', function () {
    elem._on.set({
      parent: function () {
        parentCount++
      }
    })
  })

  it('elem now has a parent listener', function () {
    expect(elem._on.parent).to.be.ok
  })

  it('parentCount is zero', function () {
    expect(parentCount).to.be.zero
  })
})

// parent value of element
describe('Set value', function () {
  before(function () {
    parentCount = 0
  })

  it('elem.val = 1', function () {
    elem.val = 1
  })

  it('parent did not fire, parentCount is 0', function () {
    expect(parentCount).to.equal(0)
  })
})

// set key
describe('Set key ', function () {
  before(function () {
    parentCount = 0
  })

  it("elem.set({key:'a'})", function () {
    elem.set({key: 'a'})
  })

  it('parent did not fire, parentCount is 0', function () {
    expect(parentCount).to.equal(0)
  })
})

// add to parent
describe('Add elem to parent', function () {
  before(function () {
    parentCount = 0
  })

  it('var parent = new Element({ elem:elem })', function () {
    var parent = new Element({ elem: elem })
  })

  it('parent fired, parentCount is 1', function () {
    expect(parentCount).to.equal(1)
  })
})

// set reference
describe('Set reference', function () {
  before(function () {
    parentCount = 0
  })

  it('var ref = new Element(); elem.val = ref', function () {
    var ref = new Element()
    elem.val = ref
  })

  it('parent did not fire, parentCount is 0', function () {
    expect(parentCount).to.equal(0)
  })
})

// set child
describe('Add child', function () {
  before(function () {
    parentCount = 0
  })

  it('elem.set({child:{}})', function () {
    elem.set({child: {}})
  })

  it('parent did not fire, parentCount is 0', function () {
    expect(parentCount).to.equal(0)
  })
})

// set child on child
describe('Add nested child', function () {
  before(function () {
    parentCount = 0
  })

  it('elem.child.set({child:{}})', function () {
    elem.child.set({child: {}})
  })

  it('parent did not fire, parentCount is 0', function () {
    expect(parentCount).to.equal(0)
  })
})

// remove nested child
describe('Remove nested child', function () {
  before(function () {
    parentCount = 0
  })

  it('elem.child.child.remove()', function () {
    elem.child.child.remove()
  })

  it('parent did not fire, parentCount is 0', function () {
    expect(parentCount).to.equal(0)
  })
})

// remove child
describe('Remove child', function () {
  before(function () {
    parentCount = 0
  })

  it('elem.child.remove()', function () {
    elem.child.remove()
  })

  it('parent did not fire, parentCount is 0', function () {
    expect(parentCount).to.equal(0)
  })
})
