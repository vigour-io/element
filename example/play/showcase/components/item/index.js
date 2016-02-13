'use strict'

var merge = require('lodash/object/merge')

function setAppState () {
  this.state.data.getRoot().state.app.val = this.state.data
}

exports.item = {
  img: { type: 'thumb' },
  title: { type: 'info' },
  on: {
    click: setAppState
  }
}

exports['item-carousel'] = {
  type: 'item'
}

exports['item-video'] = {
  type: 'item',
  css: { inherits: 'type-item' },
  img: {
    progress: { type: 'progress' }
  }
}

exports['item-channel'] = {
  css: { inherits: 'type-item' },
  img: { type: 'thumb' },
  title: { type: 'title' },
  info: {
    subtitle: { type: 'subtitle' },
    progress: { type: 'progress' }
  }
}

exports['item-poster'] = {
  type: 'poster',
  on: {
    click: setAppState
  }
}

exports['item-cover'] = {
  background: { $: 'img' },
  logo: {
    type: 'img',
    src: { $: 'logo' }
  },
  description: { type: 'description' }
}

merge(exports, require('./flex'))
merge(exports, require('./row'))
