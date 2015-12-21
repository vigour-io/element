'use strict'
var Base = require('vigour-js/lib/base')
var Element = require('../element')

module.exports = new Element({
  on: {
    data: {
      switcher (data, event) {
        if (data) {
          let val = this.val
          let keys = val.split('.')
          let params = this.map.get(keys)
          if (params) {
            let Constructor = params._input
            let content = this.content
            let element = new Constructor()
            if (content) {
              let width = this.node.offsetWidth
              let current = this.current
              let animation = content.x.$animation
              let config = this.config
              let factor = config.factor
              let insertBefore
              let transform
              let start
              animation && animation.remove()
              if (current && current.indexOf(val) === 0) {
                insertBefore = content.key
                start = -width / factor
                transform = function (val) {
                  return -((start - val) * factor)
                }
              } else {
                start = width
                transform = function (val) {
                  return -((start - val) / factor)
                }
              }
              element.set({
                insertBefore: insertBefore,
                x: {
                  val: start,
                  $animation: config.animation
                }
              })
              content.x.set({
                val: element.x,
                $transform: transform
              })
              element.on('transitionEnd', function () {
                content.remove()
              })
            }
            element.setKey('x', 0, event)
            this.setKey(keys.join('-'), element, event)
            this.setKey('content', element, event)
            this.setKey('current', val, event)
          }
        }
      }
    }
  },
  properties: {
    map: Base,
    config: new Base({
      properties: {
        factor: true,
        animation: true
      }
    }),
    content: true,
    current: true
  },
  config: {
    factor: 3,
    animation: {
      duration: 24
    }
  }
}).Constructor
