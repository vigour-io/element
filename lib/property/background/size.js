'use strict'
var Property = require('../')
var shared = require('./shared')
var Parameter = shared.Parameter
var parse = shared.parseParameters

exports.properties = {
  width: new Parameter({
    property: 'size'
  }),
  height: new Parameter({
    property: 'size'
  }),
  size: new Property({
    on: {
      data: {
        dom: function (data, event) {
          var val = data !== null && parse.call(this, 'width', 'height', 'auto', 'auto')
          var node = this.lookUp('node')
          node.style.backgroundSize = val || null
        }
      }
    }
  })
}
