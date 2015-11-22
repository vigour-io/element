var Element = require('../../../lib/element')
var App = require('../../../lib/app')
var fireEvent = require('./util').fireEvent
var mouseupKey
var spy
var elemInstance
var elem

var app = new App({
  key:'app',
  node:document.body
})

// add mouseup listener to original
describe('Add mouseup listener', function () {
  before(function () {
    if (app.elem) {
      app.elem.remove()
    }
    elem = new Element()
  })

  it('app.elem.set({ on:{ mouseup:function(){ mouseupKey = this.key } } })', function () {
    elem.set({ on: { mouseup: function () { mouseupKey = this.key } } })
    app.set({elem: new elem.Constructor()})
  })

  it('elem now has a mouseup listener', function () {
    expect(elem._on.mouseup).to.be.ok
  })

  it('mouseupKey is undefined', function () {
    expect(mouseupKey).to.equal(void 0)
  })
})

// Create instance of elem
describe('Create instance of elem', function () {
  before(function () {
    if (app.elemInstance) {
      app.elemInstance.remove()
    }
  })

  it('app.elemInstance = new elem.Constructor()', function () {
    elemInstance = new elem.Constructor()
    app.set({elemInstance: elemInstance})
  })

  it('elemInstance inherited mouseup listener', function () {
    expect(elemInstance._on.mouseup).to.be.ok
  })

  it('mouseupKey is undefined', function () {
    expect(mouseupKey).to.equal(void 0)
  })
})

// Fire mouseup on elem
describe('Emit mouseup on elem', function () {
  before(function () {
    spy = sinon.spy(app.elem._on.mouseup.fn, 'val')
    mouseupKey = void 0
  })

  it("elem.emit('mouseup')", function () {
    app.elem.emit('mouseup')
  })

  it('elem._on.mouseup fired once', function () {
    expect(spy.calledOnce).to.be.ok
  })

  it("mouseupKey === ['app','elem']", function () {
    expect(mouseupKey).to.deep.equal('elem')
  })

})

// Fire mouseup on elem
describe('Trigger mouseup on document.body', function () {
  before(function () {
    mouseupKey = void 0
    spy.reset()
    fireEvent(document.body, 'mouseup')
  })

  it('elem._on.mouseup is not fired', function () {
    expect(spy.called).to.not.be.ok
  })

})

// Fire mouseup on elem
describe('Trigger mouseup on elem node', function () {
  before(function () {
    mouseupKey = void 0
    spy.reset()
    fireEvent(app.elem.node, 'mouseup')
  })

  it('elem._on.mouseup fired once', function () {
    expect(spy.calledOnce).to.be.ok
  })

  it("mouseupKey === ['app','elem']", function () {
    expect(mouseupKey).to.deep.equal('elem')
  })

})

// Fire mouseup on elem
describe('Trigger mouseup on elemInstance node', function () {
  before(function () {
    mouseupKey = void 0
    spy.reset()
    fireEvent(app.elemInstance.node, 'mouseup')
  })

  it('elemInstance._on.mouseup fired once', function () {
    expect(spy.calledOnce).to.be.ok
  })

  it("mouseupKey === ['app','elemInstance']", function () {
    expect(mouseupKey).to.deep.equal('elemInstance')
  })

})
