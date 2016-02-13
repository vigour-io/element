'use strict'

exports.discover = {
  list: {
    $collection: 'items',
    Child: {
      type: 'list-discover',
      rowcount: {
        text: '2/20' // $: 'length' //phone and web
      },
      button: {
        text: 'All channels' // { $: 'moreButton' } [true/false or a category]
      }
    },
    properties: {
      carousel: {
        type: 'carousel',
        order: { $: 'order' },
        items: {
          $collection: 'items',
          Child: { type: 'item-carousel' } // optional
        }
      },
      actors: { // lets make this into a better category since this is super unclear
        list: { Child: { type: 'item-video' } }
      },
      movies: {
        list: { Child: { type: 'item-poster' } }
      },
      continue: {
        list: { Child: { type: 'item-video' } }
      },
      videos: {
        list: { Child: { type: 'item-video' } }
      },
      channels: {
        list: { Child: { type: 'item-channel' } }
      }
    }
  }
}