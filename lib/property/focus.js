'use strict'
var app
var Prop = require('./')

exports.define = {
  focusItem (unfocus, event) {
    if (unfocus) {
      unfocus.setKey('css', {removeClass: 'focus'})
      unfocus.emit('blur', void 0, event)
    }
    this.setKey('css', {addClass: 'focus'})
    this.emit('focus', void 0, event)
    // quick fix
    if (!app) {
      app = require('../app')
      app.set({
        properties: {
          focused: true
        }
      })
    }
    app.setKey('focused', this, event)
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

      if (parent[key]) {
        parent[key].focusItem(prevKey && parent[prevKey], event)
        this.prevKey = key
      }
    }
  })
}