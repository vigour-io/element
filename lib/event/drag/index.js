'use strict'
const vstamp = require('vigour-stamp')

exports.inject = require('../')
exports.on = {
  properties: {
    drag (val) {
      const elem = this
      if (typeof val === 'function') {
        val = {drag: val}
      }

      this.setKey('mousedown', function mouseDragStart (data) {
        global.addEventListener('mouseup', mouseDragUp)
        global.addEventListener('mousemove', mouseDragMove)

        function mouseDragMove (e) {
          if (isDisplayed(data.target)) {
            fireEvent(e, data, val, elem)
          } else {
            removeListeners()
          }
        }

        function mouseDragUp (e) {
          fireEvent(e, data, val, elem)
          removeListeners()
        }

        function removeListeners () {
          global.removeEventListener('mousemove', mouseDragMove)
          global.removeEventListener('mouseup', mouseDragUp)
        }
      }, false)

      this.setKey('touchstart', function touchDragStart (data) {
        global.addEventListener('touchend', touchDragUp)
        global.addEventListener('touchmove', touchDragMove)

        function touchDragMove (e) {
          if (isDisplayed(data.target)) {
            fireEvent(e, data, val, elem)
          } else {
            removeListeners()
          }
        }

        function touchDragUp (e) {
          fireEvent(e, data, val, elem)
          removeListeners()
        }

        function removeListeners () {
          global.removeEventListener('touchmove', touchDragMove)
          global.removeEventListener('touchend', touchDragUp)
        }
      }, false)
    }
  }
}

function fireEvent (e, data, listeners, elem) {
  const stamp = vstamp.create('drag')
  data.event = e
  for (let i in listeners) {
    listeners[i].call(elem, data, stamp)
  }
  vstamp.close(stamp)
}

function isDisplayed (target) {
  return target.offsetParent !== null
}
