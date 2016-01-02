'use strict'
var Observable = require('vigour-js/lib/observable')
var Prop = require('../property')
// string renderer
module.exports = new Observable({
  properties: {
    node: function (val) {
      this._node = val
    }
  },
  define: {
    serialize () {
      if (this.___cache) {
        return this.___cache
      }
      var obj = {}
      // for example
      var str = '<body>'
      walk(this, obj)
      str += '</body>'
      this.___cache = str
      return str
      function walk (obs, obj) {
        obs.each(function (prop, key) {
          if (key === 'text') {
            str += prop.val
          }
        }, function (prop) { return (prop instanceof Prop) })
        obs.each(function (prop, key) {
          var type = prop.type || 'div'
          obj[key] = {}
          str += '<' + type + ' class="' + (prop.css ? prop.css.val : key) + '"' +
          ' data-key="' + prop.getHashedPath() + '"'
          if (prop.src) {
            str += ' src="' + prop.src.val + '"'
          }
          str += '>'
          walk(prop, obj[key])
          str += '</' + type + '>'
        })
      }
    },
    setKey (key, val) {
      var ret = Observable.prototype.setKey.apply(this, arguments)
      return ret
    }
  },
  inject: require('vigour-js/lib/operator/transform'),
  $transform () {
    return this.serialize()
  }
}).Constructor

// how to take care of this think about scenario where you have to take care of canvas engine
// what is the entry point for engine
// how do you enhance the props for certain engines?
// --this is going to be it
// you can define the render function for engies
// since render will NEVER be called on the element we can simply enhance it when nessecary
// render is a hook to a central object that maps to functions
// this way it becomes super easy to seperate that shit
// add server here as well needs to get a handle for firstLoad complete
//  -- this will be done immediatly in the hub scenario
