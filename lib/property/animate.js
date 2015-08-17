"use strict";

var Property = require('./')

var moveAnim
function animate (duration, dest, easing, callback) {
  cancelAnimationFrame(moveAnim);

  var current = el.getBoundingClientRect(),
      distanceTop = dest.top - current.top,
      distanceLeft = dest.left - current.left,
      speedTop = distanceTop / duration,
      speedLeft = distanceLeft / duration,
      start = null;

  var moveActually = function (timestamp) {
    if (!start) start = timestamp;

    var progressInTime = timestamp - start,
        moveTo = {
          top: current.top + (speedTop * progressInTime * easing(progressInTime, duration)),
          left: current.left + (speedLeft * progressInTime * easing(progressInTime, duration))
        };

    if (progressInTime < duration) {
      translate(el, moveTo.left, moveTo.top);
      moveAnim = requestAnimationFrame(moveActually);
    } else {
      translate(el, dest.left, dest.top);
      callback();
    }
  };

  moveAnim = requestAnimationFrame(moveActually);
}

exports.$flags = {
  /**
   * CSS3 Animation with javascript callback
   * @type {object}
   * @memberOf Property
   *
   * @example
   * var a = new Element( {
   *   $css : "teste",
   *   $x: 100,
   *   $y: 200,
   *
   *   $animate:{
   *     $duration:600,
   *     $x: 500,
   *     $y: 600,
   *     $opacity: 0.2,
   *     $easing: 'easeInOut',
   *     $time: 600
   *   }
   * })
   *
   */

  $animate: new Property({
    $on: {
      $change: function( event, removed ) {
        var $element = this.$parent
        var $node = $element.$node
        var $val = this.$val

        var $x = this.$x ? this.$x.$val : 0
        var $y = this.$y ? this.$y.$val : 0
        var $opacity = this.$opacity ? this.$opacity.$val : 0
        var $easing = this.$easing ? this.$easing.$val : 0
        var $time = this.$time ? this.$time.$val : 0
        var $delay = this.$delay ? this.$delay.$val : 0
        var $callback = this.$callback ? this.$callback.$val : 0

        if($delay) {
          console.log('animate delayed', $delay)
        }
        else {
          console.log('animate imediately')
        }
      }
    }
  })
}