'use strict'

exports.components = {
  todo: {
    type: 'span',
    text: { $: 'title' }
  },
  button: {
    type: 'button',
    text () {
      return this.parent.key
    },
    css: 'todo-button'
  },
  project: {

  }
}

exports.todos = {
  title: { type: 'h1', text: 'yo todos!' },
  $collection: true,
  Child: { type: 'todo' }
}

exports.buttons = {
  Child: { type: 'button' },
  clearAll: {
    text: {
      // $: true, // ORIGIN ERROR
      $transform (val) {
        return this.parent.state.data.keys().length
          ? val
          : 'add 1000'
      }
    },
    on: {
      click (ev, event) {
        var state = this.state
        if (state.data.keys().length) {
          state.data.clear(event)
        } else {
          var i = 10000
          console.time('t')
          while (--i) {
            // .add would be nice that generates keys
            state.data.setKey(i, { title: 'blurf-' + i }, false)
          }
          console.timeEnd('t')
          console.time('keys')
          state.data.keys()
          console.timeEnd('keys')
        }
        state.data.emit('data')
      }
    }
  }
}
