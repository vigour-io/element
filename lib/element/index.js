var h = require('virtual-dom/h')
var createElement = require('virtual-dom/create-element')
var Observable = require('vigour-js/lib/observable')
var Property = require('../property')

var GenericThunk = function (renderFn, cmpFn, state) {
  this.renderFn = renderFn
  this.cmpFn = cmpFn
  this.state = state
}

GenericThunk.prototype.type = 'Thunk'

GenericThunk.prototype.render = function (previous) {
  // ultra simple can also put the render fn here
  var previousState = previous ? previous.state : null
  if ((!previousState || !this.state) || this.cmpFn(previousState, this.state)) {
    return this.renderFn(previous, this)
  } else {
    return previous.vnode
  }
}

var Element = module.exports = new Observable({
  useVal: true,
  properties: {
    type: true,
    renderNode: true,
    renderTree: true,
    _lstamp: true,
    _datarender: true,
    _key: true,
    _props: true,
    state: true,
    DOM (DOMnode) {
      var tree = this.render()
      var rootNode = createElement(tree)
      DOMnode.appendChild(rootNode)
      this.setRenderNode(rootNode, tree)
    }
  },
  type: 'div',
  define: {
    emitRemove () {},
    setRenderNode (node, tree) {
      this.renderNode = node
      this.renderTree = tree
    },
    apply (state) {
      this.applyContext(state.context)
      this.state = state
    },
    render (data) {
      data = getData(this, data)
      var state = {
        force: this._datarender || this.$,
        lstamp: this._lstamp,
        dstamp: (data && data._lstamp),
        data: data,
        context: this.storeContext(),
        elem: this
      }
      return new GenericThunk(render, comparestamps, state)
    }
  },
  inject: [
    require('../../lib/util/each'),
    require('./map'),
    require('./patch'),
    require('vigour-js/lib/base/context/key')
  ],
  Child: 'Constructor'
}).Constructor

function comparestamps (previousState, currentState) {
  var res =
    currentState.force ||
    previousState.dstamp !== currentState.dstamp ||
    previousState.lstamp !== currentState.lstamp
  if (!res && !currentState.props) {
    currentState.props = previousState.props
  }
  return res
}

function render (previousThunk, currentThunk) {
  return genericRender.call(
    currentThunk.state.elem,
    currentThunk.state.data,
    currentThunk,
    previousThunk
  )
}

function genericRender (data, current, prev) {
  this.apply(current.state)
  var children = [] // make when nessecary!!!!
  var props = current.properties || {}
  if (data && this.$collection && data.keys()) {
    for (var i = 0, len = data._keys.length; i < len; i++) {
      var key = data._keys[i]
      var property = data[key]
      if (this[key] && this[key] instanceof Element) {
        children.push(this[key].render(property))
      } else if (this.properties[key]) {
        // better to put it straight in state of course make your context
        // this.storeCotnext // then add a +1 +key thing
        if (this.properties[key].prototype && this.properties[key].prototype.render) {
          this.properties[key].prototype._context = this
          this.properties[key].prototype._contextLevel = 1
          this.properties[key].prototype.render(property, props, children, data)
        }
      } else {
        // better to put it straight in state of course make your context
        // this.storeCotnext // then add a +1 +key thing
        this.Child.prototype._context = this
        this.Child.prototype._contextLevel = 1
        this.Child.prototype._contextKey = key
        children.push(this.ChildConstructor.prototype.render(property))
      }

      if (this.keys()) {
        for (let i = 0, len = this._keys.length; i < len; i++) {
          if (data[this._keys[i]] === void 0) {
            children.push(this[this._keys[i]].render(data, props, children))
          }
        }
      }
    }
  } else {
    if (this.keys()) {
      for (let i = 0, len = this._keys.length; i < len; i++) {
        var child = this[this._keys[i]]
        if (child) {
          children.push(child.render(data, props, children))
        } else {
          console.warn('wrong: no child from keys:', this._keys[i], i, child)
        }
      }
    }
  }

  if (this.keys('_props', isProp)) {
    for (let i = 0, len = this._props.length; i < len; i++) {
      loopProperty(this[this._props[i]], data, props, children, current, prev)
    }
  }

  return h(this.type, props, children)
}

function isProp (val, key) {
  return val[key] instanceof Property
}

function loopProperty (property, data, props, children, current, prev) {
  if (property.render) {
    if (property.compare(property, data, props, children, current, prev)) {
      return
    }
    let parsed = getData(property, data)
    if (parsed instanceof Observable) {
      data = parsed
      parsed = property.parseValue(parsed.val) // this and getdata will all be replaced!
    } else {
      parsed = property.parseValue(parsed)
    }
    if (parsed !== void 0) {
      property.render(parsed, props, children, data, current, prev)
    }
    if (property.keys()) {
      for (var i = 0, len = property._keys.length; i < len; i++) {
        loopProperty(property[property._keys[i]], data, props, children, current, prev)
      }
    }
  }
}

function getData (target, data) {
  if (target._input !== void 0 && target._input !== null) {
    data = target._input
    if (data instanceof Observable) {
      data = data.origin
      if (target.$ && target.$ !== true) {
        data = data.retrieve(target.$)
      }
    } else {
      data = target.parseValue()
    }
  } else if (data) {
    if (data instanceof Observable) {
      data = data.origin
      if (target.$ && target.$ !== true) {
        data = data.retrieve(target.$)
      }
    }
  }
  return data
}
