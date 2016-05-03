'use strict'
const setUserSelect = require('./userselect')
const addListeners = require('./listener')
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
        // contextmenu for most devices
        contextmenu: {
          mouseRightClick (data) {
            const e = data.event
            fire('rightclick', e, data, val, elem)
            e.preventDefault()
            clearListeners()
          }
        },
        // touchevent for some touch devices
        touchstart: {
          touchRightClickStart (data) {
            const style = data.target.style
            timer = global.setTimeout(() => timer = null, 700)
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
              if (timer) {
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
          global.clearTimeout(timer)
        }
      }
    }
  }
}
