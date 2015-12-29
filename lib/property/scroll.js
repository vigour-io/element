'use strict'
var isNumberLike = require('vigour-js/lib/util/is/numberlike')
var Prop = require('./')
const FACTOR = 1.075

exports.properties = {
  scrollLeft: new Prop({
    render (node) {
      var val = ~~this.parseValue()
      if (!node._scrollLeft_) {
        prepareScroll(val, this.parent, node, 'scrollLeft', 'y', 'x')
        node._scrollLeft_ = true
      } else if (node.scrollLeft !== val) {
        node.scrollLeft = val
        if (node.scrollLeft !== val) {
          this.origin.set(node.scrollLeft)
          window.cancelAnimationFrame(this.rafId)
        }
      }
    }
  }),
  scrollTop: new Prop({
    render (node) {
      var val = ~~this.parseValue()
      if (!node._scrollTop_) {
        prepareScroll(val, this.parent, node, 'scrollTop', 'x', 'y')
        node._scrollTop_ = true
      } else if (node.scrollTop !== val) {
        node.scrollTop = val
        if (node.scrollTop !== val) {
          this.origin.set(node.scrollTop)
          window.cancelAnimationFrame(this.rafId)
        }
      }
    }
  })
}

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

function prepareScroll (val, element, node, scrollType, x, y) {
  node.style.overflow = 'scroll'
  element[scrollType].setKey('dragging', false)

  element.on('wheel', function () {
    this[scrollType].origin.set(node[scrollType])
  })

  element.on('touchstart', function (e, event) {
    var scroll = this[scrollType]
    var otherDimension = e[x]
    var prev = e[y]
    var delta
    var scrolled

    window.cancelAnimationFrame(scroll.rafId)

    this.on('touchmove', function (e, event) {
      var dimension = e[y]
      delta = (dimension - prev)
      prev = dimension
      if (!scrolled) {
        scroll.origin.val -= delta
        if (Math.abs(delta) > Math.abs(otherDimension - e[x])) {
          this[scrollType].setKey('dragging', true)
          scrolled = true
        } else {
          this[scrollType].setKey('dragging', false)
          this.off('touchmove', scrollType)
          this.off('touchend', scrollType)
          return
        }
      }
      this[scrollType].origin.val -= delta
    }, scrollType)

    this.on('touchend', function (e, event) {
      if (delta) {
        roll(this[scrollType], delta)
      }
      this.off('touchmove', scrollType)
      this.off('touchend', scrollType)
    }, scrollType)
  })

  window.requestAnimationFrame(function () {
    node[scrollType] = val
  })
}
