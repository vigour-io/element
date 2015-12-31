/**
 * An **event** is an Emitter, the idea of this Object is give to the Elements class
 * the possibility to listen for elements events, like: click, drag, scroll etc.
 * @namespace Events
 */
'use strict'
var doc = require('../document')
var Event = require('vigour-js/lib/event')
var Emitter = require('./emitter')

document.body.addEventListener('touchstart', function (e) {
  e.preventDefault()
}, false)

exports.on = {
  ChildConstructor: new Emitter({
    define: {
      /**
       * Use noInstances:true to not update the object instances when the object change.
       * @type {bool}
       * @memberOf Events
       */
      key: {
        set (val) {
          var domEventCache = this.domEventCache
          if (!domEventCache[val]) {
            global.addEventListener(val, function (e) {
              let node = e.target
              let parentNode = node
              let docOn = doc._on // allways add saves a getter
              let event
              if (e.x === void 0) {
                let touch = e.changedTouches
                let ev = touch ? touch[0] : e
                e.x = ev.clientX
                e.y = ev.clientY
              }
              while (parentNode) {
                if (parentNode._onPath) {
                  // *** NEED PERF ****
                  let path = parentNode._onPath
                  let rendered = global.engine.get(path)
                  let base = rendered
                  if (base) {
                    if (base._on && base._on[val]) {
                      event = new Event(val) // make dom event type
                      event.data = e
                      base.emit(val, void 0, event)
                      event.trigger()
                    }
                  }
                  global.engine.cleanContextPath(path)
                  if (event && event.prevent) {
                    return
                  }
                }
                parentNode = parentNode.parentNode
              }
              if (docOn && docOn[val]) {
                event = new Event(val)
                event.data = e
                doc.emit(val, event, event)
                event.trigger()
              }
            }, true)
            domEventCache[val] = true
          }
          this._key = val
        },
        get (val) {
          return this._key
        }
      },
      domEventCache: {
        value: {}
      }
    }
  }).Constructor
}
