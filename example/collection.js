'use strict'
const Observable = require('vigour-observable') // very slow init -- need to opmize
const subscribe = require('../../../subscribe')
const s = require('../../../s')

require('./style.less')
console.time('START')
// -------------------------
const raf = window.requestAnimationFrame
const isNumber = require('vigour-util/is/number')
// -------------------------
const state = s({ name: 'trees' })
const obj = {}
for (var i = 0; i < 2; i++) { obj[i] = { title: i } }
state.set({
  collection: obj,
  ms: {
    $transform (val) {
      return isNumber(val) ? Math.round(val) : 'not measured'
    },
    $add: ' ms'
  },
  settings: {}
})
// // -------------------------

const operator = require('vigour-observable/lib/operator/constructor').prototype
operator.set({
  properties: {
    $: true
  },
  inject: require('./map')
})

const Property = require('../lib/property')
const Element = require('../lib/element')

/*
<svg height="100" width="100">
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
  Sorry, your browser does not support inline SVG.
</svg>
*/

var svgNS = 'http://www.w3.org/2000/svg'

var app = new Element({
  key: 'app',
  holder: {
    init: {
      text: { $: 'first', $add: ' ms initial render' }
    },
    ms: {
      text: { $: 'ms', $add: ' periodic updates' }
    },
    elems: {
      text: { $: 'elems', $add: ' dom-nodes' }
    }
  },
  main: {
    holder2: {
      $: 'collection',
      $any: true,
      // css: null,
      namespace: svgNS,
      node: 'svg',
      attr: {
        width: 1000,
        height: 1000
      },
      Child: { // if you reuse here stuff here as a Child uid is not enough!
        namespace: svgNS,
        node: 'circle',
        // css: null,
        attr: {
          cx: {
            $: 'title',
            $transform (val) { return Math.sin(val / 30) * (val / 5) + 250 }
          }, // 50,
          cy: {
            $: 'title', $transform (val) { return Math.cos(val / 30) * (val / 5) + 250 }
          }, // 50,
          r: 10,
          'stroke-width': 1,
          fill: 'red',
          stroke: 'black'
        }
        // $transform () {
        // ambitious but doable -- do this later
        // hard parts -- needs to add the stuff to subscriptions
        // same for 'property definitions (although that can be an operator'
        // now there is no way to switch etc
        //   return {
        //     text: { $: 'title' }
        //   }
        // },
        // text: { $: 'title' }
      }
    },
    holder: {
      // $: 'collection',
      $any: true,
      Child: {
        css: 'nestchild',
        on: {
          remove (val, stamp, node) {
            console.log('FIRE REMOVE:', val, stamp, node)
          }
        },
        star: {},
        something: {
          a: {
            b: {
              c: {
                text: 'haha'
              }
            }
          }
        },
        title: {
          text: { $: 'title' }
        },
        // more: {
        //   text: { $: '$root.ms' } -- root is not yet supported (needs some minor revisions)
        // },
        header: {
          a: {
            bla: {
              // $: true,
              // $: 'title',
              x: {
                text: { $: 'x', $prepend: 'x:' }
              },
              lastname: {
                text: {
                  $: 'title.lastname',
                  $prepend: 'lname: '
                }
              }
            },
            text: {
              $: 'title',
              // $prepend: 'h:',
              $transform (val) {
                return val
              }
            }
          }
        }
      }
    }
  }
  // menu: {
  //   // this needs to be rendered of course -- even if there is no data -- else its pretty strange
  //   // for now we cna work arround this (leave it!) but alter we need to change this
  //   // it just weird that if there is a state it allways takes over and takes care of the handeling
  //   button: { text: 'a button' },
  //   settings: {
  //     $: 'settings',
  //     button: { text: { $: 'languages' } }
  //   }
  // },
  // footer: {
  //   left: { text: 'on the left' },
  //   right: { text: 'on the right' }
  // }
}, false)

var subs = app.$map()

var render = require('./render').multiple

var tree = { parent: true }
// need to do initial render as well

console.error('-----------------')
console.error('TOP LEVEL RENDER')
render.call(state, 'new', state._lstamp, subs, tree, void 0, tree)
console.error('-----------------')

tree = subscribe(state, subs, function (type, stamp, subs, ctree, ptree) {
  // console.group()
  // console.log('FIRE', this.path(), type, subs)
  // console.log('tree:', tree)
  // console.log('ptree:', ptree)
  if (subs._) {
    render.call(this, type, stamp, subs, ctree, ptree, tree)
  } else {
    console.warn('no _ ?', this.path())
  }
  // console.groupEnd()
  // render.f
}, tree)

// -------------------------
console.log('subs:', subs)
// -------------------------
console.timeEnd('START')

global.state = state
global.tree = tree
global.subs = subs
// console.log(tree._[app.uid()])
document.body.appendChild(tree._[app.uid()])
var cnt = 0
var total = 0
function loop () {
  cnt++
  if (cnt > 1e3) {
    cnt = 0
  }
  var ms = Date.now()
  var obj = {}
  for (var i = 0; i < 5e2; i++) {
    obj[i] = {
      title: { val: i + cnt, lastname: i },
      x: i
    }
  }
  state.collection.set(obj)
  total += (Date.now() - ms)
  state.ms.set(total / cnt)
  if (!state.first) {
    state.set({ first: total / cnt })
  }
  raf(loop)
}

state.collection[0].remove()
loop()

console.log('----------------------------')
console.log('tree:', tree)
state.set({ elems: document.getElementsByTagName('*').length })
// if i do this correctly dont need parent ever -- just need to store
// element and then find it by checking parent yes better
// document.appendChild(elem)
// tree.node or something...
