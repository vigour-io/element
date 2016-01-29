'use strict'
var app
var Prop = require('./')
// var Event = require('vigour-js/lib/event')
// var test = /\$fo/
// var cnt = 0

exports.define = {
  // setFocus () {
  //   let stamp = '$fo' + (cnt++)
  //   let event = new Event(
  //     'data',
  //     stamp
  //   )

  //   this.parent.set({
  //     focus: this
  //   }, event)
  //   event.trigger()
  // },
  focusItem (unfocus, event) {
    if (unfocus) {
      this.unfocusItem(unfocus, event)
    }
    // quick fix
    if (!app) {
      app = require('../app')
    }

    if (!app.focused) {
      app.setKey('focused', {}, event)
    }

    app.focused._input = this
    app.focused.emit('data', this, event)

    this.setKey('css', {add: 'focus'})
    this.emit('focus', unfocus, event)
  },
  unfocusItem (unfocus, event) {
    if (!unfocus) {
      unfocus = this
    }
    if (unfocus.constructor === Array) {
      for (var i = unfocus.length - 1; i >= 0; i--) {
        unfocus[i].setKey('css', {remove: 'focus'})
        unfocus[i].emit('blur', void 0, event)
      }
    } else {
      unfocus.setKey('css', {remove: 'focus'})
      unfocus.emit('blur', void 0, event)
    }
  }
}

exports.properties = {
  focus: new Prop({
    properties: {
      prevKey: true
    },
    prevKey: false,
    render (node, event, parent) {
      var val = this.parseValue()
      var type = typeof val
      var prevKey = this.prevKey
      var key

      if (type === 'string' || type === 'number') {
        key = val
      } else {
        key = val.key
      }

      if (key !== prevKey || app && app.focused._input && app.focused._input._input === null) {
        if (parent[key]) {
          parent[key].focusItem(prevKey && parent[prevKey], event)
          this.prevKey = key
        }
      }
    }
  })
}
