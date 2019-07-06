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
      opts.onResize(base.width, base.height, base.scale, svg);
    }
  }

  window.addEventListener("resize", function () {
    resize();
  });
  resize(); // call this on load since sometimes the initial conditions are wider than container
  // methods

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

  base.triggerResize = function () {
    resize();
  };

  base.svg = svg;
  return base;
}

/***/ })

/******/ })["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lbGFzdGljU1ZHL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2VsYXN0aWNTVkcvLi9pbmRleC5qcyJdLCJuYW1lcyI6WyJlbGFzdGljU1ZHIiwic2VsZWN0b3IiLCJvcHRzIiwicGFyZW50IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwibGVuZ3RoIiwiY29uc29sZSIsImxvZyIsImJhc2UiLCJ3aWR0aCIsImNsaWVudFdpZHRoIiwic2NhbGUiLCJvcmlnaW5hbF93aWR0aCIsImhlaWdodCIsImFzcGVjdCIsInhtbG5zIiwic3ZnIiwiY3JlYXRlRWxlbWVudE5TIiwic2V0QXR0cmlidXRlTlMiLCJhcHBlbmRDaGlsZCIsInJlc2l6ZSIsIm9uUmVzaXplIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsInNldFJlc2l6ZSIsImYiLCJjaGFuZ2VBc3BlY3QiLCJjaGFuZ2VIZWlnaHQiLCJ0cmlnZ2VyUmVzaXplIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FB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QUksQ0FBQ1ksTUFBTCxHQUFjQSxNQUFkO0FBQ0E7O0FBQ0pHLE9BQUcsQ0FBQ0UsY0FBSixDQUFtQixJQUFuQixFQUF5QixRQUF6QixFQUFtQ1YsSUFBSSxDQUFDSyxNQUF4QztBQUNBLEdBUkQ7O0FBVUFMLE1BQUksQ0FBQ29CLGFBQUwsR0FBcUIsWUFBVztBQUMvQlIsVUFBTTtBQUNOLEdBRkQ7O0FBSUFaLE1BQUksQ0FBQ1EsR0FBTCxHQUFXQSxHQUFYO0FBQ0EsU0FBT1IsSUFBUDtBQUNBLEMiLCJmaWxlIjoiZWxhc3RpY1NWRy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vaW5kZXguanNcIik7XG4iLCIvLyB2MC4wLjhcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZWxhc3RpY1NWRyhzZWxlY3Rvciwgb3B0cykge1xuXHRvcHRzID0gb3B0cyB8fCB7fTtcblxuXHQvLyBjb250YWluaW5nIERPTSBlbGVtZW50LCB3aGljaCBkZWZhdWx0cyB0byBib2R5XG5cdHZhciBwYXJlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yIHx8IFwiYm9keVwiKTtcblxuXHRpZiAoIXBhcmVudCB8fCAhcGFyZW50Lmxlbmd0aCkge1xuXHRcdGNvbnNvbGUubG9nKFwiQ291bGRuJ3QgZmluZCBhIHBhcmVudCBmb3IgZWxhc3RpY1NWRyBtYWtpbmcgdGhlIHNlbGVjdG9yICdcIiArIHNlbGVjdG9yICsgXCInXCIpO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdHBhcmVudCA9IHBhcmVudFswXTtcblxuXHQvLyB5b3UgY2FuIHNwZWNpZnkgYSB3aWR0aCBpZiB5b3UgbGlrZSwgb3Igd2UnbGwgc25hcCB0byBzaXplIG9mIGNvbnRhaW5lclxuXHR2YXIgYmFzZSA9IHtcblx0XHR3aWR0aDogdHlwZW9mIG9wdHMud2lkdGggIT09IFwidW5kZWZpbmVkXCIgPyBvcHRzLndpZHRoIDogcGFyZW50LmNsaWVudFdpZHRoLFxuXHRcdHNjYWxlOiAxXG5cdH07XG5cblx0Ly8gd2UgbmVlZCB0byByZW1lbWJlciB0aGUgb3JpZ2luYWwgd2lkdGggZm9yIHNjYWxpbmcgcHVycG9zZXNcblx0YmFzZS5vcmlnaW5hbF93aWR0aCA9IGJhc2Uud2lkdGg7XG5cblx0Ly8geW91IGNhbiBlaXRoZXIgc3BlY2lmeSB0aGUgaGVpZ2h0IG9yIHRoZSBhc3BlY3QgcmF0aW8uIElmIG5laXRoZXIgaXMgc3BlY2lmaWVkLCByZWZhdWx0cyB0byByb3VnaGx5IHRoZSBnb2xkZW4gcmF0aW9cblx0Ly8gc3BlY2lmeWluZyB0aGUgaGVpZ2h0IGtlZXBzIHRoZSBzdmcgYXQgYSBzdGFuZGFyZCBoZWlnaHQgYW5kIG9ubHkgcmVzaXplcyB0aGUgd2lkdGhcblx0Ly8gc3BlY2lmeWluZyB0aGUgYXNwZWN0IHJhdGlvIHJlc2l6ZXMgYm90aFxuICAgIGlmICh0eXBlb2Ygb3B0cy5oZWlnaHQgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBcdGJhc2UuaGVpZ2h0ID0gb3B0cy5oZWlnaHQ7XG4gICAgXHRiYXNlLmFzcGVjdCA9IGJhc2UuaGVpZ2h0IC8gYmFzZS53aWR0aDtcbiAgICB9IGVsc2Uge1xuXHQgICAgb3B0cy5hc3BlY3QgPSB0eXBlb2Ygb3B0cy5hc3BlY3QgIT09IFwidW5kZWZpbmVkXCIgPyBvcHRzLmFzcGVjdCA6IDAuNjE4O1xuXHRcdGJhc2UuaGVpZ2h0ID0gYmFzZS53aWR0aCAqIG9wdHMuYXNwZWN0O1xuICAgIH1cblxuXHQvLyBjcmVhdGUgYSBuZXcgU1ZHIGVsZW1lbnRcbiAgICB2YXIgeG1sbnMgPSBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI7XG4gICAgdmFyIHN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyh4bWxucywgXCJzdmdcIik7XG5cdHN2Zy5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcIndpZHRoXCIsIGJhc2Uud2lkdGgpO1xuXHRzdmcuc2V0QXR0cmlidXRlTlMobnVsbCwgXCJoZWlnaHRcIiwgYmFzZS5oZWlnaHQpO1xuXHRwYXJlbnQuYXBwZW5kQ2hpbGQoc3ZnKTtcblx0XG5cdC8vIHNldHRpbmcgcmVzaXplIHRvIFwiYXV0b1wiIHNldHMgdGhlIHZpZXdwb3J0IHRvIHRoZSBvcmlnaW5hbCB3aWR0aCBhbmQgaGVpZ2h0IHNvIHRoYXQgdGhlIFNWRyBhbHdheXMgc2NhbGVzXG4gICAgaWYgKG9wdHMucmVzaXplICYmIG9wdHMucmVzaXplID09IFwiYXV0b1wiKSB7XG5cdFx0c3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsIFwidmlld0JveFwiLCBcIjAgMCBcIiArIGJhc2Uud2lkdGggKyBcIiBcIiArIGJhc2UuaGVpZ2h0KTtcbiAgICB9XG5cblx0Ly8gZnVuY3Rpb24gY2FsbGVkIHdoZW4gdGhlIHdpbmRvdyByZXNpemVzXHRcdFxuXHRmdW5jdGlvbiByZXNpemUoKSB7IFxuXHRcdGNvbnNvbGUubG9nKFwicmVzaXppbmcgYmFzZVwiKTtcblx0XHRiYXNlLndpZHRoID0gcGFyZW50LmNsaWVudFdpZHRoO1xuXHRcdHN2Zy5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcIndpZHRoXCIsIGJhc2Uud2lkdGgpO1xuXG5cdFx0Ly8gb25seSByZXNpemUgdGhlIGhlaWdodCBpZiBhc3BlY3Qgd2FzIHNwZWNpZmllZCBpbnN0ZWFkIG9mIGhlaWdodFxuXHRcdGlmIChvcHRzLmFzcGVjdCkge1xuXHRcdCAgICBiYXNlLmhlaWdodCA9IGJhc2Uud2lkdGggKiBvcHRzLmFzcGVjdDtcblx0XHRcdHN2Zy5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcImhlaWdodFwiLCBiYXNlLmhlaWdodCk7XG5cdFx0fVxuXG5cdCAgICBiYXNlLnNjYWxlID0gYmFzZS53aWR0aCAvIGJhc2Uub3JpZ2luYWxfd2lkdGg7XG5cblx0XHQvLyBvcHRpb25hbCBjYWxsYmFja1xuXHRcdGlmIChvcHRzLm9uUmVzaXplKSB7XG5cdFx0XHRvcHRzLm9uUmVzaXplKGJhc2Uud2lkdGgsIGJhc2UuaGVpZ2h0LCBiYXNlLnNjYWxlLCBzdmcpO1xuXHRcdH1cblx0fVxuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHJlc2l6ZSgpO1xuXHR9KTtcblxuXHRyZXNpemUoKTsgLy8gY2FsbCB0aGlzIG9uIGxvYWQgc2luY2Ugc29tZXRpbWVzIHRoZSBpbml0aWFsIGNvbmRpdGlvbnMgYXJlIHdpZGVyIHRoYW4gY29udGFpbmVyXG5cblx0Ly8gbWV0aG9kc1xuXHRiYXNlLnNldFJlc2l6ZSA9IGZ1bmN0aW9uKGYpIHtcblx0XHRvcHRzLm9uUmVzaXplID0gZjtcblx0fVxuXG5cdGJhc2UuY2hhbmdlQXNwZWN0ID0gZnVuY3Rpb24oYXNwZWN0KSB7XG5cdFx0b3B0cy5hc3BlY3QgPSBhc3BlY3Q7XG5cdFx0YmFzZS5oZWlnaHQgPSBiYXNlLndpZHRoICogb3B0cy5hc3BlY3Q7XG5cdFx0c3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsIFwiaGVpZ2h0XCIsIGJhc2UuaGVpZ2h0KTtcblx0fVxuXG5cdGJhc2UuY2hhbmdlSGVpZ2h0ID0gZnVuY3Rpb24oaGVpZ2h0KSB7XG4gICAgXHRiYXNlLmhlaWdodCA9IGhlaWdodDtcbiAgICBcdGlmIChvcHRzLmFzcGVjdCkge1xuXHQgICAgXHRvcHRzLmFzcGVjdCA9IGJhc2UuaGVpZ2h0IC8gYmFzZS53aWR0aDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICBcdG9wdHMuaGVpZ2h0ID0gaGVpZ2h0O1xuXHQgICAgfVxuXHRcdHN2Zy5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcImhlaWdodFwiLCBiYXNlLmhlaWdodCk7XG5cdH1cblxuXHRiYXNlLnRyaWdnZXJSZXNpemUgPSBmdW5jdGlvbigpIHtcblx0XHRyZXNpemUoKTtcblx0fVxuXG5cdGJhc2Uuc3ZnID0gc3ZnO1xuXHRyZXR1cm4gYmFzZTtcbn0iXSwic291cmNlUm9vdCI6IiJ9