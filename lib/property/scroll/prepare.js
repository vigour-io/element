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
      scroll.origin.set(~~minmax(scrollval, max), false)
      TEMPNODE[TEMPSCROLLTYPE] = ~~minmax(scrollval, max)
      if (Math.abs(delta) > FACTOR) {
        roll(scroll, delta, scrollval, element, store, max, TEMPNODE, TEMPSCROLLTYPE)
      } else {
        scroll.patch({stamp: 'fix'})
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

      e.startPropagation()

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

        e.startPropagation()

        e = parseEvent(e)
        var dimension = e[y]
        delta = dimension - prev
        prev = dimension
        scrollval -= delta
        if (!scrolled) {
          scroll.origin.set(scrollval, false)
          if (Math.abs(delta) > Math.abs(otherDimension - e[x])) {
            scrolled = true
          } else {
            delegator.removeGlobalEventListener(MOVE, scrollmove)
            delegator.removeGlobalEventListener(UP, scrollend)
            return
          }
        }

        // element[scrollType].origin.set(minmax(scrollval, max))
        element[scrollType].origin.set(~~minmax(scrollval, max), false)
        node[scrollType] = ~~minmax(scrollval, max)
      }

      var scrollend = function scrollend (e) {
        e.startPropagation()
        element.applyContext(store)
        if (scrolled) {
          if (delta) {
            element[scrollType].patch({stamp: 'fix'})
          }
          e._rawEvent.preventClick = true
        }
        if (delta) {
          roll(element[scrollType], delta, node[scrollType], element, store, max, node, scrollType)
          // roll(element[scrollType], delta, scrollval, element, store, max, node, scrollType)
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
      if (val && this.parent.scrollTop.val !== false) {
        prepOverflow(properties)
        prepScroll(this.parent, properties, 'scrollTop', 'x', 'y')
      }
    }
  }),
  scrollLeftListeners: new Prop({
    render (val, properties, children) {
      if (val && this.parent.scrollLeft.val !== false) {
        prepOverflow(properties)
        prepScroll(this.parent, properties, 'scrollLeft', 'y', 'x')
      }
    }
  })
}
