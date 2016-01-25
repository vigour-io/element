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
    dash: 'https://s3-eu-west-1.amazonaws.com/sbs-storage-dev/output/104698_62f9febd21d06444f05e3ae7c7589a6d/m3u8s/104698.m3u8',
    hls: 'https://s3-eu-west-1.amazonaws.com/sbs-storage-dev/output/104698_62f9febd21d06444f05e3ae7c7589a6d/mpds/104698.mpd'
    // hls: 'http://abudhabimedia-lh.akamaihd.net/i/ch_adaloulahd@325615/master.m3u8'
  },
  volume: 0,
  play: true,
  time: 0.5
})

