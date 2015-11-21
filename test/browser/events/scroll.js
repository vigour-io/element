var Element = require('../../../lib/element')
var App = require('../../../lib/app')
var fireEvent = require('./util').fireEvent
var scrollPath
var spy
var elemInstance
var elem

var app = new App({
  key:'app',
  node:document.body
})

// add scroll listener to original
describe('Add scroll listener', function () {
  before(function () {
    if (app.elem) {
      app.elem.remove()
    }
    elem = new Element()
  })

  it('app.elem.set({ on:{ scroll:function(){ scrollPath = this.path } } })', function () {
    elem.set({
      on: {
        scroll: function () {
          scrollPath = this.path
        }
      }
    })
    app.set({
      elem: new elem.Constructor()
    })
  })

  it('elem now has a scroll listener', function () {
    expect(elem._on.scroll).to.be.ok
  })

  it('scrollPath is undefined', function () {
    expect(scrollPath).to.equal(void 0)
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
    app.set({
      elemInstance: elemInstance
    })
  })

  it('elemInstance inherited scroll listener', function () {
    expect(elemInstance._on.scroll).to.be.ok
  })

  it('scrollPath is undefined', function () {
    expect(scrollPath).to.equal(void 0)
  })
})

// Fire scroll on elem
describe('Emit scroll on elem', function () {
  before(function () {
    spy = sinon.spy(elem._on.scroll.fn, 'val')
    scrollPath = void 0
  })

  it("elem.emit('scroll')", function () {
    app.elem.emit('scroll')
  })

  it('elem._on.scroll fired once', function () {
    expect(spy.calledOnce).to.be.ok
  })

  it("scrollPath === ['app','elem']", function () {
    expect(scrollPath).to.deep.equal(['app', 'elem'])
  })

})

// Fire scroll on elem
describe('Trigger scroll on document.body', function () {
  before(function () {
    scrollPath = void 0
    spy.reset()
    fireEvent(document.body, 'scroll')
  })

  it('elem._on.scroll is not fired', function () {
    expect(spy.called).to.not.be.ok
  })

})

// Fire scroll on elem
describe('Trigger scroll on elem node', function () {
  before(function () {
    scrollPath = void 0
    spy.reset()
    fireEvent(app.elem.node, 'scroll')
  })

  it('elem._on.scroll fired once', function () {
    expect(spy.calledOnce).to.be.ok
  })

  it("scrollPath === ['app','elem']", function () {
    expect(scrollPath).to.deep.equal(['app', 'elem'])
  })

})

// Fire scroll on elem
describe('Trigger scroll on elemInstance node', function () {
  before(function () {
    scrollPath = void 0
    spy.reset()
    fireEvent(app.elemInstance.node, 'scroll')
  })

  it('elemInstance._on.scroll fired once', function () {
    expect(spy.calledOnce).to.be.ok
  })

  it("scrollPath === ['app','elemInstance']", function () {
    expect(scrollPath).to.deep.equal(['app', 'elemInstance'])
  })

})
