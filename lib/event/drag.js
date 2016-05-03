'use strict'
const addListeners = require('./listener')
const vstamp = require('vigour-stamp')

exports.inject = require('./')

exports.on = {
  properties: {
    drag (val) {
      const elem = this
      if (typeof val === 'function') {
        val = {drag: val}
      }
      this.setKey('mousedown', function mouseDragStart (data) {
        const removeListeners = addListeners(
          'mouseup', mouseDragUp,
          'mousemove', mouseDragMove
        )

        function mouseDragMove (e) {
          fireEvent(e, data, val, elem) || removeListeners()
        }

        function mouseDragUp (e) {
          fireEvent(e, data, val, elem)
          removeListeners()
        }
      }, false)

      this.setKey('touchstart', function touchDragStart (data) {
        const removeListeners = addListeners(
          'touchmove', touchDragMove,
          'touchend', touchDragUp
        )

        function touchDragMove (e) {
          fireEvent(e, data, val, elem) || removeListeners()
        }

        function touchDragUp (e) {
          fireEvent(e, data, val, elem)
          removeListeners()
        }
      }, false)
    }
  }
}

function fireEvent (e, data, listeners, elem) {
  if (data.target.offsetParent !== null) {
    const stamp = vstamp.create('drag')
    data.event = e
    for (let i in listeners) {
      listeners[i].call(elem, data, stamp)
    }
    vstamp.close(stamp)
    return true
  }
}
