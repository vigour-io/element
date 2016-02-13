'use strict'

exports.discover = {
  list: {
    $collection: 'items',
    Child: {
      order: { $: 'order' },
      type: 'list-discover',
      title: null,
      header: {
        title: {
          type: 'title'
        },
        rowcount: {
          text: '2/20'
        },
        button: {
          type: 'button',
          text: 'All channels',
          css: { size: 'big' }
          // { $: 'moreButton' } [true/false or a category]
        }
      }
    },
    properties: {
      carousel: {
        type: 'carousel'
      },
      actors: {
        // lets make this into a better category since this is super unclear
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
