(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["elasticSVG"] = factory();
	else
		root["elasticSVG"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return elasticSVG; });
// v0.0.8
function elasticSVG(selector, opts) {
  opts = opts || {}; // containing DOM element, which defaults to body

  var parent = document.querySelectorAll(selector || "body");

  if (!parent || !parent.length) {
    console.log("Couldn't find a parent for elasticSVG making the selector '" + selector + "'");
    return;
  }

  parent = parent[0]; // you can specify a width if you like, or we'll snap to size of container

  var base = {
    width: typeof opts.width !== "undefined" ? opts.width : parent.clientWidth,
    scale: 1
  }; // we need to remember the original width for scaling purposes

  base.original_width = base.width; // you can either specify the height or the aspect ratio. If neither is specified, refaults to roughly the golden ratio
  // specifying the height keeps the svg at a standard height and only resizes the width
  // specifying the aspect ratio resizes both

  if (typeof opts.height !== "undefined") {
    base.height = opts.height;
    base.aspect = base.height / base.width;
  } else {
    opts.aspect = typeof opts.aspect !== "undefined" ? opts.aspect : 0.618;
    base.height = base.width * opts.aspect;
  } // create a new SVG element


  var xmlns = "http://www.w3.org/2000/svg";
  var svg = document.createElementNS(xmlns, "svg");
  svg.setAttributeNS(null, "width", base.width);
  svg.setAttributeNS(null, "height", base.height);
  parent.appendChild(svg); // setting resize to "auto" sets the viewport to the original width and height so that the SVG always scales

  if (opts.resize && opts.resize == "auto") {
    svg.setAttributeNS(null, "viewBox", "0 0 " + base.width + " " + base.height);
  } // function called when the window resizes		


  function resize() {
    console.log("resizing base");
    base.width = parent.clientWidth;
    svg.setAttributeNS(null, "width", base.width); // only resize the height if aspect was specified instead of height

    if (opts.aspect) {
      base.height = base.width * opts.aspect;
      svg.setAttributeNS(null, "height", base.height);
    }

    base.scale = base.width / base.original_width; // optional callback

    if (opts.onResize) {
      opts.onResize(base.width, base.height, base.scale);
    }
  }

  var resizeTimer; // http://stackoverflow.com/questions/3339825/what-is-the-best-practise-to-not-to-override-other-bound-functions-to-window-onr

  function addResizeEvent(func, dur) {
    var oldResize = window.onresize,
        resizeTimer,
        dur = typeof dur === "undefined" ? 100 : parseInt(dur, 10);

    window.onresize = function () {
      clearTimeout(resizeTimer);

      if (typeof oldResize === 'function') {
        oldResize();
      }

      resizeTimer = setTimeout(function () {
        func();
      }, dur);
    };
  }

  addResizeEvent(resize, 50);

  if (opts.resize && opts.resize === "auto") {
    resize(); // call this on load since sometimes the initial conditions are wider than container
  } // methods


  base.setResize = function (f) {
    opts.onResize = f;
  };

  base.changeAspect = function (aspect) {
    opts.aspect = aspect;
    base.height = base.width * opts.aspect;
    svg.setAttributeNS(null, "height", base.height);
  };

  base.changeHeight = function (height) {
    base.height = height;

    if (opts.aspect) {
      opts.aspect = base.height / base.width;
    } else {
      opts.height = height;
    }

    svg.setAttributeNS(null, "height", base.height);
  };

  base.forceResize = function () {
    resize();
  };

  base.svg = svg;
  return base;
}

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lbGFzdGljU1ZHL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9lbGFzdGljU1ZHL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2VsYXN0aWNTVkcvLi9pbmRleC5qcyJdLCJuYW1lcyI6WyJlbGFzdGljU1ZHIiwic2VsZWN0b3IiLCJvcHRzIiwicGFyZW50IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwibGVuZ3RoIiwiY29uc29sZSIsImxvZyIsImJhc2UiLCJ3aWR0aCIsImNsaWVudFdpZHRoIiwic2NhbGUiLCJvcmlnaW5hbF93aWR0aCIsImhlaWdodCIsImFzcGVjdCIsInhtbG5zIiwic3ZnIiwiY3JlYXRlRWxlbWVudE5TIiwic2V0QXR0cmlidXRlTlMiLCJhcHBlbmRDaGlsZCIsInJlc2l6ZSIsIm9uUmVzaXplIiwicmVzaXplVGltZXIiLCJhZGRSZXNpemVFdmVudCIsImZ1bmMiLCJkdXIiLCJvbGRSZXNpemUiLCJ3aW5kb3ciLCJvbnJlc2l6ZSIsInBhcnNlSW50IiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsInNldFJlc2l6ZSIsImYiLCJjaGFuZ2VBc3BlY3QiLCJjaGFuZ2VIZWlnaHQiLCJmb3JjZVJlc2l6ZSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNB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UixJQUFQO0FBQ0EsQyIsImZpbGUiOiJlbGFzdGljU1ZHLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiZWxhc3RpY1NWR1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJlbGFzdGljU1ZHXCJdID0gZmFjdG9yeSgpO1xufSkod2luZG93LCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2luZGV4LmpzXCIpO1xuIiwiLy8gdjAuMC44XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVsYXN0aWNTVkcoc2VsZWN0b3IsIG9wdHMpIHtcblx0b3B0cyA9IG9wdHMgfHwge307XG5cblx0Ly8gY29udGFpbmluZyBET00gZWxlbWVudCwgd2hpY2ggZGVmYXVsdHMgdG8gYm9keVxuXHR2YXIgcGFyZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvciB8fCBcImJvZHlcIik7XG5cblx0aWYgKCFwYXJlbnQgfHwgIXBhcmVudC5sZW5ndGgpIHtcblx0XHRjb25zb2xlLmxvZyhcIkNvdWxkbid0IGZpbmQgYSBwYXJlbnQgZm9yIGVsYXN0aWNTVkcgbWFraW5nIHRoZSBzZWxlY3RvciAnXCIgKyBzZWxlY3RvciArIFwiJ1wiKTtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRwYXJlbnQgPSBwYXJlbnRbMF07XG5cblx0Ly8geW91IGNhbiBzcGVjaWZ5IGEgd2lkdGggaWYgeW91IGxpa2UsIG9yIHdlJ2xsIHNuYXAgdG8gc2l6ZSBvZiBjb250YWluZXJcblx0dmFyIGJhc2UgPSB7XG5cdFx0d2lkdGg6IHR5cGVvZiBvcHRzLndpZHRoICE9PSBcInVuZGVmaW5lZFwiID8gb3B0cy53aWR0aCA6IHBhcmVudC5jbGllbnRXaWR0aCxcblx0XHRzY2FsZTogMVxuXHR9O1xuXG5cdC8vIHdlIG5lZWQgdG8gcmVtZW1iZXIgdGhlIG9yaWdpbmFsIHdpZHRoIGZvciBzY2FsaW5nIHB1cnBvc2VzXG5cdGJhc2Uub3JpZ2luYWxfd2lkdGggPSBiYXNlLndpZHRoO1xuXG5cdC8vIHlvdSBjYW4gZWl0aGVyIHNwZWNpZnkgdGhlIGhlaWdodCBvciB0aGUgYXNwZWN0IHJhdGlvLiBJZiBuZWl0aGVyIGlzIHNwZWNpZmllZCwgcmVmYXVsdHMgdG8gcm91Z2hseSB0aGUgZ29sZGVuIHJhdGlvXG5cdC8vIHNwZWNpZnlpbmcgdGhlIGhlaWdodCBrZWVwcyB0aGUgc3ZnIGF0IGEgc3RhbmRhcmQgaGVpZ2h0IGFuZCBvbmx5IHJlc2l6ZXMgdGhlIHdpZHRoXG5cdC8vIHNwZWNpZnlpbmcgdGhlIGFzcGVjdCByYXRpbyByZXNpemVzIGJvdGhcbiAgICBpZiAodHlwZW9mIG9wdHMuaGVpZ2h0ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgXHRiYXNlLmhlaWdodCA9IG9wdHMuaGVpZ2h0O1xuICAgIFx0YmFzZS5hc3BlY3QgPSBiYXNlLmhlaWdodCAvIGJhc2Uud2lkdGg7XG4gICAgfSBlbHNlIHtcblx0ICAgIG9wdHMuYXNwZWN0ID0gdHlwZW9mIG9wdHMuYXNwZWN0ICE9PSBcInVuZGVmaW5lZFwiID8gb3B0cy5hc3BlY3QgOiAwLjYxODtcblx0XHRiYXNlLmhlaWdodCA9IGJhc2Uud2lkdGggKiBvcHRzLmFzcGVjdDtcbiAgICB9XG5cblx0Ly8gY3JlYXRlIGEgbmV3IFNWRyBlbGVtZW50XG4gICAgdmFyIHhtbG5zID0gXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiO1xuICAgIHZhciBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoeG1sbnMsIFwic3ZnXCIpO1xuXHRzdmcuc2V0QXR0cmlidXRlTlMobnVsbCwgXCJ3aWR0aFwiLCBiYXNlLndpZHRoKTtcblx0c3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsIFwiaGVpZ2h0XCIsIGJhc2UuaGVpZ2h0KTtcblx0cGFyZW50LmFwcGVuZENoaWxkKHN2Zyk7XG5cdFxuXHQvLyBzZXR0aW5nIHJlc2l6ZSB0byBcImF1dG9cIiBzZXRzIHRoZSB2aWV3cG9ydCB0byB0aGUgb3JpZ2luYWwgd2lkdGggYW5kIGhlaWdodCBzbyB0aGF0IHRoZSBTVkcgYWx3YXlzIHNjYWxlc1xuICAgIGlmIChvcHRzLnJlc2l6ZSAmJiBvcHRzLnJlc2l6ZSA9PSBcImF1dG9cIikge1xuXHRcdHN2Zy5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcInZpZXdCb3hcIiwgXCIwIDAgXCIgKyBiYXNlLndpZHRoICsgXCIgXCIgKyBiYXNlLmhlaWdodCk7XG4gICAgfVxuXG5cdC8vIGZ1bmN0aW9uIGNhbGxlZCB3aGVuIHRoZSB3aW5kb3cgcmVzaXplc1x0XHRcblx0ZnVuY3Rpb24gcmVzaXplKCkgeyBcblx0XHRjb25zb2xlLmxvZyhcInJlc2l6aW5nIGJhc2VcIik7XG5cdFx0YmFzZS53aWR0aCA9IHBhcmVudC5jbGllbnRXaWR0aDtcblx0XHRzdmcuc2V0QXR0cmlidXRlTlMobnVsbCwgXCJ3aWR0aFwiLCBiYXNlLndpZHRoKTtcblxuXHRcdC8vIG9ubHkgcmVzaXplIHRoZSBoZWlnaHQgaWYgYXNwZWN0IHdhcyBzcGVjaWZpZWQgaW5zdGVhZCBvZiBoZWlnaHRcblx0XHRpZiAob3B0cy5hc3BlY3QpIHtcblx0XHQgICAgYmFzZS5oZWlnaHQgPSBiYXNlLndpZHRoICogb3B0cy5hc3BlY3Q7XG5cdFx0XHRzdmcuc2V0QXR0cmlidXRlTlMobnVsbCwgXCJoZWlnaHRcIiwgYmFzZS5oZWlnaHQpO1xuXHRcdH1cblxuXHQgICAgYmFzZS5zY2FsZSA9IGJhc2Uud2lkdGggLyBiYXNlLm9yaWdpbmFsX3dpZHRoO1xuXG5cdFx0Ly8gb3B0aW9uYWwgY2FsbGJhY2tcblx0XHRpZiAob3B0cy5vblJlc2l6ZSkge1xuXHRcdFx0b3B0cy5vblJlc2l6ZShiYXNlLndpZHRoLCBiYXNlLmhlaWdodCwgYmFzZS5zY2FsZSk7XG5cdFx0fVxuXHR9XG5cblx0dmFyIHJlc2l6ZVRpbWVyO1xuXG5cdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzMzOTgyNS93aGF0LWlzLXRoZS1iZXN0LXByYWN0aXNlLXRvLW5vdC10by1vdmVycmlkZS1vdGhlci1ib3VuZC1mdW5jdGlvbnMtdG8td2luZG93LW9uclxuXHRmdW5jdGlvbiBhZGRSZXNpemVFdmVudChmdW5jLCBkdXIpIHtcblx0ICAgIHZhciBvbGRSZXNpemUgPSB3aW5kb3cub25yZXNpemUsXG5cdFx0XHRyZXNpemVUaW1lcixcblx0XHRcdGR1ciA9IHR5cGVvZiBkdXIgPT09IFwidW5kZWZpbmVkXCIgPyAxMDAgOiBwYXJzZUludChkdXIsIDEwKTtcblxuXHRcdHdpbmRvdy5vbnJlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdGNsZWFyVGltZW91dChyZXNpemVUaW1lcik7XG5cblx0ICAgICAgICBpZiAodHlwZW9mIG9sZFJlc2l6ZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICAgICAgICBvbGRSZXNpemUoKTtcblx0ICAgICAgICB9XG5cblx0XHRcdHJlc2l6ZVRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0ZnVuYygpO1xuXHRcdFx0fSwgZHVyKTtcblx0XHR9XG5cdH1cblxuXHRhZGRSZXNpemVFdmVudChyZXNpemUsIDUwKTtcblxuXHRpZiAob3B0cy5yZXNpemUgJiYgb3B0cy5yZXNpemUgPT09IFwiYXV0b1wiKSB7XG5cdFx0cmVzaXplKCk7IC8vIGNhbGwgdGhpcyBvbiBsb2FkIHNpbmNlIHNvbWV0aW1lcyB0aGUgaW5pdGlhbCBjb25kaXRpb25zIGFyZSB3aWRlciB0aGFuIGNvbnRhaW5lclxuXHR9XG5cblx0Ly8gbWV0aG9kc1xuXHRiYXNlLnNldFJlc2l6ZSA9IGZ1bmN0aW9uKGYpIHtcblx0XHRvcHRzLm9uUmVzaXplID0gZjtcblx0fVxuXG5cdGJhc2UuY2hhbmdlQXNwZWN0ID0gZnVuY3Rpb24oYXNwZWN0KSB7XG5cdFx0b3B0cy5hc3BlY3QgPSBhc3BlY3Q7XG5cdFx0YmFzZS5oZWlnaHQgPSBiYXNlLndpZHRoICogb3B0cy5hc3BlY3Q7XG5cdFx0c3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsIFwiaGVpZ2h0XCIsIGJhc2UuaGVpZ2h0KTtcblx0fVxuXG5cdGJhc2UuY2hhbmdlSGVpZ2h0ID0gZnVuY3Rpb24oaGVpZ2h0KSB7XG4gICAgXHRiYXNlLmhlaWdodCA9IGhlaWdodDtcbiAgICBcdGlmIChvcHRzLmFzcGVjdCkge1xuXHQgICAgXHRvcHRzLmFzcGVjdCA9IGJhc2UuaGVpZ2h0IC8gYmFzZS53aWR0aDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICBcdG9wdHMuaGVpZ2h0ID0gaGVpZ2h0O1xuXHQgICAgfVxuXHRcdHN2Zy5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcImhlaWdodFwiLCBiYXNlLmhlaWdodCk7XG5cdH1cblxuXHRiYXNlLmZvcmNlUmVzaXplID0gZnVuY3Rpb24oKSB7XG5cdFx0cmVzaXplKCk7XG5cdH1cblxuXHRiYXNlLnN2ZyA9IHN2Zztcblx0cmV0dXJuIGJhc2U7XG59Il0sInNvdXJjZVJvb3QiOiIifQ==