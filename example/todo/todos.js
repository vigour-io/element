'use strict'
var methods = require('./methods')

exports.components = {
  todo: {
    type: 'span',
    text: { $: 'title' }
  },
  button: {
    type: 'button',
    text () { return this.parent.key },
    css: 'todo-button'
  },
  project: {
    type: 'section',
    text: {
      $: 'title'
    },
    title: {
      type: 'h1',
      text: { $: 'title', $add: ' burf' }
    },
    // todos: {
    //   type: 'todos',
    //   $: 'todos'
    // }
  },
  todos: {
    title: { type: 'h1', text: 'yo todos!' },
    $collection: true,
    Child: { type: 'todo' },
    properties: {
      project: { type: 'project' }
    }
  }
}

exports.todos = { type: 'todos' }

// exports.buttons = {
//   Child: { type: 'button' },
//   clearAll: {
//     text: {
//       // $: true, // ORIGIN ERROR
//       $transform (val) {
//         return this.parent.state.data.keys().length
//           ? val
//           : 'add 1000'
//       }
//     },
//     on: {
//       click: methods.toggleTodos
//     }
//   }
// }
