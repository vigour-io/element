var h = require('virtual-dom/h')
var createElement = require('virtual-dom/create-element')
var Observable = require('vigour-js/lib/observable')
var renderLoop = require('./loop')
var Property = require('../property')

var GenericThunk = function(renderFn, cmpFn, state) {
  this.renderFn = renderFn
  this.cmpFn = cmpFn
  this.state = state
}

GenericThunk.prototype.type = 'Thunk'
// use widgets maybe on some elements

GenericThunk.prototype.render = function(previous) {
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
      console.log('create thunk!!!!', 'xxxx', this.path)
      var state = {
        stamp: (data && data._lstamp) || (!this._datarender && this._lstamp),
        data: data,
        context: this.storeContext(),
        // TODO: remove this is killing mem
        elem: this,
        id: this.path
      }
      var gthunk = new GenericThunk(render, comparestamps, state)
      console.log('thunk result--->', state.context)
      return gthunk
    }
  },
  inject: [
    require('./map'),
    require('./patch'),
    require('../util/context'),
    require('../subscription'),
    require('vigour-js/lib/base/context/key')
  ],
  Child: 'Constructor'
}).Constructor


function comparestamps (previousState, currentState) {
  var res =
   currentState.elem._datarender ||
   currentState.elem.$ ||
   (previousState.stamp !== currentState.stamp) ||
   currentState.elem !== previousState.elem
  // console.log('COMPARE!', currentState.elem.path, previousState.stamp, currentState.stamp, res, currentState.id, previousState.id)
  console.info('YO YO YO', currentState.elem._datarender, currentState.elem._path, currentState.elem.path, res)

  if (!res && !currentState.props) {
    currentState.props = previousState.props
  }


  return res
}

function render (previousThunk, currentThunk) {
  console.info('\nrender it', currentThunk.state.id, currentThunk.state.context)
  return genericRender.call(
    currentThunk.state.elem,
    currentThunk.state.data,
    currentThunk,
    previousThunk
  )
}

function genericRender (data, current, prev) {
  this.apply(current.state)
  console.info('ok ok ok genericRender---->', this.path, current.state.context)

  // console.warn('TRU RENDER', this.path)
  var children = []
  var props = current.properties || {}
  if (data && this.$collection) {
    data.each((property, key) => {
      if (this[key] && this[key] instanceof Element) {
        children.push(this[key].render(property))
      } else if (this.properties[key]) {
        if (this.properties[key].prototype && this.properties[key].prototype.render) {
          this.properties[key].prototype._context = this
          this.properties[key].prototype._contextLevel = 1
          this.properties[key].prototype.render(property, props, children, data)
        }
      } else {

        this.Child.prototype._context = this
        this.Child.prototype._contextLevel = 1
        this.Child.prototype._contextKey = key

        console.info('coll ok ok genericRender---->', this.Child.prototype.path)

        children.push(this.ChildConstructor.prototype.render(property))
      }
    })
    for (let key in this) {
      if (key[0] !== '_' && !data[key]) {
        let property = this[key]
        if (property) {
          if (property instanceof Element) {
            children.push(property.render(data, props, children))
          } else if (property instanceof Property) {
            loopProperty(property, data, props, children, current, prev)
          }
        }
      }
    }
  } else {
    for (let key in this) {
      if (key[0] !== '_') {
        let property = this[key]
        if (property) {
          if (property instanceof Element) {
            // end = false
            children.push(property.render(data, props, children))
          } else if (property instanceof Property) {
            // wait with props only if children
            loopProperty(property, data, props, children, current, prev)
          }
        }
      }
    }
  }
  
  return h(this.type, props, children)
}

// so prop and elem use same base with a walker collections are possible on props everythign
function loopProperty (property, data, props, children, current, prev) {
  if (property.render) {
    if (property.compare(property, data, props, children, current, prev)) {
      return
    }
    // console.log('exec prop', property.path)
    let parsed = getData(property, data)
    if (parsed instanceof Observable) {
      data = parsed
      parsed = property.parseValue(parsed.val)
    } else {
      parsed = property.parseValue(parsed)
    }
    if (parsed !== void 0) {
      property.render(parsed, props, children, data, current, prev)
    }
    property.each(function (property, key) {
      // maybe pass parsed
      loopProperty(property, data, props, children, current, prev)
    }, function (property) {
      return property instanceof Property
    })
  }
}

function getData (target, data) {
  if (target._input !== void 0 && target._input !== null) {
    data = target._input
    if (data instanceof Observable) {
      data = data.origin // need to use retrieve!
      if (target.$ && target.$ !== true) {
        // string is very dirty -- prefer to convert target to arrays allways
        data = data.get(target.$)
      }
    } else {
      data = target.parseValue()
    }
  } else if (data) {
    if (data instanceof Observable) {
      data = data.origin // need to use retrieve!
      if (target.$ && target.$ !== true) {
        data = data.get(target.$) //if no data just stop?
      }
    }
  }
  return data
}
