'use strict'
var Observable = require('vigour-js/lib/observable')
var isNode = require('vigour-util/is/node')
var Operator = require('vigour-js/lib/operator')
var env  // = {} //require('vigour-env')
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
  }
}).Constructor

module.exports = exports = new Observable({
  Child: new Observable({
    on: {
      data: {
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
      }
    }
  }),
  on: {
    property (data, event) {
      var added = data.added
      if (added) {
        let obj = {}
        for (let j = added.length - 1; j >= 0; j--) {
          let key = added[j]
          obj[key] = new Case({ case: this[key] }, event)
        }
        Observable.prototype.set({ properties: obj })
      }
    }
  }
})

Observable.prototype.define({
  cases: { value: exports }
})

// lets use type system
setDefaultCases(Operator.prototype)

function setDefaultCases (base) {
  var i = defaultCases.length - 1
  var str
  var set = exports._defaultCases
  if (!set) {
    set = {
      $native: env && env.isNative.val,
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
