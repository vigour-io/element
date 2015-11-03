var Element = require('../../../lib/element')

describe('Using the add operator on Element', function () {
  var elem = new Element({
    inject: require('vjs/lib/operator/add'),
    $add: {
      one: {},
      two: {}
    }
  })

  it('should have nodes for one and two', function () {
    expect(elem.node.childNodes.length).equals(2)
  })

})
