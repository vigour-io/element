/**
 * An **event** is an Emitter, the idea of this Object is give to the Elements class
 * the possibility to listen for elements events, like: click, drag, scroll etc.
 * @namespace Events
 */
'use strict'
var doc = require('../document')
var Event = require('vigour-js/lib/event')
var Emitter = require('./emitter')

var globals = global.x = require('../engine/dom/globals')

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
              let docOn = doc._on
              let bases
              let event
              while (parentNode) {
                if (parentNode.dirty) {
                  let base = globals.app.get(parentNode.dirty)
                  if (base && base._on && base._on[val]) {
                    if (!event) {
                      event = new Event(val)
                    }
                    bases = base
                    base.emit(val, event, event)
                    break
                  }

                  let x = base
                  // TODO clean up these guards for x
                  while (x && x._context) {
                    x._context = null
                    x = x.parent
                  }
                  x && x.clearContextUp()
                }
                parentNode = parentNode.parentNode
              }
              if (docOn && docOn[val]) {
                if (!event) {
                  event = new Event(val)
                }
                doc.emit(val, event, event)
              }
              if (event) {
                if (e.x === void 0) {
                  let touch = e.changedTouches
                  let ev = touch ? touch[0] : e
                  e.x = ev.clientX
                  e.y = ev.clientY
                }
                event.data = e
                event.trigger()
                bases && bases.clearContextUp()
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
