'use strict'
var Observable = require('vigour-js/lib/observable')
var Element = require('../')

module.exports = new Element({
  inject: [
    require('./properties'),
    require('./methods')
  ],
  // player initialised
  initialised: new Observable(false),
  // player script loaded
  loaded: new Observable(false),
  // player ready to play
  ready: new Observable(false),
  // play / pause
  play: new Observable(false),
  // player id
  attributes: {
    id: 'vigour-player'
  },
  time: { $: 'time' },
  duration: { $: 'duration' },
  src: { $: 'video' },
  config: {}
}).Constructor
