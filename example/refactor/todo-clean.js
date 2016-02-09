'use strict'
require('./todo.less')
var Element = require('../../lib')
var isPlain = require('vigour-js/lib/util/is/plainobj')
var Observable = require('vigour-js/lib/observable')
var Data = new Observable({
  inject: require('../../lib/subscription/stamp'),
  Child: 'Constructor'
}).Constructor
var time = Date.now()

// ---------------------------------------
var todos = {}
for (var i = 0; i < 101; i++) {
  todos[i] = { title: 'todo ' + i }
}
todos = d(todos)

function clearMarked (data, event) {
  todos.keys().forEach((key) => {
    if (todos[key].done && todos[key].done.val === true) {
      todos[key].remove(event)
    }
  })
}

function addTodo (e, event) {
  if (e.keyCode === 13) {
    todos._cnt = !todos._cnt ? 1 : todos._cnt + 1
    console.log('new todo?')
    this.state.data.set({
      todos: {
        [todos._cnt]: {
          title: e.currentTarget.value || 'new todo'
        }
      }
    }, event)
    e.currentTarget.value = ''
  }
}

// just change this object better type: 'cnstr' or something
exports.todo = {
  type: 'li',
  view: {
    toggle: {
      type: 'input',
      attributes: {
        type: 'checkbox',
        checked: { $: 'done', $type: 'boolean' }
      },
      on: {
        change () {
          var data = this.state.data.get('done', false)
          data.val = !data.val
        }
      }
    },
    css: { $: 'done' },
    title: {
      type: 'label',
      text: { $: 'title' }
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
  edit: { type: 'input' }
}

exports.todoapp = {
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
      on: { keydown: addTodo }
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
        Child: e('todo')
      }
    },
    footer: {
      clearall: {
        text: 'remove all marked',
        on: { click: clearMarked }
      }
    }
  }
}

// ----- make todos -----
var app = e('todoapp', { DOM: document.body })
app.set(todos)

// --------100 lines approx--------
var Event = require('vigour-js/lib/event')
var raf = setTimeout

window.requestAnimationFrame(function () {
  var event = new Event('done')
  todos.keys().forEach(function (key) {
    todos[key].set({
      done: true
    }, event)
  })
  event.trigger()
  window.requestAnimationFrame(function () {
    var event = new Event('done')
    clearMarked(event)
    event.trigger()
    testComplete()
  })
})

function testComplete () {
  raf(function () {
    var t = Date.now() - time
    app.header.title.val = t
    console.log('TIME TO PARSE', t, 'ms')
  })
}

// -------------------------------------- this is a super nice helper
// one event per render loop
function e (type, set, event) {
  if (typeof type === 'object') {
    return new Element(type, set || false)
  }
  let target = exports[type]
  if (target) {
    // if(!type set type on elem)
    if (isPlain(target)) {
      // this is super efficient lets go for this style!
      target = exports[type] = new Element(target, event).Constructor
    }
    if (target.Constructor) {
      target = target.Constructor
    }
    return new target(set, event || false) //eslint-disable-line
  }
  if (!set) {
    set = {}
  }
  if (!set.type) {
    set.type = type
  }
  return new Element(set, event || false)
}

function d (set, event) {
  return new Data(set, event || false)
}
// ---------------------------------------
