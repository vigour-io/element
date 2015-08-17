"use strict";

var Property = require('./')
var ua = require('../ua')
var prefix = ua.prefix
var ease = require('./easing')

var moveAnim
function animate (event, $element, $settings) {
  var $element = this
  var $node = $element.$node

  var duration = $settings.$duration
  var easing = $settings.$easing
  var callback = $settings.$callback
  var delay = $settings.$delay

  if ($settings.$css3) {
    easing = easing.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    duration += 'ms'
    delay += 'ms'

    $element.set({
      $transition: duration + ' ' + easing + ' all ' + delay,
      $x: $settings.$x,
      $y: $settings.$y,
      $opacity: $settings.$opacity
    })

    // BUG: fires several times
    $node.addEventListener(prefix + 'TransitionEnd', callback, false);

    console.log(duration + ' ' + easing + ' all ' + delay)

    return void 0
  }

  cancelAnimationFrame(moveAnim)

  var current = {
    x: $element.$x ? $element.$x.$val : 0,
    y: $element.$y ? $element.$y.$val : 0,
    opacity: $element.$opacity ? $element.$opacity.$val : 1
  }

  var distance = {
    x: $settings.$x - current.x,
    y: $settings.$y - current.y,
    opacity: $settings.$opacity - current.opacity
  }

  var speed = {
    x: distance.x / duration,
    y: distance.y / duration,
    opacity: distance.opacity / duration
  }

  var start = null

  var moveAction = function (timestamp) {
    if (!start) start = timestamp;

    var progressTime = timestamp - start
    var frameTime = progressTime * ease[easing](progressTime, duration)

    // move to special frame point
    var moveTo = {
      x: current.x + (speed.x * frameTime),
      y: current.y + (speed.y * frameTime),
      opacity: current.opacity + (speed.opacity * frameTime)
    };

    $element.set({
      $x: moveTo.x,
      $y: moveTo.y,
      $opacity: moveTo.opacity
    })

    if (progressTime < duration) {
      moveAnim = requestAnimationFrame(moveAction);
    } else {
      if(callback) {
        callback.call($element, event)
      }
    }
  }

  if (delay)
    console.info('animation delayed for', delay, 'ms')

  setTimeout(function() {
    moveAnim = requestAnimationFrame(moveAction);
  }, delay)
}

exports.$flags = {
  /**
   * CSS3 Animation with javascript callback
   * @type {object}
   * @memberOf Property
   *
   * @example
   * var a = new Element( {
   *   $x: 100,
   *   $y: 200,
   *
   *   $animate: {
   *     $css3: false,
   *     $x: 500,
   *     $y: 600,
   *     $opacity: 0.2,
   *     $easing: 'easeInOut',
   *     $duration: 600,
   *     $delay: 1200
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

        var $settings = {
          $x: this.$x ? this.$x.$val : 0,
          $y: this.$y ? this.$y.$val : 0,
          $css3: this.$css3 ? this.$css3.$val : true,
          $opacity: this.$opacity ? this.$opacity.$val : 1,
          $easing: this.$easing ? this.$easing.$val : 'linear',
          $duration: this.$duration ? this.$duration.$val : 400,
          $delay: this.$delay ? this.$delay.$val : 0,
          $callback: this.$callback ? this.$callback._$val : void 0
        }

        animate.call($element, event, $element, $settings)

        this.set(null, event)
      }
    }
  })
}