'use strict'
var Prop = require('../')

exports.inject = require('./prepare')

exports.properties = {
  scrollTop: new Prop({
    define: {
      generateConstructor () {
        return function DerivedProperty (val, ev, parent, key) {
          if (parent) {
            parent.setKey('scrollTopListeners', true, ev)
          }
          return Prop.apply(this, arguments)
        }
      }
    },
    render (val, properties, children) {
      properties.scrollTop = val
    }
  }),

  scrollLeft: new Prop({
    define: {
      generateConstructor () {
        return function DerivedProperty (val, ev, parent, key) {
          if (parent) {
            parent.setKey('scrollLeftListeners', true, ev)
          }
          return Prop.apply(this, arguments)
        }
      }
    },
    render (val, properties, children) {
      properties.scrollLeft = val
    }
  })
}