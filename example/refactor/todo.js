'use strict'

var Element = require('../../lib')
var Observable = require('vigour-js/lib/observable')
require('./todo.less')

// ----- data ----
var todos = new Observable({
  todo: {
    title: 'some todo from datax'
  }
})

// ----- ui -----
var app = new Element({
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
      text: { $: 'title' }
    },
    destroy: {
      type: 'button',
      on: {
        down () {
          console.log('ok remove!')
          app.patch()
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
          keyup () {
            console.log('lullllz')
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
