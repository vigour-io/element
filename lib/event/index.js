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
              let base = node.base || findTarget(node)
              // has to set the context unfortunately else does not work fix it later
              let firstTarget
              let event
              var xnode = node
              var fNode = node
              // var travelNode = fNode
              while (base) {
                let on = base._on
                if (on && on[val]) {
                  if (!firstTarget) {
                    fNode = xnode
                    firstTarget = base // set context here as well
                    // fNode //= base.getNode() //WRONG!
                    console.log('here?', fNode)
                    event = new Event(val)
                  } else {
                    // set context here as well
                    // base.emit(val, e, event)
                  }
                }
                base = base.parent
                xnode = xnode.parentNode
              }
              if (firstTarget) {
                if (e.x === void 0) {
                  let touch = e.changedTouches
                  let ev = touch ? touch[0] : e
                  e.x = ev.clientX
                  e.y = ev.clientY
                }
                if (!firstTarget.getNode()) {
                  console.log('ok lezzzzzgo first target wrong node!', firstTarget.path)
                  // nodes[firstTarget]
                  // find in nodes?
                  if (firstTarget._parent._instances) {
                    for (var i in firstTarget._parent._instances) {
                      // firstTarget._parent._instances[i].clearContextUp()
                      let ft = firstTarget._parent._instances[i]
                      console.log(ft.uid, nodes[ft.uid], fNode)
                      if (
                        globals.cnodes[ft.uid] &&
                        globals.cnodes[ft.uid][firstTarget.uid] &&
                        globals.cnodes[ft.uid][firstTarget.uid] === fNode
                      ) {
                        console.log('yo yo yo ', fNode)
                        console.log('yo g got here!',  globals.cnodes[ft.uid][firstTarget.uid] )
                        firstTarget._context = ft
                        break;
                      }
                    }
                  }
                }
                console.log('ok bitchy bitch!')
                firstTarget.emit(val, e, event)
                event.trigger()
              }
            }, true)
            // val === 'scroll' || val === 'focus' || val === 'blur' || void 0)
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

function findTarget (node) {
  console.log('go go go')
  // if (!node.getAttribute) {
  // return docs
  // }
  var target
  var path = []
  var i = -1
  while (!target) {
    if (node.base) {
      i++
      path.push(node.base.key)
    }
    node = node.parentNode
    target = node.base
  }
  console.log('genig!', path)
  for (; i >= 0; i--) {
    target = target[path[i]]
  }
  return target
}
