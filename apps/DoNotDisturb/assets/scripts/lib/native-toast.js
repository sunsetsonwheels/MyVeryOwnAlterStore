(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.nativeToast = factory());
}(this, (function () { 'use strict';

  /*!
   * nano-assign v1.0.0
   * (c) 2017-present egoist <0x142857@gmail.com>
   * Released under the MIT License.
   */

  var index = function(obj) {
    var arguments$1 = arguments;

    for (var i = 1; i < arguments.length; i++) {
      // eslint-disable-next-line guard-for-in, prefer-rest-params
      for (var p in arguments[i]) { obj[p] = arguments$1[i][p]; }
    }
    return obj
  };

  var nanoAssign_common = index;

  var prevToast = null;

  var Toast = function Toast(ref) {
    var this$1 = this;
    if ( ref === void 0 ) ref = {};
    var message = ref.message; if ( message === void 0 ) message = '';
    var position = ref.position; if ( position === void 0 ) position = 'north';
    var timeout = ref.timeout; if ( timeout === void 0 ) timeout = 3000;
    var el = ref.el; if ( el === void 0 ) el = document.body;
    var rounded = ref.rounded; if ( rounded === void 0 ) rounded = false;
    var type = ref.type; if ( type === void 0 ) type = '';
    var debug = ref.debug; if ( debug === void 0 ) debug = false;
    var edge = ref.edge; if ( edge === void 0 ) edge = false;
    var closeOnClick = ref.closeOnClick; if ( closeOnClick === void 0 ) closeOnClick = false;
    var elements = ref.elements; if ( elements === void 0 ) elements = [];

    if (prevToast) {
      prevToast.destroy();
    }

    this.message = message;
    this.position = position;
    this.el = el;
    this.timeout = timeout;
    this.closeOnClick = closeOnClick;
    this.toast = document.createElement('div');
    this.toast.className = "native-toast native-toast-" + (this.position);

    if (type) {
      this.toast.className += " native-toast-" + type;
    }

    var messageElement = document.createElement('div');
    messageElement.className = 'native-toast-message';
    messageElement.innerHTML = this.message;
    [messageElement ].concat( elements).forEach(function (el) {
      this$1.toast.appendChild(el);
    });
    var isMobile = document.body.clientWidth < 768;

    if (edge || isMobile) {
      this.toast.className += ' native-toast-edge';
    } else if (rounded) {
      this.toast.style.borderRadius = '33px';
    }

    this.el.appendChild(this.toast);
    prevToast = this;
    this.show();

    if (!debug && timeout) {
      this.hide();
    }

    if (this.closeOnClick) {
      this.toast.addEventListener('click', function () {
        this$1.destroy();
      });
    }
  };

  Toast.prototype.show = function show () {
      var this$1 = this;

    setTimeout(function () {
      this$1.toast.classList.add('native-toast-shown');
    }, 300);
  };

  Toast.prototype.hide = function hide () {
      var this$1 = this;

    setTimeout(function () {
      this$1.destroy();
    }, this.timeout);
  };

  Toast.prototype.destroy = function destroy () {
      var this$1 = this;

    if (!this.toast) { return; }
    this.toast.classList.remove('native-toast-shown');
    setTimeout(function () {
      if (this$1.toast) {
        this$1.el.removeChild(this$1.toast);
        this$1.toast = null;
      }
    }, 300);
  };

  function toast(options) {
    return new Toast(options);
  }

  var loop = function () {
    toast[type] = function (options) { return toast(nanoAssign_common({
      type: type
    }, options)); };
  };

  for (var type of ['success', 'info', 'warning', 'error']) loop();

  return toast;

})));