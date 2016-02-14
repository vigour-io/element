'use strict'
var merge = require('lodash/object/merge')

var click = {
  on: {
    click () {
      console.log('ok set this?', this.path)
      this.state.data.getRoot().state.app.val = this.state.data.origin
    }
  }
}

exports.item = {
  img: {
    order: -1,
    type: 'thumb'
  },
  title: { type: 'info' },
  inject: click
}

exports['item-video'] = {
  type: 'item',
  css: { inherits: 'type-item' },
  img: {
    progress: { type: 'progress' }
  },
  inject: click
}

exports['item-channel'] = {
  css: { inherits: 'type-item' },
  img: { type: 'thumb' },
  title: { type: 'title', $: 'items.0.title' }, // $: 'next.title'
  info: {
    $: 'items.0',
    subtitle: { type: 'subtitle', $: 'subtitle' },
    progress: { type: 'progress', $: 'time' }
  },
  inject: click
}

exports['item-poster'] = {
  type: 'poster',
  inject: click
}

exports['item-cover'] = {
  background: { $: 'img.thumb' },
  logo: {
    type: 'img',
    src: { $: 'logo' }
  },
  description: { type: 'description' }
}

merge(exports, require('./flex'))
merge(exports, require('./row'))
