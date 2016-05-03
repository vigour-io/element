'use strict'
const addListener = require('./listener')
const fire = require('./fire')
const cancel = global.cancelAnimationFrame
const raf = global.requestAnimationFrame
const treshold = 0.5

exports.inject = require('./')

exports.on = {
  properties: {
    hover (val) {
      const elem = this
      if (typeof val === 'function') {
        val = { hover: val }
      }
      this.set({
        mouseover: {
          hoverStart (data) {
            const e = data.event
            const removeListener = addListener('mouseout', (data) => cancel(timer))
            let timer = raf(function hover () {
              if (fire('hover', e, data, val, elem)) {
                timer = raf(hover)
              } else {
                removeListener()
                cancel(timer)
              }
            })
            fire('hover', e, data, val, elem)
          }
        },
        touchmove: val
      }, false)
    }
  }
}
