var Element = require('../../../lib/element')

describe('Element Operators', function () {

  context('Using the add operator',function () {
    var elem = new Element({
    inject: require('vigour-js/lib/operator/add'),
      $add: {
        one: {},
        two: {}
      }
    })

    it('should have the added nodes(one and two)', function () {
      expect(elem.node.childNodes.length).equals(2)
    })
  })
  context('Using the transform operator on Element', function () {
    var elem = new Element({
      inject: require('vigour-js/lib/operator/transform'),
      $transform: {
        one: {},
        two: {}
      }
    })

    it('should have nodes for one and two', function () {
      expect(elem.node.childNodes.length).equals(2)
    })
  })

})


