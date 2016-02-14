'use strict'
var Observable = require('vigour-js/lib/observable')
var isNode = require('vigour-js/lib/util/is/node')
var Operator = require('vigour-js/lib/operator')
var env  //= {} //require('vigour-env')
var ua = require('../ua')
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
        // val: false,
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
          // if(this.)
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
        let length = prototypes.length
        if (length) {
          let obj = {}
          for (let j = added.length - 1; j >= 0; j--) {
            let key = added[j]
            obj[key] = new Case({
              case: this[key]
            }, event)
          }
          console.error('___SET CASE', this, added, prototypes)

          Observable.prototype.properties = obj

          // for (let i = length - 1; i >= 0; i--) {
          //   prototypes[i].set({
          //     properties: obj
          //   })
          // }
        }
      }
    }
  }
})

exports.injectable = function (base) {
  console.error('!')
  // base.inject(require('vigour-js/lib/operator/val'))
  prototypes.push(base)
  setDefaultCases(base)
}

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
    console.error('SET CASE', cases, set)
    base.set({
      properties: cases
    })
  } else {
    exports.set(set)
  }
}

setDefaultCases()
