/**
 * An **event** is an Emitter, the idea of this Object is give to the Elements class
 * the possibility to listen for elements events, like: click, drag, scroll etc.
 * @namespace Events
 */
'use strict'

var Event = require('vigour-js/lib/event')
var Emitter = require('./emitter')

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
            if (val === 'transform') {
              console.warn('something fishy going on, why is this transform ending up in dom event?')
            }
            // let attach = val === 'scroll' ? window : document
            // attach.addEventListener(val, function (e) {
            window.addEventListener(val, function (e) {
              var node = e.target
              var base = node.base || findTarget(node)
              var firstTarget
              var event
              while (base) {
                let on = base._on
                if (on && on[val]) {
                  if (!firstTarget) {
                    firstTarget = base
                    event = new Event(base, val)
                  } else {
                    base.emit(val, e, event)
                  }
                }
                base = base.parent
              }
              if (firstTarget) {
                if (e.x === void 0) {
                  let touch = e.changedTouches
                  let ev = touch ? touch[0] : e
                  e.x = ev.clientX
                  e.y = ev.clientY
                }
                firstTarget.emit(val, e, event)
              }
            },
            true)
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
/**
 * @function findTarget The function tries to discover the closest instance of base on the Dom tree starting
 * from the own element
 * @memberOf Events
 * @param  {object} node The dom node for the element
 * @return {Object} target The target for the object on the Dom tree
 *
 * @example
 *
 * var a = new Element({
 * css : "funLife",
 * elementA:{
 *   elementB:{
 *     text:{
 *       val:"I'm elementB"
 *     },
 *     on:{
 *        click:function (argument) {
 *          console.log("heyyy")
 *        }
 *     }
 *   }
 * }
 * })
 *
 * When elementB is clicked, the findTargetFunction will try to discover the correct target. This way
 * the event will be emited to the correct element.
 *
 */
function findTarget (node) {
  if(node === window){
    return document.documentElement.base
  }
  var target
  var path = []
  var i = -1
  while (!target) {
    i++
    path.push(node.getAttribute('data-key') || node.className)
    node = node.parentNode
    target = node.base
  }
  for (; i >= 0; i--) {
    target = target[path[i]]
  }
  return target
}
