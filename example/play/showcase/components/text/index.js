'use strict'

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

exports.description = {
  order: 1,
  text: { $: 'description' }
}