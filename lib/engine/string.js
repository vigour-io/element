'use strict'
var Observable = require('vigour-js/lib/observable')
var Prop = require('../property')
// string renderer
// **** TODO ****
// * call it html
module.exports = new Observable({
  properties: {
    _Element: true,
    prerendered: true
  },
  _Element: require('../element'),
  define: {
    serialize () {
      if (this.___cache) {
        return this.___cache
      }
      var obj = {}
      var str = ''
      walk(this, obj, 0)
      this.___cache = str // CLEAR IT!
      return str
      function walk (obs, obj, level) {
        obs.each(function (prop, key) {
          if (key === 'text') {
            str += (indent(level) + '  ' + prop.val)
          }
        }, function (prop) { return (prop instanceof Prop) })
        obs.each(function (prop, key) {
          var type = prop.type || 'div'
          obj[key] = {}
          str += (indent(level) + '<' + type + ' class="' + (prop.css ? prop.css.val : key) + '"') +
          ' data-hash="' + prop.getHashedPath() + '"' +
          ' debug-path="' + prop.path.join('.') + '"'
          if (prop.src) {
            str += ' src="' + prop.src.val + '"'
          }
          str += '>'
          let cache = str.length
          walk(prop, obj[key], (level + 1))
          if (str.length === cache) {
            // str[0] = ' /'
            str = str.slice(0, -1)
            str += '/>'
          } else {
            str += (indent(level) + '</' + type + '>')
          }
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

function indent (level) {
  var str = '\n  '
  for (var i = 0; i < level; i++) {
    str += '  '
  }
  return str
}
