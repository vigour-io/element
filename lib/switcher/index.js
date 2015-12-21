'use strict'
require('./style.less')

var Observable = require('vigour-js/lib/observable')
var Base = require('vigour-js/lib/base')
var Element = require('../element')

var MapChild = new Base({
  define: {
    swprevious: {
      set (val) {
        this._swprevious = val
      },
      get () {
        var previous = this._swprevious
        if (previous) {
          this._swprevious = false
          return previous
        } else {
          let parent = this.parent
          let string = false
          while (parent instanceof MapChild) {
            string = parent.key + (string ? '.' + string : '')
            parent = parent.parent
          }
          return string
        }
      }
    }
  },
  ChildConstructor: 'Constructor'
}).Constructor

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
                let previous = this.previous.val
                let config = this.config
                let factor = config.factor
                let insertBefore
                let transform
                let start

                animation && animation.remove()

                // moving back
                if (val === previous || swcurrent && swcurrent.indexOf(val) === 0) {
                  insertBefore = swcontent.key
                  start = -width / factor
                  transform = function (val) {
                    return -((start - val) * factor)
                  }
                  params.swprevious = false
                // moving forward
                } else {
                  start = width
                  transform = function (val) {
                    return -((start - val) / factor)
                  }
                  params.swprevious = previous !== val
                    ? swcurrent
                    : false
                }

                this.previous.val = params.swprevious

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
    map: new Base({
      ChildConstructor: MapChild
    }),
    config: new Base({
      properties: {
        factor: true,
        animation: true
      }
    }),
    swcontent: true,
    swcurrent: true,
    previous: Observable
  },
  previous: false,
  swcontent: false,
  swcurrent: false,
  map: {},
  config: {
    factor: 3,
    animation: {
      duration: 24
    }
  },
  define: {
    back () {
      this.val = this.previous.val
    }
  }
}).Constructor
