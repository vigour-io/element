'use strict'
var Config = require('vigour-config')
var config = new Config()
module.exports = config.player || config
