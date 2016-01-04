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
          // console.log('MAKE LISTEN', val)
          // multiple engines -- its the only solution
          // this._parent.engine? not enough
          this._parent._dom = true
          var domEventCache = this.domEventCache
          if (!domEventCache[val]) {
            global.addEventListener(val, function (e) {
              // console.clear()
              // console.log('FIRE LIS', val)
              let node = e.target
              let parentNode = node
              let docOn = doc._on // allways add saves a getter
              let event
              let engine
              // console.log('-------- global ---------')
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
                // console.log('?????', parentNode)
                if (parentNode._onPath) {
                  console.log('xxxx - ballz FIRE LIS', val)
                  // *** NEED PERF ****
                  let path = parentNode._onPath // can be more fficient
                  let rendered = engine.get(path)
                  // console.log(engine, path, rendered, engine)
                  let base = rendered
                  if (base) {
                    console.log('found!')
                    // console.log('yooooo', val, base)
                    if (base._on && base._on[val]) {
                      event = new Event(val) // make dom event type
                      event.data = e
                      event.engine = engine
                      // base._lc = null
                      // console.log('exec!', base._on[val])
                      // can reuse event no prob
                      // console.log(base.path)
                      if (base._input !== null) {
                        base._on[val].execInternal(base, event, e)
                      }
                      // base.emit(val, void 0, event)
                      event.trigger()
                    }
                  }
                  // console.log('clean!')
                  engine.cleanContextPath(path)
                  if (event && event.prevent) {
                    return
                  }
                }
                parentNode = parentNode.parentNode
              }
              if (docOn && docOn[val]) {
                event = new DocEvent(val) // reuse events here
                event.engine = engine
                event.data = e
                // console.log(val, 'DOC: engine',engine)
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
