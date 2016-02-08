'use strict'
require('./todo.less')
var Element = require('../../lib')
var Observable = require('vigour-js/lib/observable')
// this needs to be injectable on everything!!!!
// Observable.prototype.inject(require('../../lib/subscription/stamp'))

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
    something: 'something hur',
    done: true
  },
  bTodoItem: {
    title: 'hel222lo',
    something: 'something hur 2',
    done: true
  }
})

for (var i = 0; i < 2; i++) {
  todos.firstChild().set({
    todos: {
      [i]: {
        title: 'lulz ' + i,
        img: 'http://www.ufunk.net/wp-content/uploads/2015/09/De-Jeugd-Van-Tegenwoordig-Manon-' + (Math.round(Math.random() * 5) + 1) + '.jpg'
      }
    }
  })
}

for (var i = 0; i < 2; i++) {
  todos.bTodoItem.set({
    todos: {
      [i]: {
        title: 'lulz ' + i,
        img: 'http://www.ufunk.net/wp-content/uploads/2015/09/De-Jeugd-Van-Tegenwoordig-Manon-' + (Math.round(Math.random() * 5) + 1) + '.jpg'
      }
    }
  })
}

var data = new Data({
  a: {
    current: todos.firstChild(),
    title: 'a',
    todos: { useVal: todos }
  },
  b: {
    current: {},
    title: 'b',
    todos: todos.serialize()
  }
})

data.b.todos.firstChild().title.val = 'xxxx'

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
          console.clear()
          console.warn('------lets set!---------')
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
    background: { $: 'img' },
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
    todos: {
      $collection: 'todos',
      Child: {
        css: 'nested-todo',
        text: { $: 'title' },
        css: {
          $: 'done',
          $transform (val) {
            return val ? 'haha' : 'no'
          }
        },
        on: {
          click () {
            data.a.current.val = this.state.data
          }
        }
      }
    },
    current: {
      type: 'button',
      text: 'current',
      on: {
        click () {
          console.clear()
          console.log('ok current!!')
          if (this._input !== null) {
            data.a.current.val = this.state.data
          }
        }
      }
    },
    destroy: {
      type: 'button',
      on: {
        down () {
          console.clear()
          console.log('ok destroy wtf is your problem!')
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
            console.clear()
            let nr = (Math.round(Math.random() * 5) + 1)
            console.warn('wtf is happenig?', nr)

            this.state.data.set({
              todos: {
                [ ('z-' + Math.random() * 9999) ]: {
                  title: e.currentTarget.value || 'new todo',
                  img: 'http://www.ufunk.net/wp-content/uploads/2015/09/De-Jeugd-Van-Tegenwoordig-Manon-' + nr + '.jpg'
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
            console.clear()
            this.patch(event)
            this.remove(event)
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

var CurrentTodo = new Element({
  $: 'current',
  h1: {
    text: { $: 'title' }
  },
  css: {
    $: 'done',
    $transform (val) {
      return val ? 'haha' : 'no'
    },
    name: 'currenttodo'
  },
  subtasks: new Todoapp()
}).Constructor

// // ----- app -----
// console.clear()

app.set({
  currenttodo: new CurrentTodo(data.a),
  todoapp: new Todoapp(data.a)
  // apps: {
  //   $collection: true,
  //   Child: Todoapp
  // }
})

// // .val needs to work!
// console.clear()
// app.apps.set(dataapps)

// setTimeout(function () {
//   console.clear()
//   console.log('--------------------')
//   global.fakecase.val = 222222
// }, 100)

