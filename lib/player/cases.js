'use strict'
var Observable = require('vigour-js/lib/observable')
var cases = require('../cases')
var volume = new Observable(1)

cases.set({
  $playerFullscreen: false,
  $playerPlaying: false,
  $playerLoading: false,
  $playerEnded: false,
  $playerReady: false,
  $playerAd: false,
  $playerMuted: {
    val: volume,
    $transform (val) {
      return val === 0
    }
  }
})

module.exports = {
  fullscreen: cases.$playerFullscreen,
  loading: cases.$playerLoading,
  playing: cases.$playerPlaying,
  ended: cases.$playerEnded,
  ready: cases.$playerReady,
  muted: cases.$playerMuted,
  ad: cases.$playerAd,
  volume: volume
}
