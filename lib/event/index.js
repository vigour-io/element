/**
 * An **event** is an Emitter, the idea of this Object is give to the Elements class
 * the possibility to listen for elements events, like: click, drag, scroll etc.
 * @namespace Events
 */
'use strict'
var doc = require('../document')
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
                    firstTarget = base
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
                firstTarget = resolveContext(firstTarget, fNode) || firstTarget
                if (firstTarget.getNode() === fNode) {
                  firstTarget.emit(val, e, event)
                }
                event.data = e
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

function resolveContext (firstTarget, fNode) {
  if (firstTarget.getNode() !== fNode) {
    console.log('go go go')
    let pNode = fNode.parentNode
    let parent = pNode.base
    if (parent) {
      console.log(2)
      // need to find correct target
      firstTarget._context = fNode.parentNode.base
      if (firstTarget.getNode() !== fNode && firstTarget._instances) {
        for (var i in firstTarget._instances) {
          firstTarget._instances[i]._context = firstTarget._context
          if (firstTarget._instances[i].getNode() === fNode) {
            console.log('!')
            return firstTarget._instances[i]
          }
        }
      }
      // upwardresolver(firstTarget, fNode, parent, pNode)
      // resolveContext(fNode.parentNode.base, fNode.parentNode)
    }
  }
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
