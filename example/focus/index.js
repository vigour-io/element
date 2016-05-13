'use strict'
require('../style.css')
const s = require('vigour-state/s')
const render = require('../../lib/render')

const elem = {
  key: 'app',
  shows: {
    $: 'shows',
    text: { $:'title' },
    holder: {
      $: 'items.$any',
      Child: {
        class: 'basic-item',
        text: { $: 'title' },
        focus: { $: '$parent.focus' }
      }
    }
  },
  channels: {
    $: 'channels',
    text: { $:'title' },
    holder: {
      $: 'items.$any',
      Child: {
        class: 'basic-item',
        text: { $: 'title' },
        focus: { $: '$parent.focus' }
      }
    }
  }
}

const state = s({
  focus: '$root.shows',
  shows: {
    title: 'shows',
    focus: '$root.shows.items.0',
    items: {
      0: { title: 'first show' },
      1: { title: 'second show' },
      2: { title: 'third show' },
      3: { title: 'fourth show' }
    }
  },
  channels: {
    title: 'channels',
    focus: '$root.channels.items.0',
    items: {
      0: { title: 'first channel' },
      1: { title: 'second channel' },
      2: { title: 'third channel' },
      3: { title: 'fourth channel' }
    }
  }
})

document.body.appendChild(render(elem, state))