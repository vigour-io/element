var prettifyTransform = function(property, value) {
  return property.substr(1) + '(' + value + ')'
}

module.exports = function(properties) {
  // available transforms
  var transforms = [
    '$rotate',
    '$translate',
    '$translate3d',
    '$skew',
    '$scale',
    '$matrix'
  ]
  for (var i = 0, length = transforms.length, parent = this.$parent; i < length; i++) {

    var property = transforms[i]
    var parentProperty = parent[property]

    // first check if it match with passed properties
    if (properties[property]) {
      transforms[i] = prettifyTransform(property, properties[property])
    }
    // then check if the property is already defined in element
    else if (parentProperty){
      transforms[i] = prettifyTransform(property, parentProperty.$val)
    }
    // delete
    else {
      transforms[i] = void 0
    }
  }

  // console.log(transforms)
  console.info('applying transform:', transforms.join(' '))

  return transforms.join(' ')
}