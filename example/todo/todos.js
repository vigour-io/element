'use strict'
var methods = require('./methods')

exports.components = {
  todo: {
    type: 'li',
    text: { $: 'title' }
  },
  button: {
    type: 'button',
    text () { return this.parent.key },
    css: 'todo-button'
  },
  project: {
    // type: 'todo', // WRONG has to take over todo of course
    title: {
      type: 'h1',
      text: { $: 'title', $add: ' burf' }
    },
    todos: {
      // type: 'todos' // WRONG should not break
      type: 'ul', // edge case want to use todo but bit hard to double ref
      $collection: 'todos',
      Child: { type: 'todo' }
    }
  },
  todos: {
    type: 'ul',
    title: { type: 'h1', text: 'these are my todos!!' },
    $collection: true,
    Child: { type: 'todo' },
    properties: {
      project: { type: 'project' }
    }
  }
}

exports.todos = { type: 'todos' }

exports.list = {
  $collection: true,
  properties: {
    project: {
      text: 'dope'
    }
  }
}


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
