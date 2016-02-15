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
    inject: require('../event/grab'),
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
            if (children[i].state.data.origin.hash == val) {
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
            if (!child.state.props) {
              child.state.props = {}
            }
            child.state.props.properties = { style: style }
            child.state.stamp = current.state.stamp
          }

          ordered[1].state.props.properties.className = 'previous'
          ordered[2].state.props.properties.className = 'focused'
          ordered[3].state.props.properties.className = 'next'

          current.state.carouselIndex = i

          let delta
          if (previous && previous.state) {
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

          properties.style[TRANSFORM] = 'translate3d(' + -(delta + 1) + '00%, 0, 0)'
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
  var hash = prevKey(data, data.focus.val)
  data.focus.set(hash)
}

function next (data) {
  var hash = nextKey(data, data.focus.val)
  data.focus.set(hash)
}

function prevKey (data, h) {
  var keys = data.keys()
  var prev

  for (var i = 0, length = keys.length; i < length; i++) {
    var key = keys[i]
    if (key !== 'focus' && key !== 'length') {
      var hash = data[key].origin.hash
      if (prev && hash === h) {
        return prev
      }
      prev = hash
    }
  }

  return prev
}

function nextKey (data, h) {
  var keys = data.keys()
  var first
  var next

  for (var i = 0, length = keys.length; i < length; i++) {
    var key = keys[i]
    if (key !== 'focus' && key !== 'length') {
      var hash = data[key].origin.hash
      if (!first) {
        first = hash
      }
      if (next) {
        return hash
      }
      if (hash === h) {
        next = true
      }
    }
  }

  return first
}
