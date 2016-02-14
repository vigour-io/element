'use strict'

exports.title = {
  title: {
    text: {
      $: 'title'
    }
  }
}

exports.subtitle = {
  $: true,
  subtitle: {
    text: {
      $: 'subtitle'
    }
  }
}

exports['title-secondary'] = {
  type: 'title',
  css: { inherits: 'type-title' },
  letters: { text: ' A-Z', order: 1 }
}

exports.info = {
  title: { type: 'title' },
  subtitle: { type: 'subtitle' }
}

exports.description = {
  order: 1,
  html: {
    $: 'description'
  }
}

exports['description-short'] = {
  type: 'description',
  html: {
    $transform (val) {
      if (typeof val === 'string' && val.length > 255) {
        return `${val.slice(0, 255)}...`
      }
      return val
    }
  }
}
