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
              let docOn = doc._on // allways add saves a getter
              let event
              if (e.x === void 0) {
                let touch = e.changedTouches
                let ev = touch ? touch[0] : e
                e.x = ev.clientX
                e.y = ev.clientY
              }
              while (parentNode) {
                if (parentNode.dirty) {
                  // *** NEED PERF ****
                  let path = parentNode.dirty.split('.')
                  let rendered = globals.app.getRendered(path)
                  let base = rendered[0]
                  if (base) {
                    if (base._on && base._on[val]) {
                      console.log('LEZZZGO!', base.path, val)
                      event = new Event(val) // make dom event type
                      event.data = e
                      base.emit(val, void 0, event)
                      event.trigger()
                      console.log('nothing more nothing less!')
                    }
                  }
                  // make this shared of course
                  for (let i = 0, length = path.length, walk = globals.app; i < length; i++) {
                    let lwalk = walk
                    walk = walk['_' + path[i]] || walk[path[i]]
                    lwalk.clearContext()
                  }

                  if (event && event.prevent) {
                    console.warn('!!! prevent !!!')
                    return
                  }
                }
                parentNode = parentNode.parentNode
              }
              if (docOn && docOn[val]) {
                console.log('wtf is happenin....')
                event = new Event(val)
                event.data = e
                doc.emit(val, event, event)
                event.trigger()
              }
              global.debug.context(global.app).log('event done!')
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
