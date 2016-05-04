'use strict'
const setUserSelect = require('../userselect')
const addListener = require('../listener')
const displayed = require('../displayed')
const treshold = require('./treshold')
const fire = require('../fire')
const cancel = global.cancelAnimationFrame
const raf = global.requestAnimationFrame

exports.on = {
  properties: {
    forcedown (val) {
      const elem = this
      if (typeof val === 'function') {
        val = { forcedown: val }
      }
      this.set({
        webkitmouseforcedown: val,
        touchstart: {
          forceDownStart (data) {
            const e = data.event
            const touch = e.touches[0]
            if (touch.force !== void 0) {
              const target = data.target
              const style = target.style
              let forcedown
              let timer = raf(function checkForce () {
                if (displayed(target)) {
                  if (!forcedown) {
                    if (touch.force >= treshold) {
                      fire('forcedown', e, data, val, elem)
                      forcedown = true
                    }
                  } else if (touch.force < treshold) {
                    forcedown = false
                  }
                  timer = raf(checkForce)
                } else {
                  setUserSelect(style, null)
                  removeListener()
                }
              })
              const removeListener = addListener('touchend', function forceDownEnd () {
                setUserSelect(style, null)
                removeListener()
                cancel(timer)
              })
              setUserSelect(style, 'none')
            }
          }
        }
      }, false)
    }
  }
}
