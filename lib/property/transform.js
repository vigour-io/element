"use strict";

var Property = require('./')

exports.$on = {
  $transform:function(){
    var str = ''
    var x = this.$x && this.$x.$val | 0
    var y = this.$y && this.$y.$val | 0
    var rotate = this.$rotate && this.$rotate.$val | 0
    var scale = this.$scale && this.$scale.$val
    var lowNr

    if(x || y){
      str += 'translate3d('
        + (x || 0) + 'px, '
        + (y || 0) + 'px, 0px)'
    }
    if(rotate){
      str += 'rotate(' + rotate + 'deg)'
    }
    if(scale !== void 0){
      lowNr = 1e-6
      if(scale < lowNr){
        scale = lowNr
      }
      str += 'scale(' + scale + ')'
    }

    console.log( scale )

    this.$node.style.transform = str
  }
}

var Transform = new Property({
  $on:{
    $change:function(event,removed){
      this.$parent.$emit('$transform',event)
    }
  }
}).$Constructor

exports.$flags = {
  /**
   * This is the shortcut for css `translateX()` transform,
   * but is applies as {@link Property.$translate3d}
   * @type {number}
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   $x: 400
   * })
   *
   */
  $x: Transform,

  /**
   * This is the shortcut for css `translateY()` transform,
   * but is applies as {@link Property.$translate3d}
   * @type {number}
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   $y: 400
   * })
   *
   */
  $y: Transform,

  /**
   * This is the shortcut for css `translateZ()` transform,
   * but is applies as {@link Property.$translate3d}
   * @type {number}
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   $z: 15
   * })
   */
  $z: Transform,

  /**
   * This is the shortcut for css `rotate()` transform
   * @type {string}
   * @memberOf Property
   * @todo it must get number instead of string
   *
   * @example
   * var a = new Element({
   *   $rotate: '30deg'
   * })
   */
  $rotate: Transform,

  /**
   * This is the shortcut for css `scaleX()` transform
   * but is applies as {@link Property.$scale}
   * @type number
   * @memberOf Property
   * @todo it can be x and y instead of only value
   *
   * @example
   * var a = new Element({
   *   $scale: 1.4
   * })
   */
  $scale: Transform
}