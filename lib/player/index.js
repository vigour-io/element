'use strict'
var Element = require('../')
var ID = 'vigour-player'

module.exports = new Element({
  inject: [
    require('./properties'),
    require('./methods'),
    require('./cases')
  ],
  attributes: { id: ID },
  id: ID,
  time: { $: 'time' },
  duration: { $: 'duration' },
  src: { $: 'video' },
  config: {}
}).Constructor
