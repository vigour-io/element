'use strict'
var Element = require('../element')
var Property = require('../property')
var Observable = require('vigour-observable')

var element = Element.prototype
var property = Property.prototype

var isNode = require('vigour-util/is/node')
var isPlain = require('vigour-util/is/plainobj')
var Operator = require('vigour-observable/lib/operator')
var _set = Observable.prototype.set
var ua = require('../ua')
var defaultCases = [
  'phone',
  'tablet',
  'tv',
  'desktop',
  'ios',
  'android',
  'globals',
  'mac',
  'chromecast'
]

var Case = new Operator({
  properties: {
    case: new Observable({
      on: {
        data (data, event) {
          var parent = this.parent
          if (parent) {
            parent.emit('data', data, event)
          }
        }
      }
    })
  },
  operator (val, event, operator, origin) {
    var parsed = operator.case.parseValue()
    return parsed
      ? operator.parseValue()
      : val
  },
  Child: Observable
}).Constructor

var ElementCase = new Element({
  properties: {
    case: new Observable({
      on: {
        data (data, event) {
          var parent = this.parent
          if (parent) {
            parent.emit('data', data, event)
          }
        }
      }
    })
  },
}).Constructor

module.exports = exports = new Observable({
  Child: new Observable({
    on: {
      data: !isNode ? {
        case () {
          var className = document.body.className
          var key = this.key
          if (key[0] === '$') {
            key = key.substring(1)
          }
          if (this.val) {
            if (!~className.indexOf(key)) {
              document.body.className += ' ' + key
            }
          } else {
            document.body.className = className.replace(key, '').trim()
          }
        }
      } : {}
    }
  }),
  define: {
    set (val, event) {
      if (!isPlain(val)) {
        throw new Error('cases need to be set with a plain object')
      }
      var ret = _set.apply(this, arguments)
      var propobj
      var elemobj
      for (let key in val) {
        if (!element[key] && !property[key]) {
          if (!propobj) {
            propobj = {}
          }
          if (!elemobj) {
            elemobj = {}
          }
         propobj[key] = new Case({ case: this[key] }, event)
         elemobj[key] = new ElementCase({ case: this[key] }, event)
        }
      }
      if (propobj && elemobj) {
        property.properties = propobj
        element.properties = elemobj
      }
      return ret
    }
  }
})

property.define({
  cases: { value: exports }
})

element.define({
  cases: { value: exports }
})

property.properties = {
  cases (val, event) {
    return exports.set(val, event)
  }
}

element.properties = {
  cases (val, event) {
    return exports.set(val, event)
  }
}

setDefaultCases(property)
setDefaultCases(element)

function setDefaultCases (base) {
  var i = defaultCases.length - 1
  var str
  var set = exports._defaultCases
  if (!set) {
    set = {
      $native: false,
      $touch: isNode ? false : (('ontouchstart' in global) || global.DocumentTouch && document instanceof global.DocumentTouch) || navigator.msMaxTouchPoints || false
    }
    for (; i >= 0; i--) {
      str = defaultCases[i]
      str = '' + str
      let val = !!(ua.device === str || ua.platform === str)
      set['$' + str] = val
    }
    exports._defaultCases = set
  }

  if (base) {
    let cases = {}
    for (let j in set) {
      if (!base.properties[j]) {
        cases[j] = new Case({
          key: j,
          case: set[j]
        })
      }
    }
    base.properties = cases
  } else {
    exports.set(set)
  }
}

setDefaultCases()
