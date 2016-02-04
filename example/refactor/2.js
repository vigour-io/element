'use strict'

var Element = require('../../lib')
var Observable = require('vigour-js/lib/observable')
require('./todo.less')

var _set = Observable.prototype.set

var Cached = new Observable({
  properties: {
    _lstamp: true
  },
  on: {
    data (data, event) {
        var parent = this
        while (parent && parent._lstamp !== event.stamp) {
          parent._lstamp = event.stamp
          if (parent._on.data.base) {
            for(var i in parent._on.data.base) {
              if (parent._on.data.base[i] && parent._on.data.base[i].patch) {
                parent._on.data.base[i].patch()
              }
            }
          }
          parent = parent._parent
        }
    }
  },
  Child: 'Constructor'
}).Constructor

// ----- data ----
var focus = new Observable()
var todos = global.todos = new Cached({
  todo1: {
    title: 'some todo from datax',
    style: focus
  }
})

// for(var i = 0 ; i < 100; i++) {
//   todos.set({ [i]: {
//     title: i
//   }})
// }

// ----- ui -----
var app = global.app = new Element({
  DOM: document.body
})

var Todo = new Element({
  type: 'li',
  text: { $: 'title' },
  css: {
    $: 'style',
    $transform () {
      console.log('hey hey hey')
      return this.path.join('.')
    }
  }
}).Constructor

console.time('start')
app.set({
  btn: {
    type: 'button',
    text: ' ADD',
    on: {
      click () {
        todos.set({
          ['z' + todos.keys().length]: {
            title: 'hello! ' + todos.keys().length,
            style: 'focus'
          }
        })
      }
    }
  },
  ['todo-list']: {
    type: 'ul',
    $collection: true,
    Child: Todo,
    val: todos
  }
})
app.patch(() => console.timeEnd('start'))
