'use strict'

var Observable = require('vjs/lib/observable')
var Operator = require('vjs/lib/operator')
var ua = require('../ua')
var prototypes = []
var defaultCases = [
  'phone',
  'tablet',
  'tv',
  'desktop',
  'ios',
  'android',
  'windows',
  'mac',
  'chromecast'
]

var Case = new Operator({
  properties: {
    case: new Operator({
      key: 'case',
      operator: function (val, operator, origin) {
        console.error('???', operator.val)
        return operator.val && val
      }
    })
  }
}).Constructor

module.exports = exports = new Observable({
  on: {
    data: function (data, event) {
      var length = prototypes.length
      var property
      var set
      var obj
      var i

      if (length) {
        i = length - 1
        set = event.val
        obj = {}

        for (property in set) {
          obj[property] = new Case({
            case: this[property],
            key: property,
            operator: function (val, operator, origin) {
              return operator.parseValue(val, origin) || val
            }
          })
        }

        for (; i >= 0; i--) {
          prototypes[i].inject({
            properties: obj
          })
        }
      }
    }
  }
})

exports.injectable = function (base) {
  prototypes.push(base)
  setDefaultCases(base)
}

function setDefaultCases (base) {
  var i = defaultCases.length - 1
  var str
  var property
  var set = exports._defaultCases

  if (!set) {
    set = {
      native: !!window.cordova,
      touch: (('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch) || navigator.msMaxTouchPoints || false
    }

    for (; i >= 0; i--) {
      str = defaultCases[i]
      str = '' + str
      set[str] = !!(ua.device === str || ua.platform === str)
    }

    exports._defaultCases = set
  }

  if (base) {
    for (property in set) {
      set[property] = new Case({
        case: exports[property],
        key: property,
        operator: function (val, operator, origin) {
          return operator.parseValue(val, origin) || val
        }
      })
    }
    base.inject({
      properties: set
    })
  } else {
    exports.set(set)
  }
}

setDefaultCases()
