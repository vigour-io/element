/**
 * An **event** is an Emitter, the idea of this Object is give to the Elements class
 * the possibility to listen for elements events, like: click, drag, scroll etc.
 * @namespace Events
 */
'use strict'
var docs = require('../document')
var Event = require('vigour-js/lib/event')
var Emitter = require('./emitter')

var globals = require('../engine/dom/globals')

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
              let event
              while (parentNode) {
                if (parentNode.base && parentNode.base._on && parentNode.base._on[val]) {
                  if (!event) {
                    event = new Event(val)
                  }
                  if (parentNode.base.getNode() !== parentNode) {
                    parentNode.base._context = parentNode.parentNode.base
                  }
                  parentNode.base.emit(val, event, event)
                }
                parentNode = parentNode.parentNode
              }
              if (event) {
                // if (e.x === void 0) {
                //   let touch = e.changedTouches
                //   let ev = touch ? touch[0] : e
                //   e.x = ev.clientX
                //   e.y = ev.clientY
                // }
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
