'use strict'
var h = require('virtual-dom/h')
var createElement = require('virtual-dom/create-element')
var Observable = require('vigour-observable')
var Base = require('vigour-base')
var Emitter = require('vigour-observable/lib/emitter')
var Operator = require('vigour-observable/lib/operator')
var Property = require('../property')
var _addProperty = Observable.prototype.addNewProperty
var getData = require('../util/getdata')
var merge = require('lodash.merge')
var isNode = require('vigour-util/is/node')
var Thunk = function (state) { this.state = state }
Thunk.prototype.type = 'Thunk'
Thunk.prototype.render = function (previous) {
  var previousState = previous ? previous.state : null
  if ((!previousState || !this.state) || comparestamps(previousState, this.state)) {
    return render(previous, this)
  } else {
    return previous.vnode
  }
}
// make classes for this and just use the element (for now this is fine but not perfect ofc)
// just make widget types
var Element = module.exports = new Observable({
  useVal: true,
  components: {
    property: require('../property').prototype,
    style: require('../property/style'),
    operator: Operator.prototype
  },
  properties: {
    widget (obj) {
      this.widget = function (state) {
        this.state = state
      }
      var proto = this.widget.prototype
      proto.update = obj.update
      proto.init = obj.init
      proto.destroy = obj.destroy
      proto.type = 'Widget'
    },
    ChildType: true,
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
      if (this.type !== val) {
        this.node = val
        this.type = val
      }
    },
    DOM (DOMnode) {
      var tree = this.render()
      var rootNode = createElement(tree)
      if (!isNode) {
        DOMnode.appendChild(rootNode)
      }
      this.setRenderNode(rootNode, tree)
    }
  },
  type: 'element',
  _keylists: [ '_props', '_keys' ],
  define: {
    // extended on element for usage in other repo's
    isProp,
    loopProperty,
    // -------
    keysCheck (val, key) {
      return val[key] instanceof Element && !val[key].case
    },
    forceUpdates () {
      console.warn('calling force updates probably spawned from parent subscription -- avoid!', this.path.join('.'))
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
    compare: comparestamps, // this is a little bit strange now since we dont use the ref
    apply (state) {
      this.applyContext(state.context)
      this.state = state
      return this
    },
    render (data, state, event, prev) {
      if (this.__input === null) {
        return
      }
      if (this._forceUpdates) {
        this.forceUpdates()
      }

      data = getData(this, data)
      var dstamp = this._datarender && data && data._lstamp
      var force = this._force || !dstamp && this._datarender || this._forceUpdates
      if (this.$) {
        if (this._subscriptionCondition) {
          if (!this._subscriptionCondition.call(this, data, event, prev)) {
            return
          }
        } else if (data && data.__input === null || !data) {
          return
        }
      }

      var lstamp = this._lstamp
      var stamp = (dstamp && (lstamp ? dstamp + lstamp : dstamp)) || lstamp

      state = state || {
        force: force,
        stamp: stamp,
        data: data,
        context: this.storeContext(), // this is going to be smarter first check then maybe reuse
        elem: this,
        elemid: this.__input !== null && this.uid,
        dataid: this._datarender && data && data.uid // maybe need null
      }

      if (prev && prev.next) {
        merge(state, prev.next)
      }
      if (this.widget) {
        return new this.widget(state) //eslint-disable-line
      } else {
        return new Thunk(state)
      }
    }
  },
  inject: [
    require('./map'),
    require('./patch'),
    require('vigour-base/lib/context/key'),
    require('../util/validnode')
  ],
  Child: 'Constructor'
}).Constructor

// maybe allways do this
Element.prototype.ChildType = Element

Element.Thunk = Thunk

function comparestamps (previousState, currentState) {
  var res =
    currentState.force ||
    previousState.stamp !== currentState.stamp ||
    currentState.elemid !== previousState.elemid ||
    currentState.dataid !== previousState.dataid
  if (!res && !currentState.props) {
    currentState.props = previousState.props
  }
  return res
}

function isCase (val, key) {
  return val[key] && val[key].case
}

function render (previousThunk, currentThunk) {
  return genericRender.call(
    currentThunk.state.elem,
    currentThunk.state.data,
    currentThunk,
    previousThunk
  )
}

function genericRender (data, current, prev, props, children, norender) {
  this.apply(current.state)
  var _cases = this.keys('_cases', isCase)
  children = children || []
  props = props || current.state && current.state.props && current.state.props.properties || {}

  if (this.$collection) {
    if (data && data.__input !== null) {
      let reorder
      if (this.keys()) {
        for (let i = 0, len = this._keys.length; i < len; i++) {
          if (data[this._keys[i]] === void 0) {
            let ret = this[this._keys[i]].render(data, void 0, void 0, prev)
            if (ret) {
              if (this[this._keys[i]].order) {
                reorder = true
              }
              children.push(ret)
            }
          }
        }
      }
      if (data.keys()) {
        let properties = this._properties
        for (let i = 0, len = data._keys.length; i < len; i++) {
          let key = data._keys[i]
          if (
            properties[key] &&
            properties[key].base &&
            properties[key].base instanceof Element
          ) {
            if (!reorder && properties[key].base.order) {
              reorder = true
            }
            addChild.call(this, data[key], key, children)
          } else if (!properties[key]) {
            if (!reorder && this.ChildConstructor.prototype.order) {
              reorder = true
            }
            addChild.call(this, data[key], key, children)
          }
        }
      }
      if (reorder) {
        // this has to come from vjs ofcourse and needs great
        children.sort(function (a, b) {
          a = (a.state.elem.order && a.state.elem.order.val) || (a.state.data.order && a.state.data.order.val) || 0
          b = (b.state.elem.order && b.state.elem.order.val) || (b.state.data.order && b.state.data.order.val) || 0
          return a - b
        })
      }
    }
  } else {
    if (this.keys()) {
      for (let i = 0, len = this._keys.length; i < len; i++) {
        let ret = this[this._keys[i]].render(data, void 0, void 0, prev)
        if (ret) { children.push(ret) }
      }
    }
  }

  if (this.keys('_props', isProp)) {
    for (let i = 0, len = this._props.length; i < len; i++) {
      let prop = this._props[i]
      loopProperty(this[prop], data, props, children, current, prev)
    }
  }

  if (!this.text && typeof this.__input === 'string') {
    children.push(this.val)
  }


  if (!norender && !props.className) {
    var prepped = (this.key || '') + ((this.type && this.type !== this._node) ? ' type-' + this.type : '')
    if (prepped) {
      props.className = prepped
    }
  }

  if (_cases) {
    for (let i in _cases) {
      let caseval = this[_cases[i]]
      if (caseval.case.val) {
        for (let i in children) {
          if (
            (caseval.text && children[i].type === 'VirtualText') ||
            (caseval[children[i].state.elem.key])
          ) {
            children.splice(i, 1)
          }
        }
        genericRender.call(caseval, data, current, prev, props, children, true)
      }
    }
  }

  return !norender && h(this.node, props, children)
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
      parsed = property.parseValue(parsed.val) // this and getdata will all be replaced!
    } else {
      if (parsed !== void 0) {
        parsed = property.parseValue(parsed || data && data.val)
      } else {
        parsed = property.parseValue(data && data.val)
      }
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

function addChild (property, key, children) {
  var type = key
  var ret
  if (this[key] === null) {
    console.warn('removed an element (and resolved context) in a collection are you sure?')
  } else if (this[key] && this[key] instanceof Element) {
    ret = this[key].render(property)
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
      ret = this.properties[type].base.render(property)
      if (ret) { children.push(ret) }
    }
  } else if (this.ChildConstructor && this.ChildConstructor !== module.exports) { // speed this up slow check!
    this.Child.prototype._context = this
    this.Child.prototype._contextLevel = 1
    this.Child.prototype._contextKey = key
    ret = this.Child.prototype.render(property)
    if (ret) { children.push(ret) }
  }
  return ret
}
