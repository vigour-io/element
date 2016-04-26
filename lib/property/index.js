'use strict'
const Observable = require('vigour-observable')
module.exports = new Observable({
  type: 'property',
  inject: [
    require('../subscribe'),
    require('../map')
  ],
  Child: 'Constructor'
}, false).Constructor
