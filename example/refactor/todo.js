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
var todos = global.todos = new Cached({
  todo1: {
    title: 'some todo from datax'
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
  view: {
    // not for this one!
    toggle: {
      type: 'input',
      attributes: {
        type: 'checkbox'
      }
    },
    title: {
      type: 'label',
      text: { $: 'title' }
    },
    // and not for this one! (on update ofc)
    destroy: {
      type: 'button',
      on: {
        down () {
          var todo = this.parent.parent
          var key = todo.key
          console.log('!!!!remove', this.path)
          todo.parent.origin[key].remove()
          app.patch(function () {
            console.timeEnd('remove')
          })
        }
      }
    }
  },
  edit: {
    type: 'input'
  }
}).Constructor

console.time('start')
app.set({
  todoapp: {
    header: {
      type: 'header',
      title: {
        type: 'h1',
        text: 'todo-app'
      },
      ['new-todo']: {
        type: 'input',
        attributes: {
          placeholder: 'What needs to be done?'
        },
        on: {
          keydown (e) {
            if (e.keyCode === 13) {
              console.time('add')
              var key = Math.round(Math.random() * 999999999)
              app.todoapp.header.title.text.val = key
              todos.set({ [key]: { title: e.currentTarget.value } })
              app.patch(function () {
                console.timeEnd('add')
              })
            }
          }
        }
      },
      main: {
        type: 'section',
        ['toggle-all']: {
          type: 'input',
          attributes: {
            type: 'checkbox',
            checked: true
          }
        },
        ['todo-list']: {
          type: 'ul',
          $collection: true,
          Child: Todo,
          val: todos
        }
      }
    }
  }
})
app.patch(() => console.timeEnd('start'))
