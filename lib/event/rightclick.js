'use strict'
const setUserSelect = require('./userselect')
const addListeners = require('./listener')
const displayed = require('./displayed')
const timeout = global.setTimeout
const clear = global.clearTimeout
const fire = require('./fire')

exports.inject = require('./')

exports.on = {
  properties: {
    rightclick (val) {
      const elem = this
      var removeListeners, timer

      if (typeof val === 'function') {
        val = { rightclick: val }
      }

      this.set({
        contextmenu: {
          mouseRightClick (data) {
            const e = data.event
            fire('rightclick', e, data, val, elem)
            e.preventDefault()
            clearListeners()
          }
        },
        touchstart: {
          touchRightClickStart (data) {
            const target = data.target
            const style = target.style
            timer = timeout(() => timer = null, 700)
            removeListeners = addListeners(
              'touchmove', clearRightClick,
              'touchend', rightClick
            )

            setUserSelect(style, 'none')
            clearListeners()

            function clearRightClick () {
              setUserSelect(style, null)
              clearListeners()
            }

            function rightClick (e) {
              if (timer && displayed(target)) {
                fire('rightclick', e, data, val, elem)
              }
              clearRightClick()
            }
          }
        }
      }, false)

      function clearListeners () {
        if (removeListeners) {
          removeListeners()
        }
        if (timer) {
          clear(timer)
        }
      }
    }
  }
}
