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
        render (val, properties, children, rdata, current) {
          console.info('yes!', current.state.stamp)
          // let lastindex = children.length - 1
          // let i = 0
          // let ordered
          // for (; i <= lastindex; i++) {
          //   if (children[i].state.data.key === val) {
          //     break
          //   }
          // }
          // if (i === 1) {
          //   ordered = children
          // } else {
          //   if (!i) {
          //     ordered = [children[lastindex]]
          //     for (let j = 0; j < lastindex; j++) {
          //       ordered.push(children[j])
          //     }
          //   } else {
          //     let previous = i - 1
          //     ordered = children.slice(previous)
          //     for (let j = 0; j < previous; j++) {
          //       ordered.push(children[j])
          //     }
          //   }
          // }

          // for (let k = 0; k <= lastindex; k++) {
          //   let child = ordered[k]
          //   let style = {}
          //   style[ORDER] = k
          //   child.properties = { style: style }
          //   // child.state.stamp = current.state.stamp
          // }

          // ordered[0].properties.className = 'previous'
          // ordered[1].properties.className = 'focused'
          // ordered[2].properties.className = 'next'
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
