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
    data: {
      switcher (data, event) {
        if (data) {
          let val = this.val
          if (typeof val === 'number') {
            val += ''
          }

          if (typeof val === 'string') {
            if (val === this.swcurrent) {
              console.warn('switcher: this is wrong, why do I get here, from:', this.swcurrent, 'to:', val)
              return
            }

            let keys = val.split('.')
            let params = this.map.get(keys)
            let Constructor = params ? params._input : this.ChildConstructor
            let swcontent = this.swcontent
            let element = new Constructor()
            let setparams = this.params
            
            if (setparams) {
              element.set(setparams)
              this.params = false
            }

            if (swcontent) {
              let transition = this.config.transition
              if (transition === 'x' || transition === 'y') {
                this.slide(transition, val, element, swcontent, params || this, event)
              } else if (transition === 'fade') {
                this.fade(val, element, swcontent, params || this, event)
              } else {
                swcontent.remove(event)
              }
            }
            // dash is nice for css, but maybe camelcase?
            let name = keys.join('-')
            this.setKey(name, element, event)
            this.setKey('swcontent', element, event)
            this.setKey('swcurrent', val, event)
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
        animation: true,
        transition: true
      }
    }),
    swcontent: true,
    swcurrent: true,
    swprevious: true,
    params: true,
    previous: Observable
  },
  previous: false,
  swcontent: false,
  swcurrent: false,
  swprevious: false,
  map: {},
  config: {
    transition: 'x',
    factor: 3,
    animation: {
      duration: 24
    }
  },
  define: {
    back () {
      this.val = this.previous.val
    },
    fade (val, element, swcontent, params, event) {
      if (swcontent) {
        console.warn('fade is not implemented yet')
        // element.setKey('insertBefore', swcontent.key)
        // swcontent.node.style.opacity = 0
        // setTimeout(() => {
        //   this.swcontent.remove()
        //   this._timeout = null
        // }, 150)
        // if (this._inprogress) {
        //   this._inprogress.old.remove()
        //   clearTimeout(this._inprogress.timeout)
        //   this._inprogress = null
        // }

        // this._inprogress = {
        //   old: swcontent,
        //   timeout: setTimeout(() => {
        //     this.swcontent.remove()
        //     this._timeout = null
        //   }, 150)
        // }

      }
    },
    slide (direction, val, element, swcontent, params, event) {
      let width = direction === 'x' ? this.node.offsetWidth : this.node.offsetHeight
      let swcurrent = this.swcurrent
      let swcontentX = swcontent[direction] || swcontent.setKey(direction, 0) && swcontent[direction]
      let animation = swcontentX.$animation
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
        [direction]: {
          val: start,
          $animation: config.animation
        },
        on: {
          transitionEnd (e) {
            swcontent.remove()
          }
        }
      }, event)

      swcontent[direction].set({
        val: element[direction],
        $transform: transform
      })

      element.setKey(direction, 0)
    }
  }
}).Constructor
