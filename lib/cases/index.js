'use strict'
var Observable = require('vigour-js/lib/observable')
var Operator = require('vigour-js/lib/operator')
var ua = require('../ua')
var isNode = require('vigour-js/lib/util/is/node')
var prototypes = []
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
          this.parent.emit('data', data, event)
        }
      }
    })
  },
  operator (val, event, operator, origin) {
    return operator.case.parseValue(void 0, event, origin)
      ? operator.parseValue(val, event, origin)
      : val
  }
}).Constructor

module.exports = exports = new Observable({
  on: {
    data (data, event) {
      var length = prototypes.length
      if (length) {
        let i = length - 1
        let set = data
        let obj = {}
        for (let property in set) {
          obj[property] = new Case({
            case: this[property]
          }, event)
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
  base.inject(require('vigour-js/lib/operator/val'))
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
      $native: !!global.vigour,
      $touch: isNode ? false : (('ontouchstart' in global) || global.DocumentTouch && document instanceof global.DocumentTouch) || navigator.msMaxTouchPoints || false
    }

    for (; i >= 0; i--) {
      str = defaultCases[i]
      str = '' + str
      set['$' + str] = !!(ua.device === str || ua.platform === str)
    }

    exports._defaultCases = set
  }

  if (base) {
    let cases = {}
    for (property in set) {
      if (!base.properties[property]) {
        cases[property] = new Case({
          case: set[property]
        })
      }
    }
    base.set({
      properties: cases
    })
  } else {
    exports.set(set)
  }
}

setDefaultCases()
