'use strict'

require('./style.less')

exports.item = {
  img: { type: 'thumb' },
  title: { type: 'info' },
  on: {
    click () {
      console.error('!!!', this.path)
    }
  }
}

exports['item-flex'] = {
  type: 'item',
  description: {
    text: { $: 'description' }
  },
  arrow: { type: 'icon', css: 'icon-right' }
}

exports['item-flex-progress'] = {
  type: 'item-flex',
  progress: { type: 'progress' }
}

exports['item-row'] = {
  type: 'item',
  icon: { type: 'icon', css: { icon: 'icon-right' } }
}

exports['item-row-progress'] = {
  type: 'item-row',
  progress: { type: 'progress' }
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
  type: 'poster'
}

exports['item-cover'] = {
  background: { $: 'img' },
  logo: {
    type: 'img',
    src: { $: 'logo' }
  },
  description: { text: { $: 'description' } }
}
