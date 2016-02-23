'use strict'
var Emitter = require('vigour-observable/lib/emitter')
var screenfull = require('screenfull')
var delegator = require('./delegator')
var FullscreenEmitter

exports.inject = require('./')

if (screenfull.enabled) {
  let FSCHANGE = screenfull.raw.fullscreenchange

  delegator.listenTo(FSCHANGE)

  FullscreenEmitter = function FullscreenEmitter (val, ev, parent, key) {
    if (parent) {
      parent.setKey(FSCHANGE, {
        fs (e, event) {
          if (this.__input !== null) {
            e.fullscreen = !!screenfull.element
            this._on[key].execInternal(this, event, e)
          }
        }
      }, ev)
    }
    return Emitter.apply(this, arguments)
  }
} else {
  let BEGINFS = 'webkitbeginfullscreen'
  let ENDFS = 'webkitendfullscreen'

  delegator.listenTo(BEGINFS)
  delegator.listenTo(ENDFS)

  FullscreenEmitter = function FullscreenEmitter (val, ev, parent, key) {
    if (parent) {
      parent.setKey(BEGINFS, {
        fs (e, event) {
          if (this.__input !== null) {
            e.fullscreen = true
            this._on[key].execInternal(this, event, e)
          }
        }
      }, ev)
      parent.setKey(ENDFS, {
        fs (e, event) {
          if (this.__input !== null) {
            e.fullscreen = false
            this._on[key].execInternal(this, event, e)
          }
        }
      }, ev)
    }
    return Emitter.apply(this, arguments)
  }
}

exports.on = {
  properties: {
    fullscreen: new Emitter({
      define: {
        generateConstructor () {
          return FullscreenEmitter
        }
      }
    })
  }
}