/**
 * An **event** is an Emitter, the idea of this Object is give to the Elements class
 * the possibility to listen for elements events, like: click, drag, scroll etc.
 * @namespace Events
 */
'use strict'

var Emitter = require('vjs/lib/emitter')
var Event = require('vjs/lib/event')

exports.on = {
  define: {
    ChildConstructor: new Emitter({
      emitemitInstances: false,
      define: {
        /**
         * Use noInstances:true to not update the object instances when the object change.
         * @type {bool}
         * @memberOf Events
         */
        key: {
          set: function (val) {
            var domEventCache = this.domEventCache
            var attach
            if (!domEventCache[val]) {
              attach = val === 'scroll' ? window : document.body
              attach.addEventListener(val, function (e) {
                var node = e.target
                if (!node.className) {
                  node = document.body
                }
                var target = node.base || findTarget(node)
                var firstTarget
                var event

                while (target) {
                  if (target._on[val]) {
                    if (!firstTarget) {
                      firstTarget = target
                      event = new Event(target, val)
                    } else {
                      target.emit(val, e, event)
                    }
                  }
                  target = target.parent
                }
                if (firstTarget) {
                  if (e.x === void 0) {
                    var touch = e.changedTouches
                    var ev = touch ? touch[0] : e
                    e.x = ev.clientX
                    e.y = ev.clientY
                  }

                  firstTarget.emit(val, e, event)
                }
              },
                val === 'scroll' || val === 'focus' || val === 'blur' || void 0)
              domEventCache[val] = true
            }
            this._key = val
          },
          get: function (val) {
            return this._key
          }
        },
        domEventCache: {
          value: {}
        }
      }
    }).Constructor
  }
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
