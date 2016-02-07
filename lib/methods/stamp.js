'use strict'
exports.define = {
  getStamp (data) {
    let dstamp = data && this._datarender && data._lstamp
    let lstamp = this._lstamp
    let stamp = (dstamp && (lstamp ? dstamp + lstamp : dstamp)) || lstamp
    if (data) {
      stamp += data.uid
    }
    return stamp
  }
}
