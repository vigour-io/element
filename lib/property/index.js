'use strict'
const Observable = require('vigour-observable')
module.exports = new Observable({
  type: 'property',
  inject:   require('../subscribe'),
  Child: 'Constructor',
  defaultSubscription: true
}, false)
