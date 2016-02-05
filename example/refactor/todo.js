'use strict'

var Element = require('../../lib')
var Observable = require('vigour-js/lib/observable')
require('./todo.less')

Observable.prototype.inject(require('../../lib/subscription/stamp'))
// ----- data ----
var focus = new Observable()
var todos = global.todos = new Observable({
  // todo1: {
  //   title: 'some todo from datax',
  //   style: focus
  // }
})

for(var i = 0 ; i < 100; i++) {
  todos.set({ [i]: {
    title: i
  }})
}

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
    // css: {
    //   $: 'style',
    //   // $transform (val) {

    //   //   if(todos[this.parent.parent.key].style.val) {
    //   //     console.log(todos[this.parent.parent.key].style.origin.key, this.parent.parent.key, this.path)
    //   //   }
    //   //   // console.log(todos[this.parent.parent.key].style.origin.key)
    //   //   return
    //   // }
    // },
    title: {
      type: 'label',
      text: {
        $: 'title'
      }
    },
    // and not for this one! (on update ofc)
    destroy: {
      type: 'button',
      on: {
        down () {
          console.error('----->', this.path, this.state.data.key)
          this.state.data.remove()
          // this.state.data = null
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
        }
      }
    }
  }
})
app.patch(() => app.todoapp.header.title.text.val = 'init: ' + (Date.now() - start) + ' ms')
