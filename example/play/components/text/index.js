'use strict'
require('./style.less')

exports.title = {
  // type: 'h1',
  text: { $: 'title' }
}

exports.subtitle = {
  // type: 'h2',
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
