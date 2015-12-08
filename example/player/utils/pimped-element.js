var Element = require('../../../lib/element')
module.exports = exports = new Element({
  ChildConstructor: 'Constructor',
  inject: [
    require('../../../lib/property/attributes'),
    require('../../../lib/property/style'),
    require('../../../lib/property/size'),
    require('../../../lib/property/text'),
    require('../../../lib/events/click')
  ]
})
