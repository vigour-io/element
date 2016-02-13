'use strict'

var merge = require('lodash/object/merge')

exports.list = {
  $collection: 'items',
  Child: { type: 'item-row' }
}

merge(exports, require('./grid'))
merge(exports, require('./list-horizontal'))
