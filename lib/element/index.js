var h = require('virtual-dom/h')
var diff = require('virtual-dom/diff')
var patch = require('virtual-dom/patch')
var createElement = require('virtual-dom/create-element')
var Observable = require('vigour-js/lib/observable')
// var _addProperty = Observable.prototype.addProperty
var _set = Observable.prototype.set
// so we want to flavour the virtual dom with some shit for events
// most important is basiclly dont we dont redraw
var toRender = {}
var cbGlob = {}

function renderLoop (element, uid, cb) {
  if (cb) {
    cbGlob[uid] = cb
  }
  if (!toRender[uid]) {
    toRender[uid] = window.requestAnimationFrame(() => {
      var newTree = element.render()
      var tree = element.renderTree
      var renderNode = element.renderNode
      var patches = diff(tree, newTree)
      patch(renderNode, patches)
      element.renderTree = newTree
      if (cbGlob[uid]) {
        cbGlob[uid].call(element, renderNode, newTree)
      }
      toRender[uid] = null
    })
  }
}

var Element = module.exports = new Observable({
  useVal: true,
  properties: {
    type: true,
    renderNode: true,
    renderTree: true,
    $: true,
    $collection: true,
    DOM (DOMnode) {
      var tree = this.render()
      var rootNode = createElement(tree)
      DOMnode.appendChild(rootNode)
      this.setRenderNode(rootNode, tree)
    }
  },
  type: 'div',
  on: {
    reference () {
      // this.patch()
    }
  },
  define: {
    patch (cb) {
      var parent = this
      while (parent) {
        if (parent.renderTree) {
          renderLoop(parent, parent.uid, cb)
          return
        }
        parent = parent.parent
      }
    },
    setRenderNode (node, tree) {
      this.renderNode = node
      this.renderTree = tree
    },
    set (val) {
      var changed = _set.apply(this, arguments)
      if (changed) {
        this.patch()
      }
      return changed
    },
    render (data) {
      var children = []
      var props = {}

      data = getData(this, data)

      if (data && this.$collection) {
        data.each((property, key) => {
          children.push(this.ChildConstructor.prototype.render(property))
        })
      }
      // call render with a key its smartest!
      for (let key in this) {
        if (key !== '_parent') {
          let property = this[key]
          if (property !== null) {
            if (property instanceof Element) {
              children.push(property.render(data))
            } else if (property.render) {
              // this can become super simple and clean
              // this has to move to props render ofc
              let datax = getData(property, data)
              if (datax instanceof Observable) {
                datax = property.parseValue(datax.val)
              } else {
                datax = property.parseValue(datax)
              }
              if (datax !== void 0) {
                property.render(datax, props, children, data)
              }
            }
          }
        }
      }

      return h(this.type, props, children)
    }
  },
  inject: require('./map'),
  Child: 'Constructor'
}).Constructor

function getData (target, data) {
  if (target._input !== void 0 && target._input !== null) {
    data = target._input
    if (data instanceof Observable) {
      data = data.origin // need to use retrieve!
      if (target.$ && target.$ !== true) {
        data = data.get(String(target.$))
      }
    } else {
      data = target.val
    }
    return data
  } else if (data) {
    if (data instanceof Observable) {
      data = data.origin // need to use retrieve!
      if (target.$ && target.$ !== true) {
        data = data.get(String(target.$))
      }
    }
    return data
  }
}
