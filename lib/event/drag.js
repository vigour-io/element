'use strict'
const addListeners = require('./listener')
const attachEvent = require('./attach')
const fire = require('./fire')
const attachStartPos = attachEvent.start

exports.inject = require('./')
exports.on = {
  properties: {
    drag (val) {
      const elem = this

      if (typeof val === 'function') {
        val = { drag: val }
      }
      this.setKey('mousedown', { mouseDragStart (data) {
        var dragged, removeListeners

        if (data.event.which !== 3) {
          removeListeners = addListeners(
            'mouseup', mouseDragUp,
            'mousemove', mouseDragMove
          )
          attachStartPos(data)
        }

        function mouseDragMove (e) {
          if (fire('drag', e, data, val, elem)) {
            dragged = true
          } else {
            removeListeners()
          }
        }

        function mouseDragUp (e) {
          if (dragged) {
            fire('drag', e, data, val, elem)
          }
          removeListeners()
        }
      } }, false)

      this.setKey('touchstart', { touchDragStart (data) {
        var dragged
        const removeListeners = addListeners(
          'touchmove', touchDragMove,
          'touchend', touchDragUp
        )

        attachStartPos(data)

        function touchDragMove (e) {
          if (fire('drag', e, data, val, elem)) {
            dragged = true
          } else {
            removeListeners()
          }
        }

        function touchDragUp (e) {
          if (dragged) {
            fire('drag', e, data, val, elem)
          }
          removeListeners()
        }
      } }, false)
    }
  }
}
