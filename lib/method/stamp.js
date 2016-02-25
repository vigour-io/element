'use strict'
exports.define = {
  getStamp (data) {
    let dstamp = data && this._datarender && data._lstamp
    let lstamp = this._lstamp || 0
    let stamp = (dstamp && (lstamp ? dstamp + lstamp : dstamp)) || lstamp
    if (data) {
      stamp += data.uid
    }
    return stamp
  }
}
