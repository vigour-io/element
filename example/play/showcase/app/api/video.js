'use strict'
var Api = require('vigour-api')
var config = require('../../package.json').vigour.api.video

var getSource = new Api()
var sendPlayback = new Api()
var sendEvent = new Api()

var getSourceApi = getSource
var getSourceConfig = config.getSource

getSourceApi.set({
  inject: getSourceConfig,
  define: {
    makeRequest () {
      var url = getSourceConfig.url
      if (this.asset.val && this.protocol.val) {
        url += this.asset.val + '/' + this.protocol.val
        if (!this.loading.val) {
          this.url = url
          this.request()
        }
      }
    }
  },
  protocol: {
    val: false,
    on: {
      data (data) {
        this.parent.makeRequest()
      }
    }
  },
  asset: {
    val: false,
    on: {
      data (data) {
        this.parent.makeRequest()
      }
    }
  }
})

var sendPlaybackApi = sendPlayback
var sendPlaybackConfig = config.sendPlayback

sendPlaybackApi.set({
  inject: sendPlaybackConfig,
  properties: {
    logData: true
  },
  logData: false,
  define: {
    makeRequest () {
      var url = getSourceConfig.url
      if (this.asset.val && this.logId.val) {
        url += this.asset.val + '/' + this.logId.val
        if (!this.loading.val) {
          this.url = url
          this.request()
        }
      }
    },
    build () {
      return {
        logData: this.logData
      }
    },
    validate () {
      var errors = []
      if (!this.logData && typeof logData !== 'string') {
        return errors.push({
          field: 'logData',
          message: 'required'
        })
      }
      return errors
    }
  },
  asset: {
    val: false,
    on: {
      data (data) {
        this.parent.makeRequest()
      }
    }
  },
  logId: {
    val: false,
    on: {
      data (data) {
        this.parent.makeRequest()
      }
    }
  }
})

var sendEventApi = sendEvent
var sendEventConfig = config.sendEvent

sendEventApi.set({
  inject: sendEventConfig,
  properties: {
    eventData: true
  },
  eventData: false,
  define: {
    makeRequest () {
      var url = getSourceConfig.url
      if (this.asset.val) {
        url += this.asset.val
        if (!this.loading.val) {
          this.url = url
          this.request()
        }
      }
    },
    build () {
      return this.eventData
    },
    validate () {
      // scheck if this.logData is complete
      // TODO: validate event body required props
    }
  },
  asset: {
    val: false,
    on: {
      data (data) {
        this.parent.makeRequest()
      }
    }
  }
})

module.exports.getSource = getSourceApi
module.exports.sendPlayback = sendPlaybackApi
module.exports.sendEvent = sendEventApi
