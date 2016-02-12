'use strict'
var Property = require('../property')
var ua = require('../ua')
var PREFIX = ua.prefix
var ORDER = PREFIX + 'Order'
var TRANSFORM = PREFIX + 'Transform'

module.exports = {
  define: {
    previous () {
      previous(this.items.state.data)
    },
    next () {
      next(this.items.state.data)
    }
  },
  items: {
    inject: require('vigour-element/lib/event/grab'),
    on: {
      grab () {},
      grabend: {
        carousel (e, event) {
          var data = this.state.data
          if (e.speed < -15) {
            next(data)
          } else if (e.speed > 15) {
            previous(data)
          } else if (e.delta < -200) {
            next(data)
          } else if (e.delta > 200) {
            previous(data)
          } else {
            e.restore()
          }
        }
      }
    },
    properties: {
      focusItem: new Property({
        render (val, properties, children, rdata, current, previous) {
          let lastindex = children.length - 1
          let i = 0
          let ordered

          for (; i <= lastindex; i++) {
            if (children[i].state.data.key === val) {
              break
            }
          }

          if (i === 1) {
            ordered = children
          } else {
            if (!i) {
              ordered = [children[lastindex]]
              for (let j = 0; j < lastindex; j++) {
                ordered.push(children[j])
              }
            } else {
              let previous = i - 1
              ordered = children.slice(previous)
              for (let j = 0; j < previous; j++) {
                ordered.push(children[j])
              }
            }
          }

          for (let k = 0; k <= lastindex; k++) {
            let child = ordered[k]
            let style = {}
            style[ORDER] = k
            child.properties = { style: style }
            child.state.stamp = current.state.stamp
          }

          ordered[0].properties.className = 'previous'
          ordered[1].properties.className = 'focused'
          ordered[2].properties.className = 'next'

          current.state.carouselIndex = i

          let delta
          if (previous) {
            let previousIndex = previous.state.carouselIndex
            let previousDelta = previous.state.carouselDelta
            if (i === 0 && previousIndex === lastindex) {
              delta = previousDelta + 1
            } else if (i === lastindex && previousIndex === 0) {
              delta = previousDelta - 1
            } else {
              delta = previousDelta + i - previousIndex
            }
          } else {
            delta = 0
          }

          let carouselw = this.parent.parent.w
          if (carouselw) {
            properties.style[TRANSFORM] = 'translate3d(' + -(delta + 1) * carouselw.val + 'px, ' + 0 + 'px, 0px)'
          } else {
            properties.style.left = -(delta + 1) + '00%'
          }
          properties.style.marginLeft = delta + '00%'
          current.state.carouselDelta = delta
        }
      })
    },
    transition: {
      property: 'transform'
    },
    flex: {
      direction: 'row'
    },
    focusItem: {
      $: 'focus'
    }
  }
}

function previous (data) {
  data.focus.set(prevKey(data, data.focus.val))
}

function next (data) {
  data.focus.set(nextKey(data, data.focus.val))
}

function prevKey (data, key) {
  var prev
  return data.each(function (prop, i) {
    if (i === key) {
      return prev
    }
    if (i !== 'focus') {
      prev = i
    }
  }) || prev
}

function nextKey (data, key) {
  var next
  return data.each(function (prop, i) {
    if (next) {
      return i
    }
    if (i === key) {
      next = true
    }
  }) || data.each(function (prop, i) {
    if (i !== 'focus') {
      return i
    }
  })
}
