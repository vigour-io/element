"use strict";

var Property = require('./')
var ua = require('../ua')
var prefix = ua.prefix
var ease = require('../animation/easing')

var Element = require( '../element' )
Element.prototype.inject(
  require( '../../lib/property/transform' ),
  require( '../../lib/property/opacity' ),
  require( '../../lib/property/transition' )
)

var moveAnim
var stamp

function animate (event, $settings) {
  var $element = this
  var $node = $element.$node

  var duration = $settings.$duration
  var easing = $settings.$easing
  var callback = $settings.$callback
  var delay = $settings.$delay

  console.log($settings)

  if ($settings.$css3) {
    easing = easing.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    duration += 'ms'
    delay += 'ms'

    //TODO: don't always set all props
    $element.set({
      $transition: duration + ' ' + easing + ' all ' + delay,
      $x: $settings.$x,
      $y: $settings.$y,
      $opacity: $settings.$opacity
    })

    // BUG: fires several times or causes infinite loop with css
    if (stamp !== event.$stamp) {
      $node.addEventListener(prefix + 'TransitionEnd', function () {
        $element.set({
          $transition: ''
        })

        callback.call($element, event)
      }, false)
    } else {
      stamp = event.$stamp
    }

    console.log(duration + ' ' + easing + ' all ' + delay)

    return void 0
  }

  window.cancelAnimationFrame(moveAnim)

  var start = {
    x: $element.$x ? $element.$x.$val : 0,
    y: $element.$y ? $element.$y.$val : 0,
    opacity: $element.$opacity ? $element.$opacity.$val : 1
  }

  var speed = {
    x: ($settings.$x - start.x) / duration,
    y: ($settings.$y - start.y) / duration,
    opacity: ($settings.$opacity - start.opacity) / duration
  }

  var start = null

  function action (timestamp) {
    if (!start) start = timestamp;

    var progressTime = timestamp - start
    var frameTime = progressTime * ease[easing](progressTime, duration)

    // move to special frame point
    var current = {
      x: start.x + (speed.x * frameTime),
      y: start.y + (speed.y * frameTime),
      opacity: start.opacity + (speed.opacity * frameTime)
    };

    console.log('moveTo',moveTo)

    $element.set({
      $x: current.x,
      $y: current.y,
      $opacity: current.opacity
    })

    if (progressTime < duration) {
      moveAnim = window.requestAnimationFrame(action);
    } else {
      if( callback ) {
        callback.call( $element, event )
      }
    }
  }

  if ( delay ){
    console.info('animation delayed for', delay, 'ms')
  }

  setTimeout(function() {
    moveAnim = window.requestAnimationFrame(action);
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
          $x: this.$x ? this.$x.$val : ($element.$x ? $element.$x.$val : 0),

          /**
           * Animate element on `y` axis.
           * @type {number}
           * @memberOf Property.$animate
           */
          $y: this.$y ? this.$y.$val : ($element.$y ? $element.$y.$val : 0),

          /**
           * Animate element's opacity.
           * @type {number}
           * @default 1
           * @memberOf Property.$animate
           */
          $opacity: this.$opacity ? this.$opacity.$val : ($element.$opacity ? $element.$opacity.$val : 1),

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
           * Animation's delay **before** starting new action.
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

        animate.call($element, event, $settings)

        this.set(null, event)
      }
    }
  })
}