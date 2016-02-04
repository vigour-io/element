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

// need to do a bit differnt probably...
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
    $: true,
    $collection: function (val) {
      this.$ = this.$collection = val
    },
    DOM (DOMnode) {
      var tree = this.render()
      // create element
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
      // return genericRender.call(this, data, void 0, void 0)
      // console.log('render', this.path, data && data._lstamp)
      // need more info -- need things like previous crap
      // console.log('rend it----', (data && data._lstamp) || (!this._datarender && this._lstamp))
      var gthunk = new GenericThunk(render, comparestamps, {
        stamp: (data && data._lstamp) || (!this._datarender && this._lstamp),
        data: data,
        context: this.storeContext(), //want previous one here..
        // TODO: remove this is killing mem
        elem: this,
        id: this.path
      })
      return gthunk
    }
  },
  inject: [
    require('./map'),
    require('./patch'),
    require('../util/context'),
    require('vigour-js/lib/base/context/key')
  ],
  Child: 'Constructor'
}).Constructor


function comparestamps (previousState, currentState) {
  var res = currentState.elem._datarender || (previousState.stamp !== currentState.stamp)
  // console.log(currentState.elem)
  // currentState.elem.apply(currentState)
  // fucked up need to know if this is a move...
  // console.log(previousState, currentState)
  // console.log('COMPARE!', currentState.elem.path, previousState.stamp, currentState.stamp, res, currentState.id, previousState.id)
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
  if (current.state.context) {
    // this is rly messed up to do... want to use the walker
    this.applyContext(current.state.context)
  }
  // console.warn('TRU RENDER', this.path)

  var children = []
  var props = {}
  if (data && this.$collection) {
    data.each((property, key) => {
      if (this[key] && this[key] instanceof Element) {
        children.push(this[key].render(property))
      } else if (this.properties[key]) {
        // find a fast way to find! -- add event info?
        if (this.properties[key].prototype && this.properties[key].prototype.render) {
          // add all this stuff on states also for properties -- else it all breaks all the time
          // dont need this then
          this.properties[key].prototype._context = this
          this.properties[key].prototype._contextLevel = 1
          // console.log('leeeeeeezgo!', property)
          this.properties[key].prototype.render(property, props, children, data)
        }
      } else {
        // do all this after compare!
        // console.warn('ok lets set it come on!')
        this.Child.prototype._context = this
        this.Child.prototype._contextLevel = 1
        this.Child.prototype._contextKey = key
        // console.log('push child', key)
        // console.log('lets render it!', property._lstamp, property.path, key)
        children.push(this.ChildConstructor.prototype.render(property))
        // console.log('-----------------')
      }
    })
    for (let key in this) {
      if (key[0] !== '_' && !data[key]) {
        let property = this[key]
        if (property) {
          if (property instanceof Element) {
            // console.log()
            children.push(property.render(data, props, children))
          } else if (property instanceof Property) {
            // console.log('----> prop')
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
            end = false
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
        data = data.get(String(target.$))
        // also parse else its wrong...
      }
    } else {
      data = target.parseValue()
    }
  } else if (data) {
    if (data instanceof Observable) {
      data = data.origin // need to use retrieve!
      if (target.$ && target.$ !== true) {
        data = data.get(String(target.$)) //if no data just stop?
      }
    }
  }
  return data
}
