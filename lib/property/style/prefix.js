'use strict'
const prefixKeys = {
  fontFeatureSettings: true,
  columnCount: true,
  boxReflect: true,
  columnRule: true,
  wordBreak: true,
  maskImage: true,
  columnGap: true,
  objectFit: true,
  transform: true,
  animation: true,
  hyphens: true,
  filter: true
}
const prefix = require('vigour-ua/navigator').prefix

for (let val in prefixKeys) {
  prefixKeys[val] = prefix + val[0].toUpperCase() + val.slice(1)
}

module.exports = function (pnode, key, val) {
  pnode.style[prefixKeys[key] || key] = val
}
