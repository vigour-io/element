'use strict'

exports.components = {
  todo: {
    type: 'input',
    text: { $: 'title' }
  },
  button: {
    type: 'button',
    text: 'click me!',
    css: 'randomass-button'
  }
}

exports.todos = {
  title: { type: 'h1', text: 'yo todos!' },
  $collection: true,
  Child: { type: 'todo' }
}

// exports.buttons = {
//   text: 'buttons!'
//   // Child: { type: 'button' },
//   // gurk: {}
// }
// // nu nested stuff as well
