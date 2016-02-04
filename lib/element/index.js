var h = require('virtual-dom/h')
var createElement = require('virtual-dom/create-element')
var Observable = require('vigour-js/lib/observable')
var renderLoop = require('./loop')
var Property = require('../property')


var GenericThunk = function(renderFn, cmpFn, state) {
  this.renderFn = renderFn
  this.cmpFn = cmpFn
  this.state = state //state is data?
}

GenericThunk.prototype.type = "Thunk"

// use widgets
GenericThunk.prototype.render = function(previous) {
  var previousState = previous ? previous.state : null
  if ((!previousState || !this.state) || this.cmpFn(previousState, this.state)) {
    return this.renderFn(previous, this)
  } else {
    return previous.vnode
  }
}

// var titleRender = function(previousThunk, currentThunk) {
  // var currentColor = currentThunk.state.color
  // return h("h1", { style: {color: currentColor}}, ["Hello, I'm a title colored " + currentColor])
// }

// var GreenColoredThunk = new GenericThunk(titleRender, titleCompare, { color: "green"})
// var BlueColoredThunk = new GenericThunk(titleRender, titleCompare, { color: "blue"})

// var currentNode = GreenColoredThunk
// var rootNode = createElement(currentNode)

// // A simple function to diff your thunks, and patch the dom
// var update = function(nextNode) {
//   var patches = diff(currentNode, nextNode)
//   rootNode = patch(rootNode, patches)
//   currentNode = nextNode
// }

var Element = module.exports = new Observable({
  useVal: true,
  properties: {
    type: true,
    renderNode: true,
    renderTree: true,
    _lstamp: true,
    _datarender: true,
    _key: true,
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
    render (data) {
      data = getData(this, data)
      // in this walker we can allready apply 'smart' patches or apply nodes to the target
      var gthunk = new GenericThunk(render, comparestamps, {
        stamp: (data && data._lstamp) || !this._datarender && this._lstamp,
        data: data,
        elem: this //remove this is killing mem
      })
      // var elem =  h(this.type, props, children)
      // console.log('this is what h returns!', elem)
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
  // console.log(currentState.stamp, previousState.stamp, currentState.elem)
  return this._datarender || !currentState.stamp || (previousState.stamp !== currentState.stamp)
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
  // console.log('RENDER', this.path)
  var children = []
  var props = {}
  var end = true
  if (data && this.$collection) {
    end = false
    // apply this principle to $ as well
    // so this will fire -- but should not fire for individual boys not all the other stuff
    data.each((property, key) => {
      if (this[key] && this[key] instanceof Element) {
        children.push(this[key].render(property))
      } else if (this.properties[key]) {
        // find a fast way to find! -- add event info?
        if (this.properties[key].prototype && this.properties[key].prototype.render) {
          this.properties[key].prototype._context = this
          this.properties[key].prototype._contextLevel = 1
          this.properties[key].prototype.render(property, props, children, data)
        }
      } else {
        this.Child.prototype._context = this
        this.Child.prototype._contextLevel = 1
        this.Child.prototype._contextKey = key
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

  // this.write a stamp if you have!
  if (end) {
    // console.log('end point!')
    // state.stamp = this.__lstamp
  }
  return h(this.type, props, children)
}

// so prop and elem use same base with a walker collections are possible on props everythign
function loopProperty (property, data, props, children, current, prev) {
  if (property.render) {
    if (property.compare(property, data, props, children, current, prev)) {
      return
    }

    let parsed = getData(property, data)
    if (parsed instanceof Observable) {
      data = parsed
      parsed = property.parseValue(parsed.val)
    } else {
      parsed = property.parseValue(parsed)
    }
    if (parsed !== void 0) {
      property.render(parsed, props, children, data)
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
  // let o = data
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
  return data //data === target ? o : data
}
