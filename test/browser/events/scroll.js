var Element = require('../../../lib/element')
var App = require('../../../lib/app')
var fireEvent = require('./util').fireEvent
var scrollKey
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

  it('app.elem.set({ on:{ scroll:function(){ scrollKey = this.key } } })', function () {
    elem.set({
      on: {
        scroll: function () {
          scrollKey = this.key
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

  it('scrollKey is undefined', function () {
    expect(scrollKey).to.equal(void 0)
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

  it('scrollKey is undefined', function () {
    expect(scrollKey).to.equal(void 0)
  })
})

// Fire scroll on elem
describe('Emit scroll on elem', function () {
  before(function () {
    spy = sinon.spy(elem._on.scroll.fn, 'val')
    scrollKey = void 0
  })

  it("elem.emit('scroll')", function () {
    app.elem.emit('scroll')
  })

  it('elem._on.scroll fired once', function () {
    expect(spy.calledOnce).to.be.ok
  })

  it("scrollKey === ['app','elem']", function () {
    expect(scrollKey).to.deep.equal('elem')
  })

})

// Fire scroll on elem
describe('Trigger scroll on document.body', function () {
  before(function () {
    scrollKey = void 0
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
    scrollKey = void 0
    spy.reset()
    fireEvent(app.elem.node, 'scroll')
  })

  it('elem._on.scroll fired once', function () {
    expect(spy.calledOnce).to.be.ok
  })

  it("scrollKey === ['app','elem']", function () {
    expect(scrollKey).to.deep.equal( 'elem')
  })

})

// Fire scroll on elem
describe('Trigger scroll on elemInstance node', function () {
  before(function () {
    scrollKey = void 0
    spy.reset()
    fireEvent(app.elemInstance.node, 'scroll')
  })

  it('elemInstance._on.scroll fired once', function () {
    expect(spy.calledOnce).to.be.ok
  })

  it("scrollKey === ['app','elemInstance']", function () {
    expect(scrollKey).to.deep.equal('elemInstance')
  })

})
