var h = require('virtual-dom/h')
var createElement = require('virtual-dom/create-element')
var Observable = require('vigour-js/lib/observable')
var renderLoop = require('./loop')
var Property = require('../property')

var Element = module.exports = new Observable({
  useVal: true,
  properties: {
    type: true,
    renderNode: true,
    renderTree: true,
    _contextKey: true,
    _key: true,
    $: true,
    $collection: function (val) {
      this.$ = this.$collection = val
    },
    DOM (DOMnode) {
      var tree = this.render()
      var rootNode = createElement(tree)
      DOMnode.appendChild(rootNode)
      this.setRenderNode(rootNode, tree)
    }
  },
  type: 'div',
  define: {
    key: {
      get () {
        return (this._context && this._contextKey) || this._key
      },
      set (val) {
        this._key = val
      }
    },
    setRenderNode (node, tree) {
      this.renderNode = node
      this.renderTree = tree
    },
    render (data) {
      var children = []
      var props = {}
      data = getData(this, data)

      if (data && this.$collection) {
        // apply this principle to $ as well
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
                loopProperty(property, data, props, children)
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
                children.push(property.render(data, props, children))
              } else if (property instanceof Property) {
                loopProperty(property, data, props, children)
              }
            }
          }
        }
      }

      // in this walker we can allready apply 'smart' patches or apply nodes to the target
      return h(this.type, props, children)
    }
  },
  inject: [
    require('./map'),
    require('./patch'),
    require('../util/context')
  ],
  Child: 'Constructor'
}).Constructor

// so prop and elem use same base with a walker collections are possible on props everythign

function loopProperty (property, data, props, children) {
  if (property.render) {
    // this can become super simple and clean
    // this has to move to props render ofc
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
      loopProperty(property, data, props, children)
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
