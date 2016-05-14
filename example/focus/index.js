'use strict'
require('../style.css')

const s = require('vigour-state/s')
const render = require('../../lib/render')

const elem = {
  key: 'app',
  holder: {
    $: 'shows.items.$any',
    Child: {
      text: {
        $: 'title'
      },
      class: {
        focus: { $: true }
      }
    }
  }
}

const state = s({
  title: 'root-title',
  focus: '$root.shows.items.1',
  shows: {
    title: 'Shows!',
    focus: true,
    items: [
      {title:'Show 1'},
      {title:'Show 2'},
      {title:'Show 3'},
      {title:'Show 4'}
    ]
  }
})

var treex
var topsubs
document.body.appendChild( render(elem, state,
  (state, type, stamp, nsubs, tree, sType, subs, rTree) => {
 treex = rTree
 topsubs = subs
}))

console.log('rSubs:', topsubs)
console.log('rTree', treex)
