var h = require('virtual-dom/h')
var createElement = require('virtual-dom/create-element')
var Observable = require('vigour-js/lib/observable')
var Property = require('../property')
var _addProperty = Observable.prototype.addNewProperty
var getData = require('../util/getdata')

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
          p = p.parent
        }
      }
      return _addProperty.apply(this, arguments)
    },
    // emitRemove () {},
    setRenderNode (node, tree) {
      this.renderNode = node
      this.renderTree = tree
    },
    apply (state) {
      this.applyContext(state.context)
      this.state = state
    },
    render (data) {
      if (this._input === null) {
        return
      }

      var state
      data = getData(this, data)
      var dstamp = this._datarender && data && data._lstamp
      var force = this._force || !dstamp && this._datarender
      // this will become a function
      if (this.$ && ((data && data._input === null || !data))) {
        return
      }

      var lstamp = this._lstamp
      var stamp = (dstamp && (lstamp ? dstamp + lstamp : dstamp)) || lstamp
      state = {
        force: force,
        stamp: stamp,
        data: data,
        context: this.storeContext(),
        elem: this,
        elemid: this._input !== null && this.uid,
        dataid: this._datarender && data && data.uid // maybe need null
      }
      // ok so top level goes to the thunk the render function returns undefined weird since children should only be added
      // in keys
      return new GenericThunk(render, comparestamps, state)
    }
  },
  inject: [
    require('../util/each'),
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
    currentState.dataid !== previousState.dataid

  if (!res && !currentState.props) {
    // currentState.props = previousState.props
  }
  return true
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
  var props = current.properties || {} // make when nessecary!!!!
  if (this.$collection) {
    if (data && data._input !== null) {
      if (data.keys()) {
        for (var i = 0, len = data._keys.length; i < len; i++) {
          var key = data._keys[i]
          var property = data[key]
          var type = key
          if (this[key] && this[key] instanceof Element) {
            let ret = this[key].render(property)
            if (ret) { children.push(ret) }
          } else if (
            this.properties[key] ||
            (
              key.indexOf(':') && // better to use a reg exp
              (type = key.split(':')[1]) &&
              this.properties[type]
            )
          ) {
            if (this.properties[type].base && this.properties[type].base.render) {
              this.properties[type].base._context = this
              this.properties[type].base._contextLevel = 1
              let ret = this.properties[type].base.render(property, props, children, data)
              if (ret) { children.push(ret) }
            }
          } else {
            // better to put it straight in state of course make your context
            // this.storeCotnext // then add a +1 +key thing
            this.Child.prototype._context = this
            this.Child.prototype._contextLevel = 1
            this.Child.prototype._contextKey = key
            let ret = this.ChildConstructor.prototype.render(property)
            if (ret) {
              children.push(ret)
            }
          }
        }
      }
      if (this.keys()) {
        for (let i = 0, len = this._keys.length; i < len; i++) {
          // bit heavy check...

          // CCnstr will get a easier id -- will be nessecary for the context updates as well
          if (data[this._keys[i]] === void 0 && !(this[this._keys[i]]) instanceof this.ChildConstructor) {
            let ret = this[this._keys[i]].render(data)
            if (ret) {
              children.push(ret)
            }
          }
        }
      }
    }
  } else {
    if (this.keys()) {
      for (let i = 0, len = this._keys.length; i < len; i++) {
        let ret = this[this._keys[i]].render(data)
        if (ret) {
          children.push(ret)
        }
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
