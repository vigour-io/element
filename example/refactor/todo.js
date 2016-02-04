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
      // var changed = _set.apply(this, arguments)
      // if (changed && event) {
        var parent = this
        while (parent) {
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
        console.log('obs change set lstamp')

        // this._lstamp = event.stamp
      // }
      // return changed
    }
  },
  // define: {
  //   set (val, event) {
  //     var changed = _set.apply(this, arguments)

  //     if (changed && event) {
  //       var parent = this
  //       while (parent) {
  //         parent._lstamp = event.stamp
  //         parent = parent._parent
  //       }
  //       console.log('obs change set lstamp')
  //       // this._lstamp = event.stamp
  //     }
  //     return changed
  //   }
  // },
  Child: 'Constructor'
}).Constructor

// ----- data ----
var todos = global.todos = new Cached({
  todo1: {
    title: 'some todo from datax'
  }
})

// ----- ui -----
var app = global.app = new Element({
  DOM: document.body
})

var Todo = new Element({
  type: 'li',
  view: {
    toggle: {
      type: 'input',
      attributes: {
        type: 'checkbox'
      }
    },
    title: {
      type: 'label',
      html: { $: 'title' }
    },
    destroy: {
      type: 'button',
      on: {
        down () {
          var todo = this.parent.parent
          var key = todo.key
          console.time('remove')
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
              app.todoapp.header.title.text.val = Math.random() * 999
              todos.set({
                [Date.now()]: {
                  title: e.currentTarget.value
                }
              })
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
