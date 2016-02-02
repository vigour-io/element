var h = require('virtual-dom/h')
var createElement = require('virtual-dom/create-element')
var Observable = require('vigour-js/lib/observable')
var renderLoop = require('./loop')
var Property = require('../property')

// have to use
/*
var VNode = require('virtual-dom/vnode/vnode');
var VText = require('virtual-dom/vnode/vtext');
// will be a lot faster...
function render(data) {
    return new VNode('div', {
        className: "greeting"
    }, [
        new VText("Hello " + String(data.name))
    ]);
}
create your own patch
module.exports = render;
*/

var Element = module.exports = new Observable({
  useVal: true,
  properties: {
    type: true,
    renderNode: true,
    renderTree: true,
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
    setRenderNode (node, tree) {
      this.renderNode = node
      this.renderTree = tree
    },
    render (data) {
      var children = []
      var props = {}
      data = getData(this, data)

      if (data && this.$collection) {
        // CONTEXT/PARENT FOR .parent else its broken!
        // its a different context though it also does not have an instance
        data.each((property, key) => {
          // if (this.properties[key]) {
          //   if (this.properties[key].prototype && this.properties[key].prototype.render) {
          //     this.properties[key].prototype.render(property, props, children)
          //   }
          // } else {
          children.push(this.ChildConstructor.prototype.render(property))
          // }
        })
      }
      for (let key in this) {
        if (key[0] !== '_' ) {
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

      // in this walker we can allready apply 'smart' patches or apply nodes to the target

      return h(this.type, props, children)
    }
  },
  inject: [
    require('./map'),
    require('./patch')
  ],
  Child: 'Constructor'
}).Constructor

// so prop and elem use same base with a walker collections are possible on props everythign

function loopProperty (property, data, props, children) {
  if (property.render) {
    // this can become super simple and clean
    // this has to move to props render ofc
    // console.log('in', data)
    let parsed = getData(property, data)
    if (parsed instanceof Observable) {
      data = parsed
      parsed = property.parseValue(parsed.val)
    } else {
      parsed = property.parseValue(parsed)
    }
    // console.log('out!', parsed)

    if (parsed !== void 0) {
      property.render(parsed, props, children, data)
    }
    property.each(function (property, key) {
      loopProperty(property, data, props, children)
    }, function (property) {
      return property instanceof Property
    })
  }
}

function getData (target, data) {
  let o = data
  if (target._input !== void 0 && target._input !== null) {
    data = target._input
    if (data instanceof Observable) {
      data = data.origin // need to use retrieve!
      if (target.$ && target.$ !== true) {
        data = data.get(String(target.$))
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
  return data === target ? o : data
}
