'use strict'
const ua = require('vigour-ua/navigator')
const touch = require('vigour-util/is/touch')
// super unreliable check for chrome emulator for development (on mac only)
const isChromeEmulator = touch &&
  navigator.vendor === 'Google Inc.' &&
  navigator.platform === 'MacIntel'

if (ua.platform === 'ios' && touch) {
  document.documentElement.style.cursor = 'pointer'
}

module.exports = function addListeners () {
  const a = arguments
  const l = a.length
  for (let i = 0; i < l; i++) {
    addEventListener(a[i], a[++i])
  }
  return function removeListeners () {
    for (let i = 0; i < l; i++) {
      document.removeEventListener(a[i], a[++i])
    }
  }
}

const addEventListener = !isChromeEmulator
? function addEventListener (key, listener) {
  document.addEventListener(key, listener)
}
: function addEventListener (key, listener) {
  const touchEvent = key.indexOf('mouse') === -1
  if (touchEvent) document.addEventListener(key, listener)
}
