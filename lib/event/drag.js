'use strict'
const addListeners = require('./listener')
const displayed = require('./displayed')
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

      this.set({
        mousedown: {
          mouseDragStart (data) {
            var dragged, removeListeners, target

            if (data.event.which !== 3) {
              removeListeners = addListeners(
                'mouseup', mouseDragUp,
                'mousemove', mouseDragMove
              )
              target = data.target
              attachStartPos(data)
            }

            function mouseDragMove (e) {
              if (displayed(target)) {
                fire('drag', e, data, val, elem)
                dragged = true
              } else {
                removeListeners()
              }
            }

            function mouseDragUp (e) {
              if (dragged && displayed(target)) {
                fire('drag', e, data, val, elem)
              }
              removeListeners()
            }
          }
        },
        touchstart: {
          touchDragStart (data) {
            var dragged
            const target = data.target
            const removeListeners = addListeners(
              'touchmove', touchDragMove,
              'touchend', touchDragUp
            )

            attachStartPos(data)

            function touchDragMove (e) {
              if (displayed(target)) {
                fire('drag', e, data, val, elem)
                dragged = true
              } else {
                removeListeners()
              }
            }

            function touchDragUp (e) {
              if (dragged && displayed(target)) {
                fire('drag', e, data, val, elem)
              }
              removeListeners()
            }
          }
        }
      })
    }
  }
}
