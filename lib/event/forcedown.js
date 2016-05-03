'use strict'
const addListener = require('./listener')
const fire = require('./fire')
const cancel = global.cancelAnimationFrame
const raf = global.requestAnimationFrame
const treshold = 0.5

exports.inject = require('./')

exports.on = {
  properties: {
    forcechanged (val) {
      const elem = this
      if (typeof val === 'function') {
        val = { forcedown: val }
      }
      this.set({
        // event for safari atm
        webkitmouseforcechanged: {
          forceChanged: val
        },
        // event for touch (if supports force)
        touchstart: {
          forceChangedStart (data) {
            const e = data.event
            const touch = e.touches[0]
            if (touch.force !== void 0) {
              let force = touch.force
              let timer = raf(function checkForce () {
                if (touch.force !== force) {
                  force = touch.force
                  fire('forcechanged', e, data, val, elem)
                }
                timer = raf(checkForce)
              })
              addListener('touchend', () => cancel(timer))
            }
          }
        }
      }, false)
    },
    forcedown (val) {
      const elem = this
      if (typeof val === 'function') {
        val = { forcedown: val }
      }
      this.set({
        // event for safari atm
        webkitmouseforcedown: {
          forceDown: val
        },
        // event for touch (if supports force)
        touchstart: {
          forceDownStart (data) {
            const e = data.event
            const touch = e.touches[0]
            if (touch.force !== void 0) {
              let timer = raf(function checkForce () {
                if (touch.force >= treshold) {
                  fire('forcedown', e, data, val, elem)
                  removeListener()
                } else {
                  timer = raf(checkForce)
                }
              })
              const removeListener = addListener('touchend', () => cancel(timer))
            }
          }
        }
      }, false)
    },
    forceup (val) {
      const elem = this
      if (typeof val === 'function') {
        val = { forceup: val }
      }
      this.set({
        // event for safari atm
        webkitmouseforceup: {
          forceUp: val
        },
        // event for touch (if supports force)
        touchstart: {
          forceUpStart (data) {
            const e = data.event
            const touch = e.touches[0]
            if (touch.force !== void 0) {
              let forcedown
              let timer = raf(function checkForce () {
                if (!forcedown) {
                  if (touch.force >= treshold) {
                    forcedown = true
                  }
                } else if (touch.force < treshold) {
                  fire('forceup', e, data, val, elem)
                  removeListener()
                  return
                }
                timer = raf(checkForce)
              })
              const removeListener = addListener(
                'touchend', function forceEnd (data) {
                  if (forcedown) {
                    fire('forceup', e, data, val, elem)
                  }
                  cancel(timer)
                }
              )
            }
          }
        }
      }, false)
    }
  }
}
