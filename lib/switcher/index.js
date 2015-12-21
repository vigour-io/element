'use strict'
require('./style.less')

var Base = require('vigour-js/lib/base')
var Element = require('../element')

module.exports = new Element({
  css: 'element-switcher',
  on: {
    value: {
      switcher (data, event) {
        if (data) {
          let val = this.val
          if (typeof val === 'string') {
            let keys = val.split('.')
            let params = this.map.get(keys)
            if (params) {
              let Constructor = params._input
              let swcontent = this.swcontent
              let element = new Constructor()
              if (swcontent) {
                let width = this.node.offsetWidth
                let swcurrent = this.swcurrent
                let animation = swcontent.x.$animation
                let config = this.config
                let factor = config.factor
                let insertBefore
                let transform
                let start

                animation && animation.remove()

                if (swcurrent && swcurrent.indexOf(val) === 0) {
                  insertBefore = swcontent.key
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
                      swcontent.remove()
                    }
                  }
                }, event)

                swcontent.x.set({
                  val: element.x,
                  $transform: transform
                })
              }

              this.setKey(keys.join('-'), element, event)
              this.setKey('swcontent', element, event)
              this.setKey('swcurrent', val, event)

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
    swcontent: true,
    swcurrent: true
  },
  swcontent: false,
  swcurrent: false,
  swprevious: false,
  map: {},
  config: {
    factor: 3,
    animation: {
      duration: 24
    }
  }
}).Constructor
