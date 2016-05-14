'use strict'
require('../style.css')

const s = require('vigour-state/s')
const render = require('../../lib/render')

const elem = {
  key: 'app',
  holder: {
    // this fucks shit up
    // thing: {
    //   $: 'menu.items.1',
    //   text: { $: '$root.menu.title' }
    // },
    menu: {
      class: 'complex-item',
      list: {
        $: 'menu.items.$any',
        Child: {
          class: {
            focus: {
              $: '$root.menu.focus'
            }
          },
          text: {
            $: 'title'
          }
        }
      }
    },
    player: {
      $: 'episodes.currentEpisode',
      title: [
        { text: 'Im a player!' },
        { class: 'complex-item', text: { $: 'title' } }
      ],
      class: {
        val: 'complex-item',
        // focus: {
        //   $: '$root.focus'
        // }
      }
    },
    list: {
      $: 'episodes.items.$any',
      Child: {
        text: {
          $: 'title'//,
        },
        class: {
          focus: { $: '$parent.$parent.focus' }
        }
      }
    }
  }
}

const state = s({
  title: 'root-title',
  focus: '$root.episodes.focus',
  menu: {
    title: 'im the menu!',
    focus: '$root.menu.items.1',
    items: [
      { title:'discover!' },
      { title:'shows!' },
      { title:'channels!' }
    ]
  },
  episodes: {
    currentEpisode: '$root.episodes.items.1',
    title: 'episodes!',
    focus: '$root.episodes.items.1',
    items: [
      { title:'episode 1' },
      { title:'episode 2' },
      { title:'episode 3' },
      { title:'episode 4 '}
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

console.log('---------')
console.log('rSubs:', topsubs)
console.log('rTree', treex)
console.log('---------')