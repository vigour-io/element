'use strict'
exports.toggleTodos = function (data, event) {
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
    state.data._keys = null
    console.log('keys', state.data.keys())
    state.data.keys()
    console.timeEnd('keys')
  }
  state.data.emit('data')
}
