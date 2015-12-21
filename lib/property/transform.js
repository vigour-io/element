'use strict'

var Emitter = require('vigour-js/lib/emitter')
var Property = require('./')
var ua = require('../ua')
var prefix = ua.prefix

exports.on = {
  properties: {
    transform: Emitter
  },
  transform () {
    var str = ''
    var x = this.x && this.x.val | 0
    var y = this.y && this.y.val | 0
    var rotate = this.rotate && this.rotate.val | 0
    var scale = this.scale && this.scale.val

    if (x || y) {
      str += 'translate3d(' + (x || 0) + 'px, ' + (y || 0) + 'px, 0px)'
    }

    if (rotate) {
      str += 'rotate(' + rotate + 'deg)'
    }

    if (scale || scale === 0) {
      if (scale < 1e-6) {
        scale = 1e-6
      }
      str += 'scale(' + scale + ')'
    }

    this.node.style[prefix + 'Transform'] = str
  }
}

var Transform = new Property({
  inject: require('../animation'),
  on: {
    data: {
      transform (data, event) {
        if (data !== null) {
          this.parent.emit('transform', data, event)
        }
      }
    }
  }
}).Constructor

exports.properties = {
  /**
   * This is shortcut for css `translateX()` transform,
   * but is applies as {@link Property.translate3d}
   * @type {number}
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   x: 400
   * })
   *
   */
  x: Transform,

  /**
   * This is shortcut for css `translateY()` transform,
   * but is applies as {@link Property.translate3d}
   * @type {number}
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   y: 400
   * })
   *
   */
  y: Transform,

  /**
   * This is shortcut for css `translateZ()` transform,
   * but is applies as {@link Property.translate3d}
   * @type {number}
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   z: 15
   * })
   */
  z: Transform,

  /**
   * This is shortcut for css `rotate()` transform
   * @type {number}
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   rotate: 30
   * })
   */
  rotate: Transform,

  /**
   * This is shortcut for css `scaleX()` transform
   * but is applies as {@link Property.scale}
   * @type {number}
   * @memberOf Property
   * @todo it can be x and y instead of only value
   *
   * @example
   * var a = new Element({
   *   scale: 1.4
   * })
   */
  scale: Transform
}
