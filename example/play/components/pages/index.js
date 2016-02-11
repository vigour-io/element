'use strict'

exports.discover = {
  $collection: 'items',
  Child: { type: 'list-discover' },
  properties: {
    carousel: { Child: { type: 'carousel' } },
    videos: { Child: { type: 'item-video' } },
    channels: { Child: { type: 'item-channel' } }
  }
}
