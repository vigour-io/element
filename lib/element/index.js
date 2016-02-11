var h = require('virtual-dom/h')
var createElement = require('virtual-dom/create-element')
var Observable = require('vigour-js/lib/observable')
var Property = require('../property')
var _addProperty = Observable.prototype.addNewProperty
var getData = require('../util/getdata')
// reuse this in vjs
// can also get these methods on element -- but we need a 'ui-state obj thats minimal that has the thunk'
var GenericThunk = function (render, compare, state) {
  this.renderFn = render
  this.compare = compare
  this.state = state
}

// this is nice also for operator element etc -- then we can use different version and dont care
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
    renderNode: true,
    renderTree: true,
    state: true,
    _lstamp: true,
    _datarender: true,
    _forceUpdates: true,
    _key: true,
    _props: true,
    _force: true,
    node: true,
    type (val, event) {
      this.node = val // || get [type] from cache
      this.type = val
    },
    DOM (DOMnode) {
      var tree = this.render()
      var rootNode = createElement(tree)
      DOMnode.appendChild(rootNode)
      this.setRenderNode(rootNode, tree)
    }
  },
  _keylists: [ '_props', '_keys' ],
  define: {
    keysCheck (val, key) {
      return val[key] instanceof module.exports
    },
    forceUpdates () {
      console.warn('calling force updates probably spawned from parent subscription')
      var p = this
      while (p && !p._force) {
        p._forceUpdates = true
        p = p.parent
      }
    },
    addNewProperty (key, val) {
      if (val && val._datarender) {
        var p = this
        while (p && !p._datarender) {
          p._datarender = true
          p = p.parent
        }
      }
      return _addProperty.apply(this, arguments)
    },
    setRenderNode (node, tree) {
      this.renderNode = node
      this.renderTree = tree
    },
    apply (state) {
      this.applyContext(state.context)
      this.state = state
    },
    render (data, state, event, map) {
      if (this._input === null) {
        return
      }

      if (this._forceUpdates) {
        this.forceUpdates()
      }

      data = getData(this, data)
      var dstamp = this._datarender && data && data._lstamp
      var force = this._force || !dstamp && this._datarender || this._forceUpdates
      if (this.$ && ((data && data._input === null || !data))) {
        return
      }

      var lstamp = this._lstamp
      var stamp = (dstamp && (lstamp ? dstamp + lstamp : dstamp)) || lstamp
      state = state || {
        force: force,
        stamp: stamp,
        data: data,
        context: this.storeContext(), // this is going to be smarter first check then maybe reuse
        elem: this,
        elemid: this._input !== null && this.uid,
        dataid: this._datarender && data && data.uid // maybe need null
      }
      return new GenericThunk(render, comparestamps, state)
    }
  },
  inject: [
    require('./map'),
    require('./patch'),
    require('./components'),
    require('vigour-js/lib/base/context/key'),
    require('../util/validnode')
  ],
  Child: 'Constructor'
}).Constructor

function comparestamps (previousState, currentState) {
  var res =
    currentState.force ||
    previousState.stamp !== currentState.stamp ||
    currentState.elemid !== previousState.elemid ||
    (currentState.dataid !== previousState.dataid)

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

// reuse this
function genericRender (data, current, prev) {
  this.apply(current.state)
  var children = []
  var props = current.properties || {}
  if (this.$collection) {
    if (data && data._input !== null) {
      if (this.keys()) {
        for (let i = 0, len = this._keys.length; i < len; i++) {
          if (data[this._keys[i]] === void 0) {
            let ret = this[this._keys[i]].render(data)
            if (ret) { children.push(ret) }
          }
        }
      }

      if (data.keys()) {
        for (var i = 0, len = data._keys.length; i < len; i++) {
          var key = data._keys[i]
          var property = data[key]
          var type = key
          if (this[key] === null) {
            console.warn('removed an element (and resolved context) in a collection are you sure?')
          } else if (this[key] && this[key] instanceof Element) {
            let ret = this[key].render(property)
            if (ret) { children.push(ret) }
          } else if (
            this.properties[key] ||
            (
              (type = this.mapProperty(key, property)) &&
              this.properties[type]
            )
          ) {
            if (this.properties[type].base && this.properties[type].base.render) {
              this.properties[type].base._context = this
              this.properties[type].base._contextLevel = 1
              this.properties[type].base._contextKey = key
              let ret = this.properties[type].base.render(property)
              if (ret) { children.push(ret) }
            }
          } else if (this.ChildConstructor && this.ChildConstructor !== module.exports) { // speed this up slow check!
            this.Child.prototype._context = this
            this.Child.prototype._contextLevel = 1
            this.Child.prototype._contextKey = key
            let ret = this.Child.prototype.render(property)
            this.Child.prototype._context = null
            this.Child.prototype._contextLevel = null
            this.Child.prototype._contextKey = null
            if (ret) { children.push(ret) }
          }
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

  if (this.keys('_props', isProp)) {
    for (let i = 0, len = this._props.length; i < len; i++) {
      if (this._props) {
        loopProperty(this[this._props[i]], data, props, children, current, prev)
      }
    }
  }

  return h(this.node, props, children)
}

function isProp (val, key) {
  return val[key] instanceof Property
}

function loopProperty (property, data, props, children, current, prev) {
  if (property.render) {
    let parsed = getData(property, data)
    if (property.compare(property, parsed, props, children, current, prev)) {
      return
    }
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
