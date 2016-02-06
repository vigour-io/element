'use strict'
require('./todo.less')
var Element = require('../../lib')
var Observable = require('vigour-js/lib/observable')
// this needs to be injectable on everything!!!!
// Observable.prototype.inject(require('../../lib/subscription/stamp'))
global.h = new Observable({
  bla: {
    x: true
  }
})

global.hx = new global.h.Constructor()

hx.bla.x.remove()

console.log(hx)
// ----- data ----
// var Syncable = require('vigour-hub/lib/syncable')
// Syncable.prototype.inject(require('../../lib/subscription/stamp'))
// var Hub = require('vigour-hub')
// var hub = global.hub = new Hub({
//   adapter: {
//     inject: require('vigour-hub/lib/protocol/websocket'),
//     websocket: 'ws://localhost:3033',
//     scope: {
//       val: 'james',
//       inject: require('vigour-js/lib/observable/storage')
//     }
//   }
// })
// var todos = hub.get('shows', {})

// this here fails miserably!
var Data = new Observable({
  inject: require('../../lib/subscription/stamp'),
  Child: 'Constructor'
}).Constructor

var todos = global.todos = new Data({})

todos.set({
  aTodoItem: {
    title: 'hello',
    something: 'something hur'
  }
})

var cases = global.cases = require('../../lib/cases')

global.fakecase = new Observable({
  val: true,
  on: {
    click () {}
  }
})

global.fakecase2 = new Observable(global.fakecase)

cases.set({
  $wild: {
    val: false
    // on: {
    //   data () {
    //     console.error('GO GO GO GO')
    //   }
    // }
  } // element cases
})

// // ----- ui -----
var app = global.app = new Element({
  DOM: document.body
})

// // ----- todo -----
var Todo = new Element({
  key: 'todo',
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
      $: 'done',
      $transform (val) {
        return val ? 'haha' : 'no'
      }
    },
    title: {
      type: 'label',
      text: {
        // does not work (yet)
        // $prepend: { $: 'something' },
        $: 'title',
        $add: global.fakecase2
      }
    },
    on: {
      down () {
        this.set({
          css: {
            james: 'james'
          }
        })
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

var Todoapp = new Element({
  css: 'todoapp',
  header: {
    type: 'header',
    title: {
      type: 'h1',
      text: 'todo-app'
    },
    // user: {
    //   type: 'input',
    //   css: 'new-todo',
    //   value: hub.adapter.scope,
    //   on: {
    //     keyup (e, event) {
    //       hub.adapter.scope.set(e.currentTarget.value, event)
    //     }
    //   }
    // },
    ['new-todo']: {
      type: 'input',
      attributes: {
        placeholder: {
          // val: hub.adapter.scope,
          val: ', what needs to be done?'
        }
      },
      on: {
        keydown (e, event) {
          if (e.keyCode === 13) {
            // hub.adapter.scope.val
            todos.set({ [ ('z-' + Math.random() * 9999) ]: {
              title: e.currentTarget.value || 'new todo' }
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
        attributes: {
          type: 'checkbox',
          checked: true
        }
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
      removemyself: {
        on: {
          click (ev, event) {
            // var a = this.set('resolve')
            // console.log('')
            // dont emit nested for element not nessecary
            this.patch(event)
            this.css.remove(event)
          }
        }
      },
      clearall: {
        text: 'remove all',
        on: {
          click () { todos.clear() }
        }
      },
      wildcase: {
        text: { val: 'its off!', $wild: 'its wild!' },
        on: {
          click () {
            cases.$wild.val = !cases.$wild.val
          }
        }
      },
      alldone: {
        text: {
          val: 'enable all',
          $wild: 'MY BITCH',
          $transform (val) {
            return this.parent.checked ? 'disable all' : val
          }
        },
        on: {
          click (ev, event) {
            var toggle = true
            if (this.checked === true) {
              toggle = false
            }
            this.checked = toggle
            this.text.patch(event)
            todos.keys().forEach((val) => todos[val].set({ done: toggle }, event))
          }
        }
      }
    }
  }
}).Constructor

// // ----- app -----
console.clear()

app.set({
  time: {
    text: {}
  },
  $: true,
  // todoapp: new Todoapp(new Data({ todos: todos }))
  // apps: {
  //   $collection: true,
  //   Child: Todoapp
  // }
  todoapp: new Todoapp(new Data({ todos: todos }))
})

// var dataapps = new Data({
//   a: {
//     title: 'a',
//     todos: todos
//   },
//   b: {
//     title: 'b',
//     todos: todos
//   }
// })

// // .val needs to work!
// console.clear()
// app.apps.set(dataapps)

// setTimeout(function () {
//   console.clear()
//   console.log('--------------------')
//   global.fakecase.val = 222222
// }, 100)

