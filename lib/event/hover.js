'use strict'
const addListener = require('./listener')
const displayed = require('./displayed')
const fire = require('./fire')
const cancel = global.cancelAnimationFrame
const raf = global.requestAnimationFrame

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
            const target = data.target
            const removeListener = addListener('mouseout', (data) => cancel(timer))
            let timer = raf(function hover () {
              if (displayed(target)) {
                fire('hover', e, data, val, elem)
                timer = raf(hover)
              } else {
                removeListener()
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
