'use strict'
require('./todo.less')


var Element = require('../../lib')
var Observable = require('vigour-js/lib/observable')

var Data = new Observable({
  inject: require('../../lib/subscription/stamp'),
  Child: 'Constructor'
}).Constructor

// // ----- data -----
var d = Date.now()

var todos = global.todos = new Data({})

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
    css: {
      $: 'done'
    },
    title: {
      type: 'label',
      text: {
        $: 'title'
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

function clearAllMarked (data, event) {
  todos.keys().forEach((key) => {
    if (todos[key].done && todos[key].done.val === true) {
      todos[key].remove(event)
    }
  })
}

var Todoapp = new Element({
  css: 'todoapp',
  header: {
    type: 'header',
    title: {
      type: 'h1',
      text: { $: true, $add: ' ms' }
    },
    'new-todo': {
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
        $collection: true,
        Child: Todo
      }
    },
    footer: {
      Child: {
        css: 'footer-button',
        text () { return this.parent.key }
      },
      clearall: {
        text: 'remove all marked',
        on: {
          click: clearAllMarked
        }
      }
    }
  }
}).Constructor

for (var i = 0; i < 101; i++) {
  todos.set({
    [i]: {
      title: 'todo' + i
    }
  })
}

// ----- app -----
app.set({
  todoapp: new Todoapp(todos)
})

// event a module
var Event = require('vigour-js/lib/event')
var raf = window.requestAnimationFrame

raf(function () {
  var event = new Event('done')
  todos.keys().forEach(function (key) {
    todos[key].set({
      done: true
    }, event)
  })
  event.trigger()
})

raf(function () {
  var event = new Event('done')
  clearAllMarked(event)
  event.trigger()
})

testComplete()

function testComplete () {
  raf(function () {
    var t = Date.now() - d
    app.todoapp.header.title.val = t
    console.log('TIME TO PARSE', t, 'ms')
  })
}
