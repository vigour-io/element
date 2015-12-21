'use strict'
var Base = require('vigour-js/lib/base')
var Element = require('../element')

module.exports = new Element({
  css: 'element-switcher',
  on: {
    data: {
      switcher (data, event) {
        if (data) {
          let val = this.val
          if (typeof val === 'string') {
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
                  },
                  on: {
                    transitionEnd () {
                      // content.remove()
                    }
                  }
                }, event)

                content.x.set({
                  val: element.x,
                  $transform: transform
                })
              }

              this.setKey(keys.join('-'), element, event)
              this.setKey('content', element, event)
              this.setKey('current', val, event)

              element.setKey('x', 0, event)
            }
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
  content: false,
  current: false,
  map: {},
  config: {
    factor: 3,
    animation: {
      duration: 24
    }
  }
}).Constructor
