'use strict'

var Element = require('../../lib')
var Observable = require('vigour-js/lib/observable')
require('./todo.less')

var app = new Element({
  DOM: document.body
})

var Input = new Element({
  type: 'input',
  value: { $: 'title' },
  on: {
    keyup () {
      console.log('key up lezzgo')
    }
  }
}).Constructor

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
        click () {
          console.log('ok remove!')
          // this.parent.parent.origin.remove()
          app.patch()
        }
      }
    }
  },
  edit: {
    type: 'input'
  }
}).Constructor

var todos = new Observable({
  todo: {
    title: 'some todo from datax'
  }
})

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
          css: 'main',
          $collection: true,
          Child: Todo,
          val: todos
        }
      }
    }
  }
})

/*
 type: 'section',
    title: {
      type: 'h1',
      text: 'todo-app'
    },
    ['todo-list']: {
      type: 'ul',
      css: 'main',
      $collection: true,
      Child: Todo,
      val: todos
    }
*/