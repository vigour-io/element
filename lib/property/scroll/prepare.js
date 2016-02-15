'use strict'
// var Event = require('vigour-js/lib/event')
var delegator = require('../../event/delegator')
var parseEvent = require('../../event/util').parseEvent
var cases = require('../../cases')
var Prop = require('../')
var prepOverflow = (properties) => {
  var style = properties.style
  if (style) {
    style.overflow = 'scroll'
  } else {
    properties.style = {
      overflow: 'scroll'
    }
  }
}
var prepScroll

const FACTOR = 1.075

delegator.listenTo('scroll')

if (cases.$touch.val) {
  delegator.listenTo('touchmove')

  const MOVE = 'touchmove'
  const UP = 'touchend'

  let roll = function roll (scroll, delta, scrollval, element, store, max, TEMPNODE, TEMPSCROLLTYPE) {
    scroll.rafid = global.requestAnimationFrame(function () {
      scroll.rafid = null
      element.applyContext(store)
      delta = delta / FACTOR
      scrollval -= delta
      // scroll.origin.set(~~minmax(scrollval, max))
      TEMPNODE[TEMPSCROLLTYPE] = ~~minmax(scrollval, max)
      if (Math.abs(delta) > FACTOR) {
        roll(scroll, delta, scrollval, element, store, max, TEMPNODE)
      } else {
        scroll._scrolling_ = null
      }
    })
  }
  let minmax = function minmax (scrollval, max) {
    if (scrollval < 0) {
      scrollval = 0
    } else if (scrollval > max) {
      scrollval = max
    }
    return scrollval
  }

  prepScroll = function prepScroll (element, properties, scrollType, x, y) {
    var store = element.storeContext()

    properties['ev-touchstart'] = (e) => {
      e = parseEvent(e)

      var node = e.currentTarget
      var max = x === 'x' ? node.scrollHeight - node.clientHeight : node.scrollWidth - node.clientWidth
      var scroll = element[scrollType]
      var scrollval = node[scrollType]//scroll.val
      var otherDimension = e[x]
      var prev = e[y]
      var delta
      var scrolled

      element[scrollType]._scrolling_ = true

      if (scroll.rafid) {
        global.cancelAnimationFrame(scroll.rafid)
        scroll.rafid = null
      }

      var scrollmove = function scrollmove (e) {
        element.applyContext(store)

        e = parseEvent(e)
        var dimension = e[y]
        delta = dimension - prev
        prev = dimension
        scrollval -= delta
        if (!scrolled) {
          scroll.origin.val = scrollval
          if (Math.abs(delta) > Math.abs(otherDimension - e[x])) {
            scrolled = true
          } else {
            delegator.removeGlobalEventListener(MOVE, scrollmove)
            delegator.removeGlobalEventListener(UP, scrollend)
            return
          }
        }

        // element[scrollType].origin.set(minmax(scrollval, max))
        // element[scrollType].origin.set(~~minmax(scrollval, max))
        node[scrollType] = ~~minmax(scrollval, max)
      }

      var scrollend = function scrollend (e) {
        if (scrolled) {
          e._rawEvent.preventClick = true
        }
        element.applyContext(store)
        if (delta) {
          roll(element[scrollType], delta, scrollval, element, store, max, node, scrollType)
        } else {
          element[scrollType]._scrolling_ = null
        }

        delegator.removeGlobalEventListener(MOVE, scrollmove)
        delegator.removeGlobalEventListener(UP, scrollend)
      }

      delegator.addGlobalEventListener(MOVE, scrollmove)
      delegator.addGlobalEventListener(UP, scrollend)
    }
  }
} else {
  prepScroll = function prepScroll (element, properties, scrollType, x, y) {
    // var store = element.storeContext()
    // properties['ev-scroll'] = (ev) => {
    //   element.applyContext(store)
    //   let event = false //new Event('data')
    //   // event.render = false
    //   element[scrollType].origin.set(ev.currentTarget[scrollType], event)
    //   // event.trigger()
    // }
  }
}

exports.properties = {
  scrollTopListeners: new Prop({
    render (val, properties, children) {
      if (val || val === 0) {
        prepOverflow(properties)
        prepScroll(this.parent, properties, 'scrollTop', 'x', 'y')
      }
    }
  }),
  scrollLeftListeners: new Prop({
    render (val, properties, children) {
      if (val || val === 0) {
        prepOverflow(properties)
        prepScroll(this.parent, properties, 'scrollLeft', 'y', 'x')
      }
    }
  })
}
