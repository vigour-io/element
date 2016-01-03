'use strict'
var Observable = require('vigour-js/lib/observable')
var _resolveContext = Observable.prototype.resolveContext

var Element = new Observable({
  properties: {
    _engine: true
  },
  define: {
    engine: {
      get () {
        return this._context ? this._context.engine : this._engine
      },
      set (val) {
        this._engine = val
      }
    },
    generateConstructor () {
      return function Element () {
        var engine = this.engine
        if (engine) {
          this._engine = engine
        }
        return Observable.apply(this, arguments)
      }
    }
  },
  inject: [
    require('vigour-js/lib/base/uid/hash'),
    require('../property/dom'),
    require('./operator'),
    require('../event/click'),
    require('../event')
  ],
  trackInstances: true,
  useVal: true,
  ChildConstructor: 'Constructor'
}).Constructor

module.exports = Element
