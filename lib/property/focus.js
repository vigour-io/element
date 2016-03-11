'use strict'
var app
var Element
var keyevents = require('../event/key')

function emit (type, event) {
  var eligable = findit(type, app, [])
  for (var i = eligable.length - 1; i >= 0; i--) {
    // fire function for deepest target, if return truthy try next
    if (!eligable[i].focused[type](eligable, event)) {
      return
    }
  }
}

function findit (type, obj, arr) {
  obj.each(function (prop, key) {
    if (prop.focused) {
      if (prop.focused.val === true) {
        if (prop.focused[type]) {
          arr.push(prop)
        }
        findit(type, prop, arr)
      }
    }
  }, function (prop) {
    return prop instanceof Element
  })
  return arr
}

// horrible temp fix
setTimeout(function () {
  Element = require('../element')
  app = require('../app')

  var create = function (i) {
    return function (d, event) {
      emit(i, event)
    }
  }
  var events = {}
  for (var i in keyevents.on.properties) {
    events[i] = create(i)
  }

  app.set({
    keyevents: {
      type: 'group',
      inject: keyevents,
      on: events
    }
  })
})

var Prop = require('./')

exports.define = {
  findLeft () {
    var left = this.getNode().offsetLeft
    var closestLeft
    var closest
    this.parent.each((prop, key) => {
      if (prop !== this && prop.focused) {
        var node = prop.getNode()
        if (node.offsetParent !== null) {
          var propLeft = node.offsetLeft
          if (propLeft < left) {
            if (closestLeft === void 0 || closestLeft < propLeft) {
              closestLeft = propLeft
              closest = prop
            }
          }
        }
      }
    }, function (prop) {
      return prop instanceof Element
    })
    return closest
  },

  findRight (currentElement) {
    var left = this.getNode().offsetLeft
    var closestLeft
    var closest
    if (currentElement && !currentElement.node.nextSibling) {
      return this.parent.firstChild()
    }
    this.parent.each((prop, key) => {
      if (prop !== this && prop.focused) {
        var node = prop.getNode()
        if (node.offsetParent !== null) {
          var propLeft = node.offsetLeft
          if (propLeft > left) {
            if (closestLeft === void 0 || closestLeft > propLeft) {
              closestLeft = propLeft
              closest = prop
            }
          }
        }
      }
    }, function (prop) {
      return prop instanceof Element
    })
    return closest
  },

  focusLeft (event) {
    var closest = this.findLeft()
    if (closest) {
      this.focused.set(false, event)
      closest.focused.set(true, event)
    } else {
      return true
    }
  },

  focusRight (event) {
    var closest = this.findRight()
    if (closest) {
      this.focused.set(false, event)
      closest.focused.set(true, event)
    } else {
      return true
    }
  },

  focusUp (event) {
    var top = this.getNode().offsetTop
    var closestTop
    var closest
    this.parent.each((prop, key) => {
      if (prop !== this && prop.focused) {
        var node = prop.getNode()
        if (node.offsetParent !== null) {
          var propTop = node.offsetTop
          if (propTop < top) {
            if (closestTop === void 0 || closestTop < propTop) {
              closestTop = propTop
              closest = prop
            }
          }
        }
      }
    }, function (prop) {
      return prop instanceof Element
    })
    if (closest) {
      this.focused.set(false, event)
      closest.focused.set(true, event)
    } else {
      return true
    }
  },

  focusDown (event) {
    var top = this.getNode().offsetTop
    var closestTop
    var closest
    this.parent.each((prop, key) => {
      if (prop !== this && prop.focused) {
        var node = prop.getNode()
        if (node.offsetParent !== null) {
          var propTop = node.offsetTop
          if (propTop > top) {
            if (closestTop === void 0 || closestTop > propTop) {
              closestTop = propTop
              closest = prop
            }
          }
        }
      }
    }, function (prop) {
      return prop instanceof Element
    })
    if (closest) {
      this.focused.set(false, event)
      closest.focused.set(true, event)
    } else {
      return true
    }
  }
}

var focused = new Prop({
  val: false,
  render (node, event, element) {
    if (this.val === true) {
      element.setKey('css', {add: 'focused'})
    } else {
      element.setKey('css', {remove: 'focused'})
    }
  },
  define: {
    arrowup (d, event) {
      var elem = this.parent
      return elem.focusUp()
    },
    arrowdown (d, event) {
      var elem = this.parent
      return elem.focusDown(event)
    },
    arrowleft (d, event) {
      var elem = this.parent
      return elem.focusLeft(event)
    },
    arrowright (d, event) {
      var elem = this.parent
      return elem.focusRight(event)
    }
  }
})

var create = function (i) {
  return function (val) {
    var define = {}
    define[i] = val
    this.define(define)
  }
}

var events = {}
for (var i in keyevents.on.properties) {
  events[i] = create(i)
}

focused.set({
  properties: events
})

exports.properties = {

  focused: focused,

  focus: new Prop({
    properties: {
      prevKey: true
    },
    prevKey: false,
    render (node, event, parent) {
      var val = this.parseValue()
      var type = typeof val
      var prevKey = this.prevKey
      var key

      if (type === 'string' || type === 'number') {
        key = val
      } else {
        key = val.key
      }
      if (key !== prevKey) {
        if (parent[key]) {
          parent[key].setKey('focused', true, event)
          if (parent[prevKey]) {
            parent[prevKey].setKey('focused', false, event)
          }
          this.prevKey = key
        }
      }
    }
  })
}
