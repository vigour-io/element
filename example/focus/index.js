'use strict'
require('../style.css')

const s = require('vigour-state/s')
const render = require('../../lib/render')

const elem = {
  key: 'app',
  $: 'thing',
  class: {
    focus: {
      $: '$root.focus'
    }
  }
}

const state = s({
  title: 'root-title',
  thing: {
    focus: true//'$root.shows.items.0',
  },
  focus: true,//'$root.shows.items.0',
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
