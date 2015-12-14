'use strict'
var Property = require('../')
var render = require('../../events/render')
var isNumberLike = require('vigour-js/lib/util/is/numberlike')
var FACTOR = 1.075

document.body.addEventListener('touchstart', function (e) {
  e.preventDefault()
}, false)

function roll (scroll, delta) {
  scroll.rafId = window.requestAnimationFrame(function () {
    delta = delta / FACTOR
    scroll.origin.set(scroll.val - delta)
    if (Math.abs(delta) > FACTOR) {
      roll(scroll, delta)
    } else {
      scroll.setKey('dragging', false)
    }
  })
}

module.exports = function (scrollType) {
  var direction
  var otherDirection
  var onrender = {}
  var ondata = {}
  var onnew = {}
  var flag = {}

  if (scrollType === 'scrollTop') {
    direction = 'y'
    otherDirection = 'x'
  } else {
    direction = 'x'
    otherDirection = 'y'
  }

  onrender[scrollType] = function (data, event) {
    var element = this.parent
    var node = element.node
    var val = this.val
    if (isNumberLike(val)) {
      node[scrollType] = val
    } else {
      element.setKey(scrollType, {
        origin: node[scrollType],
        dragging: true
      }, event)
    }
    element[scrollType].setKey('dragging', false)
  }

  onnew[scrollType] = function () {
    var element = this.parent
    var touchstart = {}
    var wheel = {}

    wheel[scrollType] = function (e, event) {
      var scroll = this[scrollType]
      console.log('??', scroll.dragging)
      if (!scroll.dragging) {
        console.log('??')
        var $animation = scroll.$animation
        // TODO remove this '$animation.current &&' check when animation is done
        if (!$animation || $animation.current && $animation.current._input === $animation.end._input) {
          scroll.set({
            origin: this.node[scrollType],
            dragging: true
          }, event)
          scroll.setKey('dragging', false)
        }
      }
    }

    touchstart[scrollType] = function (e, event) {
      var scroll = this[scrollType]
      var otherDimension = e[otherDirection]
      var prev = e[direction]
      var delta
      var scrolled

      window.cancelAnimationFrame(scroll.rafId)

      this.on('touchmove', function (e, event) {
        var dimension = e[direction]
        delta = (dimension - prev)
        prev = dimension

        if (!scrolled) {
          scroll.origin.val -= delta
          if (Math.abs(delta) > Math.abs(otherDimension - e[otherDirection])) {
            this[scrollType].setKey('dragging', true)
            // cancel click
            scrolled = true
          } else {
            this[scrollType].setKey('dragging', false)
            this.off('touchmove', scrollType)
            this.off('touchend', scrollType)
            return
          }
        }

        // TODO cache this!
        this[scrollType].origin.val -= delta
      }, scrollType)

      this.on('touchend', function (e, event) {
        // if (scrolled) {
        //   event.remove()
        // }

        if (delta) {
          roll(this[scrollType], delta)
        }
        this.off('touchmove', scrollType)
        this.off('touchend', scrollType)
      }, scrollType)
    }

    element.set({
      style: {
        overflow: 'scroll'
      },
      on: {
        touchstart: touchstart,
        scroll: wheel
      }
    })
  }

  ondata[scrollType] = function (data, event) {
    var element = this.parent
    var node = element.node
    var val = ~~this.val

    if (node[scrollType] !== val) {
      node[scrollType] = val
      if (this._parent.rendered && node[scrollType] !== val) {
        this.origin.set(node[scrollType])
        window.cancelAnimationFrame(this.rafId)
      }
    }
  }

  flag[scrollType] = new Property({
    key: scrollType,
    inject: render,
    properties: {
      dragging: true
    },
    on: {
      render: onrender,
      data: ondata,
      new: onnew
    }
  })
  return flag
}
