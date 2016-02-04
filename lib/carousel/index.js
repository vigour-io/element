'use strict'
var Element = require('../')
var Property = require('../property')
var StyleProp = require('../property/style')
var ua = require('../ua')
var PREFIX = ua.prefix
var ORDER = PREFIX + 'Order'

module.exports = new Element({
  items: {
    properties: {
      focusItem: new Property({
        render (val, properties, children) {
          let length = children.length
          let i = 0
          for (; i < length; i++) {
            let child = children[i]
            if (child.state.data.key === val) {
              child.properties = {
                className: 'focused'
              }
              break
            }
          }
          let ordered = i
            ? children.slice(i).concat(children.slice(0, i))
            : children
          console.log('?????>>>', ordered)
        }
      }),
      animateLeft: new StyleProp({
        render (val, properties, children) {
          var left = -(val + 1) + '00%'
          properties.style.left = left
        }
      }),
      marginLeft: new StyleProp({
        render (val, properties, children) {
          var margin = val + '00%'
          properties.style.marginLeft = margin
        }
      })
    },
    transition: {
      property: 'left'
    },
    flex: {
      direction: 'row'
    },
    focusItem: {
      $: 'focus'
    },
    animateLeft: 0,
    marginLeft: 0,
    // on: {
    //   property: {
    //     carousel () {
    //       var cnt = 1
    //       var last
    //       this.each(function (elem) {
    //         elem.setKey('flex', {
    //           order: cnt++
    //         })
    //         last = elem
    //       }, isElement)
    //       last.flex.setKey('order', 0)
    //     }
    //   }
    // }
  }
}).Constructor

function isElement (prop) {
  return prop instanceof Element
}
