module.exports = {
  left:{
    "37":"defaultLeft",
    "4":"samsungLeft"
  },
  right:{
    "39":"defaultRight",
    "5":"samsungRight"
  },
  up:{
    "38":"defaultUp",
    "29460":"samsungUp"
  },
  down:{
    "40":"defaultDown",
    "29461":"samsungDown"
  },
  back:{
    "":""
  },
  findElement (originElement, direction) {
    var nodeDirection = direction+'Sibling'
    var found = originElement.node[nodeDirection] ? originElement.node[nodeDirection].base : originElement.node[nodeDirection]
    if (originElement.node[nodeDirection] === null || found === undefined) {
      return
    }
    if((!found.display || found.display.val !== 'none' ) && found._on.focus) {
      originElement.node[nodeDirection].focus()
    }
  }
}
