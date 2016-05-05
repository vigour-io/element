'use strict'
module.exports = function getContextParent (cuid, target, subs) {
  var parent
  if (cuid) {
    // target is totally wrong!
    if (subs._.c && subs._.c[cuid]) {
      // this is only used to gen the uid
      // since we never need to get the parent in this way for elements (walks correctly apprently)
      // cant work allways
      console.error('C PARENT!', subs._.c[cuid])
    }
    //  (subs._.c && subs._.c[cuid]) ||
    parent = target.cParent() // just call this when this is not nessecary here...
    // console.info('parent', cuid, parent)
  } else {
    parent = target._parent
  }
  return parent
}
