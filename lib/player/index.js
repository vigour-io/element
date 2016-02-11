'use strict'
require('./style.less')

var Element = require('../')
var ID = 'vigour-player'

module.exports = new Element({
  css: 'vigour-player-container',
  prerender (properties, children) {
    var video
    for (var i = 1, length = children.length; i < length; i++) {
      let child = children[i]
      if (child.state.elem.key === 'video') {
        video = child
        break
      }
    }
    if (video) {
      children.splice(i, i + 1)
      children.unshift(video)
    }
  },
  video: {
    attributes: { id: ID }
  },
  inject: [
    require('../methods/interval'),
    require('../methods/postpone'),
    require('./properties'),
    require('./methods'),
    require('./cases')
  ],
  id: ID,
  duration: { $: 'duration' },
  time: { $: 'time' },
  src: { $: 'video' },
  config: {}
}).Constructor
