'use strict'
var Observable = require('vigour-js/lib/observable')
var Data = new Observable({
  inject: require('../../lib/subscription/stamp'),
  Child: 'Constructor'
}).Constructor

module.exports = new Data({
  1: {
    title: 'todo!'
  },
  2: {
    title: 'todox!'
  },
  '3:project': {
    title: 'special project',
    todos: {
      1: { title: 'project 1' },
      2: { title: 'project 2' }
    }
  },
  4: {
    title: 'its yuz!',
    todos: {
      1: { title: 'yuzzzi' }
    }
  }
})
