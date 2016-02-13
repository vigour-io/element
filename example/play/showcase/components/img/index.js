'use strict'

exports.img = {
  src: { $: 'img' }
}

exports.thumb = {
  type: 'figure',
  img: {
    type: 'img'
  }
}

exports.poster = {
  type: 'img',
  src: {
    $: 'img',
    $transform (val) {
      return 'mynikaimgserver.smurky?' + val + '&800/200'
    }
  }
}
