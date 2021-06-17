var elasticSVG;elasticSVG =
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ elasticSVG)
/* harmony export */ });
// v0.1.1
function elasticSVG(selector, opts) {
  opts = opts || {};
  var hasWidth = opts.hasOwnProperty("width");
  var hasHeight = opts.hasOwnProperty("height");
  var hasAspect = opts.hasOwnProperty("aspect"); // containing DOM element, which defaults to body

  if (selector instanceof Element) {
    var parent = selector;
  } else {
    var parent = document.querySelectorAll(selector || "body");
  }

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

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./index.js");
/******/ })()
.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lbGFzdGljU1ZHLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWxhc3RpY1NWRy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9lbGFzdGljU1ZHL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9lbGFzdGljU1ZHL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZWxhc3RpY1NWRy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2VsYXN0aWNTVkcvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbImVsYXN0aWNTVkciLCJzZWxlY3RvciIsIm9wdHMiLCJoYXNXaWR0aCIsImhhc093blByb3BlcnR5IiwiaGFzSGVpZ2h0IiwiaGFzQXNwZWN0IiwiRWxlbWVudCIsInBhcmVudCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImxlbmd0aCIsImNvbnNvbGUiLCJsb2ciLCJpbml0aWFsV2lkdGgiLCJjbGllbnRXaWR0aCIsImJhc2UiLCJ3aWR0aCIsImhlaWdodCIsImFzcGVjdCIsInNjYWxlIiwib3JpZ2luYWxfd2lkdGgiLCJ4bWxucyIsInN2ZyIsImNyZWF0ZUVsZW1lbnROUyIsInNldEF0dHJpYnV0ZU5TIiwiYXBwZW5kQ2hpbGQiLCJyZXNpemUiLCJvblJlc2l6ZSIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJkaXNwYXRjaEV2ZW50IiwiRXZlbnQiLCJzZXRSZXNpemUiLCJmIiwiY2hhbmdlQXNwZWN0IiwiY2hhbmdlSGVpZ2h0IiwidHJpZ2dlclJlc2l6ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFZSxTQUFTQSxVQUFULENBQW9CQyxRQUFwQixFQUE4QkMsSUFBOUIsRUFBb0M7QUFDbERBLE1BQUksR0FBR0EsSUFBSSxJQUFJLEVBQWY7QUFFQSxNQUFJ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bUIsSUFBbkIsRUFBeUIsUUFBekIsRUFBbUNULElBQUksQ0FBQ0UsTUFBeEM7QUFDQSxHQVJEOztBQVVBRixNQUFJLENBQUNxQixhQUFMLEdBQXFCLFlBQVc7QUFDL0JWLFVBQU07QUFDTixHQUZEOztBQUlBWCxNQUFJLENBQUNPLEdBQUwsR0FBV0EsR0FBWDtBQUNBLFNBQU9QLElBQVA7QUFDQSxDOzs7Ozs7VUN0SkQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDckJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7OztVQ05BO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6ImVsYXN0aWNTVkcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB2MC4xLjFcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZWxhc3RpY1NWRyhzZWxlY3Rvciwgb3B0cykge1xuXHRvcHRzID0gb3B0cyB8fCB7fTtcblxuXHRsZXQgaGFzV2lkdGggPSBvcHRzLmhhc093blByb3BlcnR5KFwid2lkdGhcIik7XG5cdGxldCBoYXNIZWlnaHQgPSBvcHRzLmhhc093blByb3BlcnR5KFwiaGVpZ2h0XCIpO1xuXHRsZXQgaGFzQXNwZWN0ID0gb3B0cy5oYXNPd25Qcm9wZXJ0eShcImFzcGVjdFwiKTtcblxuXHQvLyBjb250YWluaW5nIERPTSBlbGVtZW50LCB3aGljaCBkZWZhdWx0cyB0byBib2R5XG5cblx0aWYgKHNlbGVjdG9yIGluc3RhbmNlb2YgRWxlbWVudCkge1xuXHRcdHZhciBwYXJlbnQgPSBzZWxlY3Rvcjtcblx0fSBlbHNlIHtcblx0XHR2YXIgcGFyZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvciB8fCBcImJvZHlcIik7XG5cdH1cblxuXHRpZiAoIXBhcmVudCB8fCAhcGFyZW50Lmxlbmd0aCkge1xuXHRcdGNvbnNvbGUubG9nKFwiQ291bGRuJ3QgZmluZCBhIHBhcmVudCBmb3IgZWxhc3RpY1NWRyBtYWtpbmcgdGhlIHNlbGVjdG9yICdcIiArIHNlbGVjdG9yICsgXCInXCIpO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdHBhcmVudCA9IHBhcmVudFswXTtcblxuXHRsZXQgaW5pdGlhbFdpZHRoID0gcGFyZW50LmNsaWVudFdpZHRoO1xuXG5cdC8vIHlvdSBjYW4gc3BlY2lmeSBhIHdpZHRoIGlmIHlvdSBsaWtlLCBvciB3ZSdsbCBzbmFwIHRvIHNpemUgb2YgY29udGFpbmVyXG5cdHZhciBiYXNlID0ge1xuXHRcdHdpZHRoOiBudWxsLFxuXHRcdGhlaWdodDogbnVsbCxcblx0XHRhc3BlY3Q6IG51bGwsXG5cdFx0c2NhbGU6IDFcblx0fTtcblxuXHQvLyB3ZSBuZWVkIHRvIHJlbWVtYmVyIHRoZSBvcmlnaW5hbCB3aWR0aCBmb3Igc2NhbGluZyBwdXJwb3Nlc1xuXG5cdC8vIHlvdSBjYW4gZWl0aGVyIHNwZWNpZnkgdGhlIGhlaWdodCBhbmQgd2lkdGgsIHdoaWNoIHdpbGwgY29tcHV0ZWQgdGhlIGFzcGVjdCByYXRpb24sIG9yIG9uZSBvZiB0aGVzZSBhbmQgdGhlIGFzcGVjdCByYXRpby5cblx0Ly8gSWYgbmVpdGhlciBpcyBzcGVjaWZpZWQsIGRlZmF1bHRzIHRvIHJvdWdobHkgdGhlIGdvbGRlbiByYXRpb1xuXHQvLyBzcGVjaWZ5aW5nIHRoZSBoZWlnaHQga2VlcHMgdGhlIHN2ZyBhdCBhIHN0YW5kYXJkIGhlaWdodCBhbmQgb25seSByZXNpemVzIHRoZSB3aWR0aFxuXHQvLyBzcGVjaWZ5aW5nIHRoZSBhc3BlY3QgcmF0aW8gcmVzaXplcyBib3RoXG5cblx0aWYgKGhhc1dpZHRoICYmIGhhc0hlaWdodCkge1xuXHRcdGlmIChoYXNBc3BlY3QpIHtcblx0XHRcdGNvbnNvbGUubG9nKFwiT3ZlcnJpZGluZyBhc3BlY3QgcmF0aW8gc2luY2UgYm90aCBgd2lkdGhgIGFuZCBgaGVpZ2h0YCBhcmUgc3BlY2lmaWVkXCIpO1xuXHRcdFx0b3B0cy5hc3BlY3QgPSBvcHRzLmhlaWdodCAvIG9wdHMud2lkdGg7XG5cdFx0fVxuXHRcdGJhc2Uud2lkdGggPSBvcHRzLndpZHRoOyBcblx0XHRiYXNlLmhlaWdodCA9IG9wdHMuaGVpZ2h0OyBcblx0fSBlbHNlIHsgLy8gaWYgaGFzIG5laXRoZXIgYW4gYXNwZWN0IG9yIEJPVEggYSB3aWR0aCBhbmQgaGVpZ2h0LCBkZWZhdWx0IHRvIGFwcHJveGltYXRlbHkgdGhlIGdvbGRlbiByYXRpb1xuXHQgICAgb3B0cy5hc3BlY3QgPSBvcHRzLmFzcGVjdCB8fCAwLjYxODtcblxuXHRcdGlmIChoYXNXaWR0aCAmJiAhaGFzSGVpZ2h0KSB7XG5cdFx0XHRiYXNlLndpZHRoID0gb3B0cy53aWR0aDsgXG5cdFx0XHRiYXNlLmhlaWdodCA9IGJhc2Uud2lkdGggKiBvcHRzLmFzcGVjdDtcblx0XHR9IGVsc2UgaWYgKGhhc0hlaWdodCkge1xuXHRcdFx0YmFzZS5oZWlnaHQgPSBvcHRzLmhlaWdodDtcblx0XHRcdGJhc2Uud2lkdGggPSBiYXNlLmhlaWdodCAvIG9wdHMuYXNwZWN0O1xuXHRcdH0gZWxzZSB7IC8vIGlmIG9ubHkgaGFzIGFzcGVjdFxuXHRcdFx0YmFzZS53aWR0aCA9IGluaXRpYWxXaWR0aDtcblx0XHRcdGJhc2UuaGVpZ2h0ID0gYmFzZS53aWR0aCAqIG9wdHMuYXNwZWN0O1xuXHRcdH1cblx0fVxuXG5cdGJhc2Uub3JpZ2luYWxfd2lkdGggPSBiYXNlLndpZHRoO1xuXG5cblx0Ly8gY3JlYXRlIGEgbmV3IFNWRyBlbGVtZW50XG4gICAgdmFyIHhtbG5zID0gXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiO1xuICAgIHZhciBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoeG1sbnMsIFwic3ZnXCIpO1xuXHRzdmcuc2V0QXR0cmlidXRlTlMobnVsbCwgXCJ3aWR0aFwiLCBiYXNlLndpZHRoKTtcblx0c3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsIFwiaGVpZ2h0XCIsIGJhc2UuaGVpZ2h0KTtcblx0cGFyZW50LmFwcGVuZENoaWxkKHN2Zyk7XG5cdFxuXHQvLyBzZXR0aW5nIHJlc2l6ZSB0byBcImF1dG9cIiBzZXRzIHRoZSB2aWV3cG9ydCB0byB0aGUgb3JpZ2luYWwgd2lkdGggYW5kIGhlaWdodCBzbyB0aGF0IHRoZSBTVkcgYWx3YXlzIHNjYWxlc1xuICAgIGlmIChvcHRzLnJlc2l6ZSAmJiBvcHRzLnJlc2l6ZSA9PSBcImF1dG9cIikge1xuXHRcdHN2Zy5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcInZpZXdCb3hcIiwgXCIwIDAgXCIgKyBiYXNlLndpZHRoICsgXCIgXCIgKyBiYXNlLmhlaWdodCk7XG4gICAgfVxuXG5cdC8vIGZ1bmN0aW9uIGNhbGxlZCB3aGVuIHRoZSB3aW5kb3cgcmVzaXplc1x0XHRcblx0ZnVuY3Rpb24gcmVzaXplKCkgeyBcblx0XHRsZXQgaGFzV2lkdGggPSBvcHRzLmhhc093blByb3BlcnR5KFwid2lkdGhcIik7XG5cdFx0bGV0IGhhc0hlaWdodCA9IG9wdHMuaGFzT3duUHJvcGVydHkoXCJoZWlnaHRcIik7XG5cdFx0bGV0IGhhc0FzcGVjdCA9IG9wdHMuaGFzT3duUHJvcGVydHkoXCJhc3BlY3RcIik7XG5cblx0XHRiYXNlLndpZHRoID0gcGFyZW50LmNsaWVudFdpZHRoO1xuXHRcdHN2Zy5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcIndpZHRoXCIsIGJhc2Uud2lkdGgpO1xuXHRcdFxuXHRcdC8vIGlmIGBoZWlnaHRgIGlzIG5vdCBzcGVjaWZpZWQsIHJlc2l6ZSBpdCB0byB0aGUgYXNwZWN0IHJhdGlvXG5cdFx0aWYgKCFoYXNIZWlnaHQpIHtcblx0XHRcdGJhc2UuaGVpZ2h0ID0gYmFzZS53aWR0aCAqIG9wdHMuYXNwZWN0O1xuXHRcdFx0c3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsIFwiaGVpZ2h0XCIsIGJhc2UuaGVpZ2h0KTtcdFx0XHRcdFxuXHRcdH1cblxuXHRcdGJhc2UuYXNwZWN0ID0gYmFzZS5oZWlnaHQgLyBiYXNlLndpZHRoO1xuXHQgICAgYmFzZS5zY2FsZSA9IGJhc2Uud2lkdGggLyBiYXNlLm9yaWdpbmFsX3dpZHRoO1xuXG5cdFx0Ly8gb3B0aW9uYWwgY2FsbGJhY2tcblx0XHRpZiAob3B0cy5vblJlc2l6ZSkge1xuXHRcdFx0b3B0cy5vblJlc2l6ZShiYXNlLndpZHRoLCBiYXNlLmhlaWdodCwgYmFzZS5zY2FsZSwgc3ZnKTtcblx0XHR9XG5cdH1cblxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBmdW5jdGlvbigpIHtcblx0XHRyZXNpemUoKTtcblx0fSk7XG5cblx0Ly8gbWFudWFsbHkgdHJpZ2dlciBhIHBhZ2UgcmVzaXplIGFuZCBydW4gdGhlIHJlc2l6ZSBmdW5jdGlvbiBvbmNlXG5cdHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgncmVzaXplJykpO1xuXG5cdC8vIHJlc2l6ZSgpOyAvLyBjYWxsIHRoaXMgb24gbG9hZCBzaW5jZSBzb21ldGltZXMgdGhlIGluaXRpYWwgY29uZGl0aW9ucyBhcmUgd2lkZXIgdGhhbiBjb250YWluZXJcblxuXHQvLyBtZXRob2RzXG5cdGJhc2Uuc2V0UmVzaXplID0gZnVuY3Rpb24oZikge1xuXHRcdG9wdHMub25SZXNpemUgPSBmO1xuXHR9XG5cblx0YmFzZS5jaGFuZ2VBc3BlY3QgPSBmdW5jdGlvbihhc3BlY3QpIHtcblx0XHRvcHRzLmFzcGVjdCA9IGFzcGVjdDtcblx0XHRiYXNlLmhlaWdodCA9IGJhc2Uud2lkdGggKiBvcHRzLmFzcGVjdDtcblx0XHRzdmcuc2V0QXR0cmlidXRlTlMobnVsbCwgXCJoZWlnaHRcIiwgYmFzZS5oZWlnaHQpO1xuXHR9XG5cblx0Lypcblx0YmFzZS5jaGFuZ2VXaWR0aCA9IGZ1bmN0aW9uKHdpZHRoKSB7XG4gICAgXHRiYXNlLndpZHRoID0gd2lkdGg7XG4gICAgXHRpZiAob3B0cy5hc3BlY3QpIHtcblx0ICAgIFx0b3B0cy5hc3BlY3QgPSBiYXNlLmhlaWdodCAvIGJhc2Uud2lkdGg7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgXHRvcHRzLndpZHRoID0gd2lkdGg7XG5cdCAgICB9XG5cdFx0c3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsIFwid2lkdGhcIiwgYmFzZS53aWR0aCk7XG5cdH1cblx0Ki9cblxuXHRiYXNlLmNoYW5nZUhlaWdodCA9IGZ1bmN0aW9uKGhlaWdodCkge1xuICAgIFx0YmFzZS5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgXHRpZiAob3B0cy5hc3BlY3QpIHtcblx0ICAgIFx0b3B0cy5hc3BlY3QgPSBiYXNlLmhlaWdodCAvIGJhc2Uud2lkdGg7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgXHRvcHRzLmhlaWdodCA9IGhlaWdodDtcblx0ICAgIH1cblx0XHRzdmcuc2V0QXR0cmlidXRlTlMobnVsbCwgXCJoZWlnaHRcIiwgYmFzZS5oZWlnaHQpO1xuXHR9XG5cblx0YmFzZS50cmlnZ2VyUmVzaXplID0gZnVuY3Rpb24oKSB7XG5cdFx0cmVzaXplKCk7XG5cdH1cblxuXHRiYXNlLnN2ZyA9IHN2Zztcblx0cmV0dXJuIGJhc2U7XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbW9kdWxlIGV4cG9ydHMgbXVzdCBiZSByZXR1cm5lZCBmcm9tIHJ1bnRpbWUgc28gZW50cnkgaW5saW5pbmcgaXMgZGlzYWJsZWRcbi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xucmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oXCIuL2luZGV4LmpzXCIpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==