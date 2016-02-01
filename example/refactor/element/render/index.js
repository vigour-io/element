var h = require('virtual-dom/h')
var diff = require('virtual-dom/diff')
var patch = require('virtual-dom/patch')
var createElement = require('virtual-dom/create-element')
var Observable = require('vigour-js/lib/observable')
// var _addProperty = Observable.prototype.addProperty
var _set = Observable.prototype.set
// so we want to flavour the virtual dom with some shit for events
// most important is basiclly dont we dont redraw
var Element = new Observable({
  useVal: true,
  properties: {
    type: true,
    renderNode: true,
    renderTree: true,
    $: true,
    $collection: true,
    src: new Observable({
      inject: require('vigour-js/lib/operator/type'),
      $type: 'string',
      properties: {
        $: true
      }
    }), // maybe use render but first just try this
    text: new Observable({
      inject: require('vigour-js/lib/operator/type'),
      $type: 'string',
      properties: {
        $: true
      }
    }) // maybe use render but first just try this
  },
  type: 'div',
  define: {
    patch (cb) {
      var parent = this
      while (parent) {
        if (parent.renderTree) {
          // is going to be super specific

          // on remove as well
          // escaliting removals of tree renderers -- what about binding back? must be easy as fuck
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
    on: {
      reference () {
        // make better, faster
        this.patch()
      }
    },
    set (val) {
      // maybe just do it on on?
      var changed = _set.apply(this, arguments)
      if (changed) {
        this.patch()
      }
      return changed
    },
    render (data) {
      if (this._input) {
        data = this._input instanceof Observable ? this.origin : this.val
      }
      // dont make unnsecary arrays everywhere
      var children = []

      if (this.$collection && data) {
        // console.log('handle col')
        // handle props of course
        data.each((property, key) => {
          children.push(this.ChildConstructor.prototype.render(property.origin))
        })
      }

      // remove all the ifs just walker
      if (this.text) {
        if (this.text.$) {
          if (data && data[this.text.$]) {
            children.push(data[this.text.$].val)
          }
        } else {
          children.push(this.text.val)
        }
      }
      this.each(function (element, key) {
        children.push(element.render(data))
      })
      var props = {
        className: this.key // or css
      }
      if (this.src) {
        props.src = this.src.val
      }
      var rendered = h(this.type, props, children)
      return rendered
    }
  },
  inject: require('./map'),
  Child: 'Constructor'
}).Constructor

var Syncable = require('vigour-hub/lib/syncable')
var _sSet = Syncable.prototype.set
// now manual determining where you want a rootNode (multiple levels way more efficient)
Syncable.prototype.define({
  set () {
    // this when using a set that bubles is the ultimate change manager dont care about anything else
    // what you can do is when catched -- do
    var changed = _sSet.apply(this, arguments)
    var sync = changed || this
    if (sync._on.data && sync._on.data.base) {
      sync._on.data.base.each(function (p, key) {
        if (p instanceof Element) {
          p.patch()
        }
      })
    }
    return changed
  }
})

// Syncable.prototype.properties = {

// }

var Hub = require('vigour-hub')
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
      var patches = diff(tree, newTree)
      rootNode = patch(element.renderNode, patches)
      element.renderTree = newTree
      if (cbGlob[uid]) {
        cbGlob[uid].call(element, rootNode, newTree)
      }
      toRender[uid] = null
    })
  }
}

// ------------usage-------------
var hub = global.hub = new Hub({
  adapter: {
    inject: require('vigour-hub/lib/protocol/websocket'),
    websocket: {
      val: 'ws://youzi.local:3031'
    }
  },
  shows: {
    blurf: {
      title: 'gurk'
    }
  },
  discover: {

  }
})

var app = new Element({
  // yuzi: {
  //   text: 'hello',
  //   gurken: {
  //     bla: {
  //       text: {
  //         $: 'textje'
  //       }
  //     }
  //   }
  // }
})

var Hello = new Element({
  type: 'div',
  text: {
    // val: ,
    $: 'title',
    $add: 'haha'
  }
}).Constructor

// so render has to be called on on req animation frame
// so we make tree per nested cllection?
// lets see how to do that
// 2: Initialise the document
// function

var tree = app.render()
var rootNode = createElement(tree)     // Create an initial root DOM node ...
document.body.appendChild(rootNode)    // ... and it should be in the document
app.setRenderNode(rootNode, tree) // We need an initial tree

// app.set({
//   bla: new Hello()
// })

// syncable on is way way to slow needs optimization

console.time('data-creation')
var datax = global.data = new Syncable()
for (var i = 0; i < 1e2; i++) {
  data.set({
    [i]: {
      title: ' --> ' + i
    }
  })
}
console.timeEnd('data-creation')

var Col = new Element({
  $collection: true,
  Child: {
    rimg: {
      type: 'img',
      src: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/63/IMG_(business).svg/1280px-IMG_(business).svg.png'
    },
    img: {
      text: { $: 'img' }
    },
    text: { $: 'title' },
    description: {
      text: { $: 'description' }
    }
  }
}).Constructor

var DiscCol = new Element({
  $collection: true,
  Child: Col
}).Constructor

app.set({
  bla: new Col(hub.shows)
})

hub.$({
  shows: {
    '*': {
      title: { val: true },
      img: { val: true },
      description: { val: true }
    }
  },
  discover: {
    '*': {
      '*': {
        title: { val: true },
        img: { val: true },
        description: { val: true }
      }
    }
  }
})
// console.time('patch')
// app.patch(function () {
//   console.log('???')
//   console.timeEnd('patch')
// })
// window.requestAnimationFrame(function loopy() {
//   app.patch(loopy)
// })
var cnt = 0
var isshows = true
setInterval(function () {
  app.clear()
  if (isshows) {
    app.set({
      bla: new DiscCol(hub.discover)
    })
    isshows = false
  } else {
    app.set({
      bla: new Col(hub.shows)
    })
    isshows = true
  }
  cnt++
})

var prev = 0
setInterval(function () {
  app.set({
    text: 'remove/additions per second: ' + (cnt - prev)
  })
  prev = cnt
}, 1e3)

// what about just doing the subs maps for subscription? much less stuff