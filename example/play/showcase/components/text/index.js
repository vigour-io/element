'use strict'

exports.title = {
  // type: 'h1',
  text: { $: 'title' }
}

exports.subtitle = {
  $: true,
  text: { $: 'subtitle' }
}

exports.secondarytitle = {
  type: 'title',
  letters: { text: ' A-Z' }
}

exports.info = {
  title: { type: 'title' },
  subtitle: { type: 'subtitle' }
}

exports.description = {
  order: 1,
  html: {
    $: 'description',
    $transform (val) {
      if (typeof val === 'string' && val.length > 255) {
        return `${val.slice(1, 255)}...`
      }
      return val
    }
  }
}
