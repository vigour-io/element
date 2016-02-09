'use strict'
require('./todo.less')
var Element = require('../../lib')
var Observable = require('vigour-js/lib/observable')

var Data = new Observable({
  inject: require('../../lib/subscription/stamp'),
  Child: 'Constructor'
}).Constructor

var todos = global.todos = new Data({})

todos.set({
  'bTodoItem': {
    title: 'hel222lo',
    something: 'something hur 2',
    done: true
  }
})

// // ----- ui -----
var app = global.app = new Element({
  DOM: document.body
})

// // ----- todo -----
var Todo = new Element({
  type: 'li',
  view: {
    toggle: {
      type: 'input',
      attributes: {
        type: 'checkbox',
        checked: {
          $: 'done',
          $type: 'boolean'
        }
      },
      on: {
        change () {
          var data = this.state.data.get('done', false)
          data.val = !data.val
        }
      }
    },
    title: {
      type: 'label',
      text: {
        $: 'title'
      }
    },
    resolver: {
      type: 'button',
      text: 'resolve',
      on: {
        click () {
          console.clear()
          console.log('ok resolve!')
          if (this._input !== null) {
            this.parent.set({
              css: {
                james: 'james'
              }
            })
          }
        }
      }
    },
    destroy: {
      type: 'button',
      $: true,
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

var Todoapp = new Element({
  css: 'todoapp',
  header: {
    type: 'header',
    title: {
      type: 'h1',
      text: { $: 'title', $add: ' schijt' }
    },
    ['new-todo']: {
      type: 'input',
      attributes: {
        placeholder: ', what needs to be done?'
      },
      $: true,
      on: {
        keydown (e, event) {
          if (e.keyCode === 13) {
            todos._cnt = !todos._cnt ? 1 : todos._cnt + 1
            this.state.data.set({
              todos: {
                [ todos._cnt ]: {
                  title: e.currentTarget.value || 'new todo'
                }
              }
            }, event)
            e.currentTarget.value = ''
          }
        }
      }
    },
    main: {
      type: 'section',
      'toggle-all': {
        type: 'input',
        attributes: { type: 'checkbox', checked: true }
      },
      'todo-list': {
        type: 'ul',
        $collection: 'todos',
        Child: Todo
      }
    },
    footer: {
      Child: {
        css: 'footer-button',
        text () { return this.parent.key }
      },
      clearall: {
        text: {
          $prepend: global.sometext
        },
        on: {
          click () { todos.clear() }
        }
      }
    }
  }
}).Constructor

// // ----- app -----
var d = Date.now()
app.set({
  todoapp: new Todoapp(todos)
})

window.requestAnimationFrame(function () {
  var t = Date.now() - d
  app.todoapp.header.title.val = t
  console.log('TIME TO PARSE', t, 'ms')
})
