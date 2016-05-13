'use strict'
exports.properties = {
  $ (val) {
    if (
      typeof val === 'string' &&
      (val = val.split('.')) ||
      val instanceof Array
    ) {
      let length = val.length
      const last = val[length - 1]
      if (last === '$switch') {
        this.isSwitcher = true
      } else if (last === '$any') {
        this.isCollection = true
        length = length - 1
      } else if (this.isSwitcher) {
        this.isSwitcher = null
      } else if (this.isCollection) {
        this.isCollection = null
      }
      this._$length = length
    } else {
      this._$length = null
    }
    this.$ = val
  },
  _$path: true,
  $any: true,
  isStatic: true,
  isSwitcher: true,
  isCollection: true,
  isGroup: true,
  defaultSubscription: true,
  render (render) {
    this.define({
      render: { value: render }
    })
  },
  map (map) {
    this.define({ map })
  }
}

exports.inject = require('./map')

// operator playing
var compute = require('vigour-base').prototype.compute
const OPERATORS = '_operators'

exports.define = {
  compute (val, previousVal, stamp, origin) {
    val = compute.call(this, val, previousVal, stamp, origin)
    var operators = this.keysInternal(this._operators, OPERATORS, this.keysCheckField)
    console.log('val:', val, this._operators)
    if (operators) {
      val = computeOperators(operators, this, val, stamp, origin)
    }
    if (val === void 0 && this.keyType !== OPERATORS) { val = this }
    return val
  }
}

function setContext (operator, parent) {
  if (operator._parent !== parent) {
    operator.__c = parent
    operator._cLevel = 1
  } else if (parent.__c) {
    operator.__c = parent.__c
    operator._cLevel = parent._cLevel + 1
  }
}

function computeOperators (operators, observable, val, stamp, origin) {
  if (!observable._operatorResult) {
    for (let i = 0, len = operators.length; i < len; i++) {
      let operator = observable[operators[i]]
      // will require some perf
      let origc = operator.__c
      let l
      if (origc) { l = operator._cLevel }
      setContext(operator, observable)
      // trying to get rid of getBind saves A LOT of speed
      let bind = operator.getBind()
      let calc = operator.operator.call(bind, val, stamp, operator, origin)
      if (origc) {
        operator.__c = origc
        operator._cLevel = l
      }
      if (calc === null) {
        val = void 0
      } else if (calc !== void 0) {
        val = calc
      }
    }
  }
  return val
}