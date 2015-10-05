var Element = require('../../../lib/element')
var elem = new Element({key: 'a',elemChild: {}})
var elemInstance

describe('Create instance of elem', function () {
  it('var elemInstance = new elem.Constructor()', function () {
    elemInstance = new elem.Constructor()
  })

  it('elemInstance is instance of elem._Constructor', function () {
    expect(elemInstance).to.be.instanceOf(elem._Constructor)
  })

  it('elemInstance.elemChild === elem.elemChild', function () {
    expect(elemInstance.elemChild).equals(elem.elemChild)
  })

  it('elemInstance has no context', function () {
    expect(elemInstance._context).to.not.be.ok
  })

  it('elemInstance.elemChild has context elemInstance', function () {
    expect(elemInstance.elemChild._context).to.equal(elemInstance)
  })

  it('elem.elemChild still has no context', function () {
    expect(elem.elemChild._context).to.not.be.ok
  })

  it("elemInstance inherited key 'a'", function () {
    expect(elemInstance.key).to.equal('a')
  })

  it("elemInstance has a path ['a']", function () {
    expect(elem.path).to.deep.equal(['a'])
  })

  it("elemInstance.elemChild has path ['a','elemChild']", function () {
    expect(elemInstance.elemChild.path).to.deep.equal(['a', 'elemChild'])
  })

})

describe("Set key 'b' on instance", function () {
  it("elemInstance.set({key:'b'})", function () {
    elemInstance.set({key: 'b'})
  })

  it("elemInstance now has key 'b'", function () {
    expect(elemInstance.key).to.equal('b')
  })

  it("elemInstance now has a path ['b']", function () {
    expect(elemInstance.path).to.deep.equal(['b'])
  })

  it("elemInstance.elemChild now has path ['b','elemChild']", function () {
    expect(elemInstance.elemChild.path).to.deep.equal(['b', 'elemChild'])
  })

  it("elem still has key 'a'", function () {
    expect(elem.key).to.equal('a')
  })

  it("elem still has path ['a']", function () {
    expect(elem.path).to.deep.equal(['a'])
  })

  it("elem.elemChild still has path ['a','elemChild']", function () {
    expect(elem.elemChild.path).to.deep.equal(['a', 'elemChild'])
  })

})

// add child to elemInstance
describe('Add child to instance', function () {
  it('elemInstance.set({ elemInstanceChild:{} })', function () {
    elemInstance.set({ elemInstanceChild: {} })
  })

  it('elem does not have child elemInstanceChild', function () {
    expect(elem.elemInstanceChild).to.not.be.ok
  })

  it('elemInstance.elemInstanceChild is instance of Element', function () {
    expect(elemInstance.elemInstanceChild).to.be.instanceOf(Element)
  })

  it("elemInstance.elemInstanceChild has path ['b','elemInstanceChild']", function () {
    expect(elemInstance.elemInstanceChild.path).to.deep.equal(['b', 'elemInstanceChild'])
  })

})

// add child to original
describe('Add child to original', function () {
  it('elem.set({ elemChild2:{} })', function () {
    elem.set({ elemChild2: {} })
  })

  it('elem has child elemChild2', function () {
    expect(elem.elemChild2).to.be.ok
  })

  it('elemInstance also has child elemChild2', function () {
    expect(elemInstance.elemChild2).to.be.ok
  })

  it('elemInstance.elemChild2 === elem.elemChild2', function () {
    expect(elemInstance.elemChild2).equals(elem.elemChild2)
  })

  it("elem.elemChild2 has path ['a','elemChild2']", function () {
    expect(elem.elemChild2.path).to.deep.equal(['a', 'elemChild2'])
  })

  it("elemInstance.elemChild2 has path ['b','elemChild2']", function () {
    expect(elemInstance.elemChild2.path).to.deep.equal(['b', 'elemChild2'])
  })

})
