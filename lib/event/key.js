'use strict'

var Emitter = require('vigour-js/lib/emitter')
exports.inject = require('./')

var map = {
  // left
  37: 'arrowleft',
  4: 'arrowleft', // samsung

  // right
  39: 'arrowright',
  5: 'right', // samsung

  // up
  38: 'arrowup',
  29460: 'arrowup', // samsung

  // down
  40: 'arrowdown',
  29461: 'arrowdown', // samsung

  // back
  8: 'back',
  88: 'back', // samsung
  1537: 'back', // lg web os
  10009: 'back', // tizen os

  // menu / escape
  27: 'menu',
  75: 'menu',

  // enter
  13: 'enter',
  29443: 'enter',

  // rewind
  227: 'rewind',

  // play
  179: 'playbtn',

  // forward
  228: 'forward',

  // space
  32: 'space'
}

var keyEmitter = new Emitter({
  define: {
    generateConstructor: function () {
      return function DerivedEmitter (val, ev, parent, key) {
        if (parent) {
          let set = {}
          set[key] = function (e, event) {
            if (key === map[e.keyCode]) {
              this._on[key].execInternal(this, event, e)
            }
          }
          parent.setKey('keydown', set, ev)
        }
        return Emitter.apply(this, arguments)
      }
    }
  }
})

var properties = {}
for (var i in map) {
  var type = map[i]
  if (!properties[type]) {
    properties[type] = keyEmitter
  }
}

exports.on = {
  properties: properties
}
