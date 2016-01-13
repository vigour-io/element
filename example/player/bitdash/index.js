'use strict'
const CUSTOM_WIDTH = 300

var Player = require('../../../lib/player/')

var thePlayer = new Player({
  inject: require('../../../lib/property/attributes'),
  options: {
    width: `${CUSTOM_WIDTH}px`,
    bitdashScriptUrl: 'https://bitmovin-a.akamaihd.net/bitdash/beta/4.1.0-b4/bitdash.min.js',
    key: 'f9f96c01-610f-437d-9a72-43abe98755b2'
  }
})

thePlayer.set({
  attributes: {
    id: 'mexirica'
  },
  inject: require('../../../lib/player/bitdash/'),
  src: {
    dash: 'https://eu-storage-bitcodin.storage.googleapis.com/bitStorage/2038_d06f9f4f032f9f599edbe38f1acd2900/5391_93fe74e97ef2a8ff3389d5a490d902c7/5391.mpd',
    hls: 'https://eu-storage-bitcodin.storage.googleapis.com/bitStorage/2038_d06f9f4f032f9f599edbe38f1acd2900/5391_93fe74e97ef2a8ff3389d5a490d902c7/5391.m3u8'
    // hls: 'http://abudhabimedia-lh.akamaihd.net/i/ch_adaloulahd@325615/master.m3u8'
  },
  volume: 0,
  play: true,
  time: 0.5
})

