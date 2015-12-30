'use strict'
var Property = require('../')

exports.properties = {
  /**
   * Use image to set the element backgroundImage
   * @type {string}
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   background: { image: "imagePath/dog.png" }
   * })
   *
   */
  image: new Property({
    render (node, event) {
      var val = this.parseValue()
      if (val) {
        emitEvents.call(this, val)
        node.style.backgroundImage = 'url(' + val + ')'
      } else {
        node.style.backgroundImage = null
      }
    }
  })
}

function emitEvents (val) {
  // TODO: when we build error emitter in vigour-js
  // we are going to lookup for error (max 2 level)
  // if on background -- fire!
  // if on element -- fire!
  var img
  var _this
  var on = this.on
  if (on && (on.load || on.error)) {
    img = document.createElement('img')
    _this = this
    // if i have on.load
    if (on.error) {
      img.onerror = function () {
        // data "image", "404-image", or { types: [] } //multiple errors in one event loop
        // make this in vigour-js!!!!
        _this.emit('error')
        img.onerror = null
      }
    }
    if (on.load) {
      img.onload = function () {
        _this.emit('load')
        img.onload = null
      }
    }
    img.src = val
  }
}
