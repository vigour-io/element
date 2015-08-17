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
   * CSS3 Animation with JavaScript fallback
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
   */

  $animate: new Property({
    $on: {
      $change: function( event, removed ) {
        var $element = this.$parent
        var $node = $element.$node
        var $val = this.$val

        var $settings = {

          /**
           * Prevent `CSS3` usage. Setting it by false will directly use
           * JavaScript animation. If true, `CSS3` transition will be
           * **primary** and the secondary will be JavaScript, as a fallback.
           * @type {boolean}
           * @default true
           * @memberOf Property.$animate
           */
          $css3: this.$css3 ? this.$css3.$val : true,

          /**
           * Animate element on `x` axis.
           * @type {number}
           * @memberOf Property.$animate
           */
          $x: this.$x ? this.$x.$val : 0,

          /**
           * Animate element on `y` axis.
           * @type {number}
           * @memberOf Property.$animate
           */
          $y: this.$y ? this.$y.$val : 0,

          /**
           * Animate element's opacity.
           * @type {number}
           * @default 1
           * @memberOf Property.$animate
           */
          $opacity: this.$opacity ? this.$opacity.$val : 1,

          /**
           * Animation's timing function.
           * @type {string}
           * @default linear
           * @memberOf Property.$animate
           */
          $easing: this.$easing ? this.$easing.$val : 'linear',

          /**
           * Animation's duration in milliseconds.
           * @type {number}
           * @default 400
           * @memberOf Property.$animate
           */
          $duration: this.$duration ? this.$duration.$val : 400,

          /**
           * Animation's delay **before** starging new action.
           * @type {number}
           * @default 0
           * @memberOf Property.$animate
           */
          $delay: this.$delay ? this.$delay.$val : 0,

          /**
           * Callback, which is fired after animation ends.
           * @type {function}
           * @memberOf Property.$animate
           */
          $callback: this.$callback ? this.$callback._$val : void 0
        }

        animate.call($element, event, $element, $settings)

        this.set(null, event)
      }
    }
  })
}