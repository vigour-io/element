'use strict'

var Element = require('../../lib')
var Observable = require('vigour-js/lib/observable')
Observable.prototype.inject(require('../../lib/subscription/stamp'))

require('./todo.less')

// ----- data ----
var focus = new Observable()
var todos = global.todos = new Observable({
  // todo1: {
  //   title: 'some todo from datax',
  //   style: focus
  // }
})

var Syncable = require('vigour-hub/lib/syncable')
Syncable.prototype.inject(require('../../lib/subscription/stamp'))
var Hub = require('vigour-hub')
var hub = global.hub = new Hub({
  adapter: {
    inject: require('vigour-hub/lib/protocol/websocket'),
    websocket: 'ws://localhost:3033'
  }
})

var x = Date.now()
todos = hub.get('shows', {})
todos.once(function () {
  window.requestAnimationFrame(function () {
    app.todoapp.header.title.text.val ='hub:' + (Date.now() - x) + 'ms'
  })
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
        $: 'done',
        type: 'checkbox',
        checked: {
          $: true,
          $transform (val) {
            if (this.state) {
              console.log('YOYOYO', val, this.state.data.val)
            }
            return (this.state && this.state.data.val)
          }
        }
      },
      on: {
        change () {
          var data = this.state.data.get('done', {})
          data.val = !data.val
        }
      }
    },
    css: {
      $: 'done',
      $transform (val) {
        return val ? 'haha' : 'no'
      }
    },
    title: {
      type: 'label',
      text: {
        $: 'title'
      }
    },
    destroy: {
      type: 'button',
      on: {
        down () {
          this.state.data.remove()
        }
      }
    }
  },
  edit: {
    type: 'input'
  }
}).Constructor

var cnt = 0
var start = Date.now()

app.set({
  time: {
    text: {}
  },
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
              var key = ++cnt
              var update = Date.now()
              app.todoapp.header.title.text.val = key
              todos.set({
                [key]: {
                  title: key + ' : ' + e.currentTarget.value
                }
              })
              app.patch(function () {
                app.todoapp.header.title.text.val = 'add: ' + (Date.now() - update) + ' ms'
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
        },
        buttons: {
          removeall: {
            type: 'button',
            text: 'remove all',
            on: {
              click () {
                todos.clear()
              }
            }
          }
        }
      }
    }
  }
})

app.patch(() => {
  // this will be fixed in vjs (faster each)
  for (var i in todos._speshkeys) {
    todos[todos._speshkeys[i]].set({ done: true })
  }
  todos.clear()
  app.patch(() => {
    app.todoapp.header.title.text.val = 'init: ' + (Date.now() - start) + ' ms'
  })
})
