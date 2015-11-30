'use strict'

var Emitter = require('vigour-js/lib/emitter')
var stamp = 0
var platforms = require("./nav/platforms")

exports.inject = require('./down')

exports.on = {
  properties: {
    click: new Emitter({
      emitInstances: false,
      define: {
        generateConstructor: function () {
          return function DerivedEmitter (val, ev, parent, key) {
            // TODO don't expect body to have a base already in this point
            var body = document.body.base

            body.inject(require('./up'))
            body.inject(require('./nav/enterup'))
            var set = {}
            var id = ++stamp + 'click'

            set[id] = function (e, event) {
              var _this = this
              if(platforms.enter[e.keyCode]) {
                body.on('enterUp', function (e, event) {
                  _this.emit(key, e, event)
                  body.off('enterUp', id)
                }, id)
              }
              else if (e.type === 'mousedown') {
                 body.on('up', function (e, event) {
                  _this.emit(key, e, event)
                  body.off('up', id)
                }, id)
              }
            }
            parent.setKey('down', set, ev)
            parent.setKey('enterDown', set, ev)
            return Emitter.apply(this, arguments)
          }
        }
      }
    })
  }
}
