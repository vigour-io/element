var h = require('virtual-dom/h')
var createElement = require('virtual-dom/create-element')
var Observable = require('vigour-js/lib/observable')
var Property = require('../property')
var _addProperty = Observable.prototype.addNewProperty

var GenericThunk = function (render, compare, state) {
  this.renderFn = render
  this.compare = compare
  this.state = state
}

GenericThunk.prototype.type = 'Thunk'

GenericThunk.prototype.render = function (previous) {
  var previousState = previous ? previous.state : null
  if ((!previousState || !this.state) || this.compare(previousState, this.state)) {
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
    _force: true,
    DOM (DOMnode) {
      var tree = this.render()
      var rootNode = createElement(tree)
      DOMnode.appendChild(rootNode)
      this.setRenderNode(rootNode, tree)
    }
  },
  type: 'div',
  define: {
    addNewProperty (key, val) {
      // console.log('this', arguments)
      if (val && val._datarender) {
        var p = this
        while (p && !p._datarender) {
          p._datarender = true
          p.parent
        }
      }
      return _addProperty.apply(this, arguments)
    },
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
      var state
      data = getData(this, data)
      // return null if null
      if (data && data._input === null) {
        console.error(data) // more efficient state handeling here only needs dataid null
      }
      var dstamp = this._datarender && data && data._lstamp
      var lstamp = this._lstamp
      var stamp = (dstamp && (lstamp ? dstamp + lstamp : dstamp)) || lstamp

      state = {
        force: this._force || !dstamp && this._datarender,
        stamp: stamp,
        data: data,
        context: this.storeContext(),
        elem: this,
        elemid: this._input !== null && this._uid,
        dataid: data && data._uid
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
    previousState.stamp !== currentState.stamp ||
    currentState.elemid !== previousState.elemid ||
    currentState.dataid !== previousState.dataid // also not correct...

  if (!res && !currentState.props) {
    currentState.props = previousState.props
  }
  return res
}

// unnesecary function
function render (previousThunk, currentThunk) {
  return genericRender.call(
    currentThunk.state.elem,
    currentThunk.state.data,
    currentThunk,
    previousThunk
  )
}

function genericRender (data, current, prev) {
  if (this._input === null) {
    // return null -- or falsy then dont add it to children array
    return // h(this.type)
  }
  this.apply(current.state)

  var children = [] // make when nessecary!!!!
  var props = current.properties || {}

  if (data && this.$collection && data.keys()) {
    // if (data && data._input === null) {
    //   // maybe props?
    //   return h(this.type)
    // this is pretty strong
    // }
    if (data && data._input !== null) {
      for (var i = 0, len = data._keys.length; i < len; i++) {
        console.log(data, data._keys)
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
      }
    }
    if (this.keys()) {
      for (let i = 0, len = this._keys.length; i < len; i++) {
        if (data[this._keys[i]] === void 0) {
          let ret = this[this._keys[i]].render(data)
          if (ret) { children.push(ret) }
        }
      }
    }
  } else {
    if (this.keys()) {
      for (let i = 0, len = this._keys.length; i < len; i++) {
        let ret = this[this._keys[i]].render(data)
        if (ret) { children.push(ret) }
      }
    }
  }

  // this can go wrong on remove of data still
  if (this.keys('_props', isProp)) {
    // here
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
