var elasticSVG =
/******/ (function(modules) { // webpackBootstrap
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
  opts = opts || {};
  var hasWidth = opts.hasOwnProperty("width");
  var hasHeight = opts.hasOwnProperty("height");
  var hasAspect = opts.hasOwnProperty("aspect"); // containing DOM element, which defaults to body

  var parent = document.querySelectorAll(selector || "body");

  if (!parent || !parent.length) {
    console.log("Couldn't find a parent for elasticSVG making the selector '" + selector + "'");
    return;
  }

  parent = parent[0];
  var initialWidth = parent.clientWidth; // you can specify a width if you like, or we'll snap to size of container

  var base = {
    width: null,
    height: null,
    aspect: null,
    scale: 1
  }; // we need to remember the original width for scaling purposes
  // you can either specify the height and width, which will computed the aspect ration, or one of these and the aspect ratio.
  // If neither is specified, defaults to roughly the golden ratio
  // specifying the height keeps the svg at a standard height and only resizes the width
  // specifying the aspect ratio resizes both

  if (hasWidth && hasHeight) {
    if (hasAspect) {
      console.log("Overriding aspect ratio since both `width` and `height` are specified");
      opts.aspect = opts.height / opts.width;
    }

    base.width = opts.width;
    base.height = opts.height;
  } else {
    // if has neither an aspect or BOTH a width and height, default to approximately the golden ratio
    opts.aspect = opts.aspect || 0.618;

    if (hasWidth && !hasHeight) {
      base.width = opts.width;
      base.height = base.width * opts.aspect;
    } else if (hasHeight) {
      base.height = opts.height;
      base.width = base.height / opts.aspect;
    } else {
      // if only has aspect
      base.width = initialWidth;
      base.height = base.width * opts.aspect;
    }
  }

  base.original_width = base.width; // create a new SVG element

  var xmlns = "http://www.w3.org/2000/svg";
  var svg = document.createElementNS(xmlns, "svg");
  svg.setAttributeNS(null, "width", base.width);
  svg.setAttributeNS(null, "height", base.height);
  parent.appendChild(svg); // setting resize to "auto" sets the viewport to the original width and height so that the SVG always scales

  if (opts.resize && opts.resize == "auto") {
    svg.setAttributeNS(null, "viewBox", "0 0 " + base.width + " " + base.height);
  } // function called when the window resizes		


  function resize() {
    var hasWidth = opts.hasOwnProperty("width");
    var hasHeight = opts.hasOwnProperty("height");
    var hasAspect = opts.hasOwnProperty("aspect");
    base.width = parent.clientWidth;
    svg.setAttributeNS(null, "width", base.width); // if `height` is not specified, resize it to the aspect ratio

    if (!hasHeight) {
      base.height = base.width * opts.aspect;
      svg.setAttributeNS(null, "height", base.height);
    }

    base.aspect = base.height / base.width;
    base.scale = base.width / base.original_width; // optional callback

    if (opts.onResize) {
      opts.onResize(base.width, base.height, base.scale, svg);
    }
  }

  window.addEventListener("resize", function () {
    resize();
  }); // manually trigger a page resize and run the resize function once

  window.dispatchEvent(new Event('resize')); // resize(); // call this on load since sometimes the initial conditions are wider than container
  // methods

  base.setResize = function (f) {
    opts.onResize = f;
  };

  base.changeAspect = function (aspect) {
    opts.aspect = aspect;
    base.height = base.width * opts.aspect;
    svg.setAttributeNS(null, "height", base.height);
  };
  /*
  base.changeWidth = function(width) {
     	base.width = width;
     	if (opts.aspect) {
      	opts.aspect = base.height / base.width;
      } else {
      	opts.width = width;
      }
  	svg.setAttributeNS(null, "width", base.width);
  }
  */


  base.changeHeight = function (height) {
    base.height = height;

    if (opts.aspect) {
      opts.aspect = base.height / base.width;
    } else {
      opts.height = height;
    }

    svg.setAttributeNS(null, "height", base.height);
  };

  base.triggerResize = function () {
    resize();
  };

  base.svg = svg;
  return base;
}

/***/ })

/******/ })["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lbGFzdGljU1ZHL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2VsYXN0aWNTVkcvLi9pbmRleC5qcyJdLCJuYW1lcyI6WyJlbGFzdGljU1ZHIiwic2VsZWN0b3IiLCJvcHRzIiwiaGFzV2lkdGgiLCJoYXNPd25Qcm9wZXJ0eSIsImhhc0hlaWdodCIsImhhc0FzcGVjdCIsInBhcmVudCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImxlbmd0aCIsImNvbnNvbGUiLCJsb2ciLCJpbml0aWFsV2lkdGgiLCJjbGllbnRXaWR0aCIsImJhc2UiLCJ3aWR0aCIsImhlaWdodCIsImFzcGVjdCIsInNjYWxlIiwib3JpZ2luYWxfd2lkdGgiLCJ4bWxucyIsInN2ZyIsImNyZWF0ZUVsZW1lbnROUyIsInNldEF0dHJpYnV0ZU5TIiwiYXBwZW5kQ2hpbGQiLCJyZXNpemUiLCJvblJlc2l6ZSIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJkaXNwYXRjaEV2ZW50IiwiRXZlbnQiLCJzZXRSZXNpemUiLCJmIiwiY2hhbmdlQXNwZWN0IiwiY2hhbmdlSGVpZ2h0IiwidHJpZ2dlclJlc2l6ZSJdLCJtYXBwaW5ncyI6Ijs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FB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QUFJLENBQUNFLE1BQUwsR0FBY0YsSUFBSSxDQUFDQyxLQUFqQztBQUNBLEtBRkQsTUFFTztBQUNOZCxVQUFJLENBQUNlLE1BQUwsR0FBY0EsTUFBZDtBQUNBOztBQUNKSyxPQUFHLENBQUNFLGNBQUosQ0FBbUIsSUFBbkIsRUFBeUIsUUFBekIsRUFBbUNULElBQUksQ0FBQ0UsTUFBeEM7QUFDQSxHQVJEOztBQVVBRixNQUFJLENBQUNxQixhQUFMLEdBQXFCLFlBQVc7QUFDL0JWLFVBQU07QUFDTixHQUZEOztBQUlBWCxNQUFJLENBQUNPLEdBQUwsR0FBV0EsR0FBWDtBQUNBLFNBQU9QLElBQVA7QUFDQSxDIiwiZmlsZSI6ImVsYXN0aWNTVkcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2luZGV4LmpzXCIpO1xuIiwiLy8gdjAuMC44XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVsYXN0aWNTVkcoc2VsZWN0b3IsIG9wdHMpIHtcblx0b3B0cyA9IG9wdHMgfHwge307XG5cblx0bGV0IGhhc1dpZHRoID0gb3B0cy5oYXNPd25Qcm9wZXJ0eShcIndpZHRoXCIpO1xuXHRsZXQgaGFzSGVpZ2h0ID0gb3B0cy5oYXNPd25Qcm9wZXJ0eShcImhlaWdodFwiKTtcblx0bGV0IGhhc0FzcGVjdCA9IG9wdHMuaGFzT3duUHJvcGVydHkoXCJhc3BlY3RcIik7XG5cblx0Ly8gY29udGFpbmluZyBET00gZWxlbWVudCwgd2hpY2ggZGVmYXVsdHMgdG8gYm9keVxuXHR2YXIgcGFyZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvciB8fCBcImJvZHlcIik7XG5cblx0aWYgKCFwYXJlbnQgfHwgIXBhcmVudC5sZW5ndGgpIHtcblx0XHRjb25zb2xlLmxvZyhcIkNvdWxkbid0IGZpbmQgYSBwYXJlbnQgZm9yIGVsYXN0aWNTVkcgbWFraW5nIHRoZSBzZWxlY3RvciAnXCIgKyBzZWxlY3RvciArIFwiJ1wiKTtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRwYXJlbnQgPSBwYXJlbnRbMF07XG5cblx0bGV0IGluaXRpYWxXaWR0aCA9IHBhcmVudC5jbGllbnRXaWR0aDtcblxuXHQvLyB5b3UgY2FuIHNwZWNpZnkgYSB3aWR0aCBpZiB5b3UgbGlrZSwgb3Igd2UnbGwgc25hcCB0byBzaXplIG9mIGNvbnRhaW5lclxuXHR2YXIgYmFzZSA9IHtcblx0XHR3aWR0aDogbnVsbCxcblx0XHRoZWlnaHQ6IG51bGwsXG5cdFx0YXNwZWN0OiBudWxsLFxuXHRcdHNjYWxlOiAxXG5cdH07XG5cblx0Ly8gd2UgbmVlZCB0byByZW1lbWJlciB0aGUgb3JpZ2luYWwgd2lkdGggZm9yIHNjYWxpbmcgcHVycG9zZXNcblxuXHQvLyB5b3UgY2FuIGVpdGhlciBzcGVjaWZ5IHRoZSBoZWlnaHQgYW5kIHdpZHRoLCB3aGljaCB3aWxsIGNvbXB1dGVkIHRoZSBhc3BlY3QgcmF0aW9uLCBvciBvbmUgb2YgdGhlc2UgYW5kIHRoZSBhc3BlY3QgcmF0aW8uXG5cdC8vIElmIG5laXRoZXIgaXMgc3BlY2lmaWVkLCBkZWZhdWx0cyB0byByb3VnaGx5IHRoZSBnb2xkZW4gcmF0aW9cblx0Ly8gc3BlY2lmeWluZyB0aGUgaGVpZ2h0IGtlZXBzIHRoZSBzdmcgYXQgYSBzdGFuZGFyZCBoZWlnaHQgYW5kIG9ubHkgcmVzaXplcyB0aGUgd2lkdGhcblx0Ly8gc3BlY2lmeWluZyB0aGUgYXNwZWN0IHJhdGlvIHJlc2l6ZXMgYm90aFxuXG5cdGlmIChoYXNXaWR0aCAmJiBoYXNIZWlnaHQpIHtcblx0XHRpZiAoaGFzQXNwZWN0KSB7XG5cdFx0XHRjb25zb2xlLmxvZyhcIk92ZXJyaWRpbmcgYXNwZWN0IHJhdGlvIHNpbmNlIGJvdGggYHdpZHRoYCBhbmQgYGhlaWdodGAgYXJlIHNwZWNpZmllZFwiKTtcblx0XHRcdG9wdHMuYXNwZWN0ID0gb3B0cy5oZWlnaHQgLyBvcHRzLndpZHRoO1xuXHRcdH1cblx0XHRiYXNlLndpZHRoID0gb3B0cy53aWR0aDsgXG5cdFx0YmFzZS5oZWlnaHQgPSBvcHRzLmhlaWdodDsgXG5cdH0gZWxzZSB7IC8vIGlmIGhhcyBuZWl0aGVyIGFuIGFzcGVjdCBvciBCT1RIIGEgd2lkdGggYW5kIGhlaWdodCwgZGVmYXVsdCB0byBhcHByb3hpbWF0ZWx5IHRoZSBnb2xkZW4gcmF0aW9cblx0ICAgIG9wdHMuYXNwZWN0ID0gb3B0cy5hc3BlY3QgfHwgMC42MTg7XG5cblx0XHRpZiAoaGFzV2lkdGggJiYgIWhhc0hlaWdodCkge1xuXHRcdFx0YmFzZS53aWR0aCA9IG9wdHMud2lkdGg7IFxuXHRcdFx0YmFzZS5oZWlnaHQgPSBiYXNlLndpZHRoICogb3B0cy5hc3BlY3Q7XG5cdFx0fSBlbHNlIGlmIChoYXNIZWlnaHQpIHtcblx0XHRcdGJhc2UuaGVpZ2h0ID0gb3B0cy5oZWlnaHQ7XG5cdFx0XHRiYXNlLndpZHRoID0gYmFzZS5oZWlnaHQgLyBvcHRzLmFzcGVjdDtcblx0XHR9IGVsc2UgeyAvLyBpZiBvbmx5IGhhcyBhc3BlY3Rcblx0XHRcdGJhc2Uud2lkdGggPSBpbml0aWFsV2lkdGg7XG5cdFx0XHRiYXNlLmhlaWdodCA9IGJhc2Uud2lkdGggKiBvcHRzLmFzcGVjdDtcblx0XHR9XG5cdH1cblxuXHRiYXNlLm9yaWdpbmFsX3dpZHRoID0gYmFzZS53aWR0aDtcblxuXG5cdC8vIGNyZWF0ZSBhIG5ldyBTVkcgZWxlbWVudFxuICAgIHZhciB4bWxucyA9IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIjtcbiAgICB2YXIgc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKHhtbG5zLCBcInN2Z1wiKTtcblx0c3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsIFwid2lkdGhcIiwgYmFzZS53aWR0aCk7XG5cdHN2Zy5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcImhlaWdodFwiLCBiYXNlLmhlaWdodCk7XG5cdHBhcmVudC5hcHBlbmRDaGlsZChzdmcpO1xuXHRcblx0Ly8gc2V0dGluZyByZXNpemUgdG8gXCJhdXRvXCIgc2V0cyB0aGUgdmlld3BvcnQgdG8gdGhlIG9yaWdpbmFsIHdpZHRoIGFuZCBoZWlnaHQgc28gdGhhdCB0aGUgU1ZHIGFsd2F5cyBzY2FsZXNcbiAgICBpZiAob3B0cy5yZXNpemUgJiYgb3B0cy5yZXNpemUgPT0gXCJhdXRvXCIpIHtcblx0XHRzdmcuc2V0QXR0cmlidXRlTlMobnVsbCwgXCJ2aWV3Qm94XCIsIFwiMCAwIFwiICsgYmFzZS53aWR0aCArIFwiIFwiICsgYmFzZS5oZWlnaHQpO1xuICAgIH1cblxuXHQvLyBmdW5jdGlvbiBjYWxsZWQgd2hlbiB0aGUgd2luZG93IHJlc2l6ZXNcdFx0XG5cdGZ1bmN0aW9uIHJlc2l6ZSgpIHsgXG5cdFx0bGV0IGhhc1dpZHRoID0gb3B0cy5oYXNPd25Qcm9wZXJ0eShcIndpZHRoXCIpO1xuXHRcdGxldCBoYXNIZWlnaHQgPSBvcHRzLmhhc093blByb3BlcnR5KFwiaGVpZ2h0XCIpO1xuXHRcdGxldCBoYXNBc3BlY3QgPSBvcHRzLmhhc093blByb3BlcnR5KFwiYXNwZWN0XCIpO1xuXG5cdFx0YmFzZS53aWR0aCA9IHBhcmVudC5jbGllbnRXaWR0aDtcblx0XHRzdmcuc2V0QXR0cmlidXRlTlMobnVsbCwgXCJ3aWR0aFwiLCBiYXNlLndpZHRoKTtcblx0XHRcblx0XHQvLyBpZiBgaGVpZ2h0YCBpcyBub3Qgc3BlY2lmaWVkLCByZXNpemUgaXQgdG8gdGhlIGFzcGVjdCByYXRpb1xuXHRcdGlmICghaGFzSGVpZ2h0KSB7XG5cdFx0XHRiYXNlLmhlaWdodCA9IGJhc2Uud2lkdGggKiBvcHRzLmFzcGVjdDtcblx0XHRcdHN2Zy5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcImhlaWdodFwiLCBiYXNlLmhlaWdodCk7XHRcdFx0XHRcblx0XHR9XG5cblx0XHRiYXNlLmFzcGVjdCA9IGJhc2UuaGVpZ2h0IC8gYmFzZS53aWR0aDtcblx0ICAgIGJhc2Uuc2NhbGUgPSBiYXNlLndpZHRoIC8gYmFzZS5vcmlnaW5hbF93aWR0aDtcblxuXHRcdC8vIG9wdGlvbmFsIGNhbGxiYWNrXG5cdFx0aWYgKG9wdHMub25SZXNpemUpIHtcblx0XHRcdG9wdHMub25SZXNpemUoYmFzZS53aWR0aCwgYmFzZS5oZWlnaHQsIGJhc2Uuc2NhbGUsIHN2Zyk7XG5cdFx0fVxuXHR9XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgZnVuY3Rpb24oKSB7XG5cdFx0cmVzaXplKCk7XG5cdH0pO1xuXG5cdC8vIG1hbnVhbGx5IHRyaWdnZXIgYSBwYWdlIHJlc2l6ZSBhbmQgcnVuIHRoZSByZXNpemUgZnVuY3Rpb24gb25jZVxuXHR3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ3Jlc2l6ZScpKTtcblxuXHQvLyByZXNpemUoKTsgLy8gY2FsbCB0aGlzIG9uIGxvYWQgc2luY2Ugc29tZXRpbWVzIHRoZSBpbml0aWFsIGNvbmRpdGlvbnMgYXJlIHdpZGVyIHRoYW4gY29udGFpbmVyXG5cblx0Ly8gbWV0aG9kc1xuXHRiYXNlLnNldFJlc2l6ZSA9IGZ1bmN0aW9uKGYpIHtcblx0XHRvcHRzLm9uUmVzaXplID0gZjtcblx0fVxuXG5cdGJhc2UuY2hhbmdlQXNwZWN0ID0gZnVuY3Rpb24oYXNwZWN0KSB7XG5cdFx0b3B0cy5hc3BlY3QgPSBhc3BlY3Q7XG5cdFx0YmFzZS5oZWlnaHQgPSBiYXNlLndpZHRoICogb3B0cy5hc3BlY3Q7XG5cdFx0c3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsIFwiaGVpZ2h0XCIsIGJhc2UuaGVpZ2h0KTtcblx0fVxuXG5cdC8qXG5cdGJhc2UuY2hhbmdlV2lkdGggPSBmdW5jdGlvbih3aWR0aCkge1xuICAgIFx0YmFzZS53aWR0aCA9IHdpZHRoO1xuICAgIFx0aWYgKG9wdHMuYXNwZWN0KSB7XG5cdCAgICBcdG9wdHMuYXNwZWN0ID0gYmFzZS5oZWlnaHQgLyBiYXNlLndpZHRoO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgIFx0b3B0cy53aWR0aCA9IHdpZHRoO1xuXHQgICAgfVxuXHRcdHN2Zy5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcIndpZHRoXCIsIGJhc2Uud2lkdGgpO1xuXHR9XG5cdCovXG5cblx0YmFzZS5jaGFuZ2VIZWlnaHQgPSBmdW5jdGlvbihoZWlnaHQpIHtcbiAgICBcdGJhc2UuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIFx0aWYgKG9wdHMuYXNwZWN0KSB7XG5cdCAgICBcdG9wdHMuYXNwZWN0ID0gYmFzZS5oZWlnaHQgLyBiYXNlLndpZHRoO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgIFx0b3B0cy5oZWlnaHQgPSBoZWlnaHQ7XG5cdCAgICB9XG5cdFx0c3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsIFwiaGVpZ2h0XCIsIGJhc2UuaGVpZ2h0KTtcblx0fVxuXG5cdGJhc2UudHJpZ2dlclJlc2l6ZSA9IGZ1bmN0aW9uKCkge1xuXHRcdHJlc2l6ZSgpO1xuXHR9XG5cblx0YmFzZS5zdmcgPSBzdmc7XG5cdHJldHVybiBiYXNlO1xufSJdLCJzb3VyY2VSb290IjoiIn0=