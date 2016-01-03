/**
 * An **event** is an Emitter, the idea of this Object is give to the Elements class
 * the possibility to listen for elements events, like: click, drag, scroll etc.
 * @namespace Events
 */
'use strict'
var doc = require('../document')
var Event = require('vigour-js/lib/event')
var Emitter = require('./emitter')
function DocEvent () {
  return Event.apply(this, arguments)
}
DocEvent.prototype = new Event()
DocEvent.prototype.properties.engine = true

document.body.addEventListener('touchstart', function (e) {
  e.preventDefault()
}, false)

exports.on = {
  properties: {
    _dom: true
  },
  ChildConstructor: new Emitter({
    define: {
      /**
       * Use noInstances:true to not update the object instances when the object change.
       * @type {bool}
       * @memberOf Events
       */
      key: {
        set (val) {
          // multiple engines -- its the only solution
          // this._parent.engine? not enough
          this._parent._dom = true
          var domEventCache = this.domEventCache
          if (!domEventCache[val]) {
            global.addEventListener(val, function (e) {
              let node = e.target
              let parentNode = node
              let docOn = doc._on // allways add saves a getter
              let event
              let engine
              if (e.x === void 0) {
                let touch = e.changedTouches
                let ev = touch ? touch[0] : e
                e.x = ev.clientX
                e.y = ev.clientY
              }
              while (parentNode) {
                if (!engine && parentNode._engine) {
                  engine = parentNode._engine
                }
                if (parentNode._onPath) {
                  // *** NEED PERF ****
                  let path = parentNode._onPath // can be more fficient
                  let rendered = engine.get(path)
                  console.log(engine, path, rendered, engine)
                  let base = rendered
                  if (base) {
                    console.log('evexxxxnt:', val)

                    if (base._on && base._on[val]) {
                      // console.log('event:', val)
                      event = new Event(val) // make dom event type
                      event.data = e
                      event.engine = engine
                      base.emit(val, void 0, event)
                      event.trigger()
                    }
                  }
                  engine.cleanContextPath(path)
                  if (event && event.prevent) {
                    return
                  }
                }
                parentNode = parentNode.parentNode
              }
              if (docOn && docOn[val]) {
                event = new DocEvent(val)
                event.engine = engine
                event.data = e
                doc.emit(val, e, event)
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
