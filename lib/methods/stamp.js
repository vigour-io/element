'use strict'
exports.define = {
  getStamp (data) {
    let dstamp = data && this._datarender && data._lstamp
    let lstamp = this._lstamp
    return (dstamp && (lstamp ? dstamp + lstamp : dstamp)) || lstamp
  }
}
