'use strict'
var app
var Element

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
  app.set({
    events: {
      type: 'group',
      inject: require('vigour-element/lib/event/key'),
      on: {
        arrowleft (d, event) {
          console.log('JAAA')
          emit('arrowleft', event)
        },
        arrowright (d, event) {
          emit('arrowright', event)
        },
        arrowup (d, event) {
          emit('arrowup', event)
        },
        arrowdown (d, event) {
          emit('arrowdown', event)
        }
      }
    }
  })
})

var Prop = require('./')

exports.define = {
  // focusItem (unfocus, event) {
  //   if (unfocus) {
  //     this.unfocusItem(unfocus, event)
  //   }
  //   // quick fix
  //   if (!app) {
  //     app = require('../app')
  //   }

  //   if (!app.focused) {
  //     app.setKey('focused', {}, event)
  //   }

  //   app.focused._input = this
  //   app.focused.emit('data', this, event)

  //   this.setKey('css', {add: 'focus'})
  //   this.emit('focus', unfocus, event)
  // },
  // unfocusItem (unfocus, event) {
  //   if (!unfocus) {
  //     unfocus = this
  //   }
  //   if (unfocus.constructor === Array) {
  //     for (var i = unfocus.length - 1; i >= 0; i--) {
  //       unfocus[i].setKey('css', {remove: 'focus'})
  //       unfocus[i].emit('blur', void 0, event)
  //     }
  //   } else {
  //     unfocus.setKey('css', {remove: 'focus'})
  //     unfocus.emit('blur', void 0, event)
  //   }
  // },

  findLeft () {
    var left = this.getNode().offsetLeft
    var closestLeft
    var closest
    this.parent.each((prop, key) => {
      if (prop !== this && prop.focused) {
        var propLeft = prop.getNode().offsetLeft
        if (propLeft < left) {
          if (closestLeft === void 0 || closestLeft < propLeft) {
            closestLeft = propLeft
            closest = prop
          }
        }
      }
    }, function (prop) {
      return prop instanceof Element
    })
    return closest
  },

  findRight () {
    var left = this.getNode().offsetLeft
    var closestLeft
    var closest
    this.parent.each((prop, key) => {
      if (prop !== this && prop.focused) {
        var propLeft = prop.getNode().offsetLeft
        if (propLeft > left) {
          if (closestLeft === void 0 || closestLeft > propLeft) {
            closestLeft = propLeft
            closest = prop
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
        var propTop = prop.getNode().offsetTop
        if (propTop < top) {
          if (closestTop === void 0 || closestTop < propTop) {
            closestTop = propTop
            closest = prop
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
        var propTop = prop.getNode().offsetTop
        if (propTop > top) {
          if (closestTop === void 0 || closestTop > propTop) {
            closestTop = propTop
            closest = prop
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
      console.log('do it', element.key)
      element.setKey('css', {add: 'focused'})
      // node.className += ' focused'
    } else {
      console.log('remove it', element.key)
      element.setKey('css', {remove: 'focused'})
      // node.className = node.className.replace(/focused/g, '')
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

var keyevents = require('../event/key')

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
      console.log('focus!', key)
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

  // focus: new Prop({
  //   properties: {
  //     prevKey: true
  //   },
  //   prevKey: false,
  //   render (node, event, parent) {
  //     var val = this.parseValue()
  //     var type = typeof val
  //     var prevKey = this.prevKey
  //     var key

  //     if (type === 'string' || type === 'number') {
  //       key = val
  //     } else {
  //       key = val.key
  //     }

  //     if (key !== prevKey || app && app.focused._input && app.focused._input._input === null) {
  //       if (parent[key]) {
  //         parent[key].focusItem(prevKey && parent[prevKey], event)
  //         this.prevKey = key
  //       }
  //     }
  //   }
  // })
}
