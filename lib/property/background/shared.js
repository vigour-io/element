'use strict'
var Property = require('../')
var isNumberLike = require('vjs/lib/util/is/numberlike')

exports.Parameter = new Property({
  properties: {
    property: function (val) {
      this.property = val
    }
  },
  on: {
    data: function (data, event) {
      var property = this.property
      if (!this.parent[property]) {
        this.parent.setKey(property, false)
      }
      this.parent[property].emit('data', event)
    }
  }
}).Constructor

exports.parseParameters = function (x, y, xDefault, yDefault) {
  var val
  var parent = this.parent
  if (parent[x] || parent[y]) {
    x = parent[x] && parent[x].val || xDefault || 0
    y = parent[y] && parent[y].val || yDefault || 0
    if (isNumberLike(x)) {
      x = x + 'px'
    }
    if (isNumberLike(y)) {
      y = y + 'px'
    }
    val = x + ' ' + y
    return val
  } else {
    return this.val
  }
}
