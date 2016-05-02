'use strict'
const vstamp = require('vigour-stamp')
const ua = require('vigour-ua/navigator')
const touch = require('vigour-util/is/touch')
// super unreliable check for chrome emulator for development
let platform
const isChromeEmulator = touch
  && navigator.vendor === 'Google Inc.'
  && (platform = navigator.platform) === 'MacIntel'
  || platform === 'Win32' || platform === 'Win64'

if (ua.platform === 'ios' && touch) {
  document.documentElement.style.cursor = 'pointer'
}

module.exports = !isChromeEmulator
? function addListener (key) {
  document.addEventListener(key, (e) => delegateEvent(key, e))
}
: function addListener (key) {
  if (key.indexOf('mouse') !== -1) return
  document.addEventListener(key, (e) => delegateEvent(key, e))
}

function delegateEvent (key, e) {
  var target = e.target
  var stamp
  do {
    let elem = target._
    if (elem) {
      let listener = elem.__on[key]
      if (listener) {
        if (!stamp) {
          stamp = vstamp.create(key)
        }
        listener.emit(elem, stamp, {
          event: e,
          target: target,
          state: target._s
        })
      }
    }
  } while ((target = target.parentNode))
  if (stamp) {
    vstamp.close(stamp)
  }
}
