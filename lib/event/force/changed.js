'use strict'
const cancel = global.cancelAnimationFrame
const raf = global.requestAnimationFrame
const addListener = require('../listener')
const displayed = require('../displayed')
const fire = require('../fire')

exports.on = {
  properties: {
    forcechanged (val) {
      const elem = this
      if (typeof val === 'function') {
        val = { forcechanged: val }
      }

      this.set({
        webkitmouseforcechanged: val,
        touchstart: {
          forceChangedStart (data) {
            const e = data.event
            const touch = e.touches[0]
            if (touch.force !== void 0) {
              const target = data.target
              let force = touch.force
              let timer = raf(function checkForce () {
                if (displayed(target)) {
                  if (touch.force !== force) {
                    force = touch.force
                    fire('forcechanged', e, data, val, elem)
                  }
                  timer = raf(checkForce)
                } else {
                  removeListener()
                }
              })
              const removeListener = addListener('touchend', function forceChangedEnd () {
                removeListener()
                cancel(timer)
              })
            }
          }
        }
      }, false)
    }
  }
}
