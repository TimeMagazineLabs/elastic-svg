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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lbGFzdGljU1ZHLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWxhc3RpY1NWRy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9lbGFzdGljU1ZHL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9lbGFzdGljU1ZHL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZWxhc3RpY1NWRy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2VsYXN0aWNTVkcvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbImVsYXN0aWNTVkciLCJzZWxlY3RvciIsIm9wdHMiLCJoYXNXaWR0aCIsImhhc093blByb3BlcnR5IiwiaGFzSGVpZ2h0IiwiaGFzQXNwZWN0IiwicGFyZW50IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwibGVuZ3RoIiwiY29uc29sZSIsImxvZyIsImluaXRpYWxXaWR0aCIsImNsaWVudFdpZHRoIiwiYmFzZSIsIndpZHRoIiwiaGVpZ2h0IiwiYXNwZWN0Iiwic2NhbGUiLCJvcmlnaW5hbF93aWR0aCIsInhtbG5zIiwic3ZnIiwiY3JlYXRlRWxlbWVudE5TIiwic2V0QXR0cmlidXRlTlMiLCJhcHBlbmRDaGlsZCIsInJlc2l6ZSIsIm9uUmVzaXplIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImRpc3BhdGNoRXZlbnQiLCJFdmVudCIsInNldFJlc2l6ZSIsImYiLCJjaGFuZ2VBc3BlY3QiLCJjaGFuZ2VIZWlnaHQiLCJ0cmlnZ2VyUmVzaXplIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUVlLFNBQVNBLFVBQVQsQ0FBb0JDLFFBQXBCLEVBQThCQyxJQUE5QixFQUFvQztBQUNsREEsTUFBSSxHQUFHQSxJQUFJLElBQUksRUFBZjtBQUVBLE1BQUlDLFFBQVEsR0FB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QUNOLEdBRkQ7O0FBSUFYLE1BQUksQ0FBQ08sR0FBTCxHQUFXQSxHQUFYO0FBQ0EsU0FBT1AsSUFBUDtBQUNBLEM7Ozs7OztVQ2pKRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0NyQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7O1VDTkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoiZWxhc3RpY1NWRy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHYwLjAuOFxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlbGFzdGljU1ZHKHNlbGVjdG9yLCBvcHRzKSB7XG5cdG9wdHMgPSBvcHRzIHx8IHt9O1xuXG5cdGxldCBoYXNXaWR0aCA9IG9wdHMuaGFzT3duUHJvcGVydHkoXCJ3aWR0aFwiKTtcblx0bGV0IGhhc0hlaWdodCA9IG9wdHMuaGFzT3duUHJvcGVydHkoXCJoZWlnaHRcIik7XG5cdGxldCBoYXNBc3BlY3QgPSBvcHRzLmhhc093blByb3BlcnR5KFwiYXNwZWN0XCIpO1xuXG5cdC8vIGNvbnRhaW5pbmcgRE9NIGVsZW1lbnQsIHdoaWNoIGRlZmF1bHRzIHRvIGJvZHlcblx0dmFyIHBhcmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IgfHwgXCJib2R5XCIpO1xuXG5cdGlmICghcGFyZW50IHx8ICFwYXJlbnQubGVuZ3RoKSB7XG5cdFx0Y29uc29sZS5sb2coXCJDb3VsZG4ndCBmaW5kIGEgcGFyZW50IGZvciBlbGFzdGljU1ZHIG1ha2luZyB0aGUgc2VsZWN0b3IgJ1wiICsgc2VsZWN0b3IgKyBcIidcIik7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0cGFyZW50ID0gcGFyZW50WzBdO1xuXG5cdGxldCBpbml0aWFsV2lkdGggPSBwYXJlbnQuY2xpZW50V2lkdGg7XG5cblx0Ly8geW91IGNhbiBzcGVjaWZ5IGEgd2lkdGggaWYgeW91IGxpa2UsIG9yIHdlJ2xsIHNuYXAgdG8gc2l6ZSBvZiBjb250YWluZXJcblx0dmFyIGJhc2UgPSB7XG5cdFx0d2lkdGg6IG51bGwsXG5cdFx0aGVpZ2h0OiBudWxsLFxuXHRcdGFzcGVjdDogbnVsbCxcblx0XHRzY2FsZTogMVxuXHR9O1xuXG5cdC8vIHdlIG5lZWQgdG8gcmVtZW1iZXIgdGhlIG9yaWdpbmFsIHdpZHRoIGZvciBzY2FsaW5nIHB1cnBvc2VzXG5cblx0Ly8geW91IGNhbiBlaXRoZXIgc3BlY2lmeSB0aGUgaGVpZ2h0IGFuZCB3aWR0aCwgd2hpY2ggd2lsbCBjb21wdXRlZCB0aGUgYXNwZWN0IHJhdGlvbiwgb3Igb25lIG9mIHRoZXNlIGFuZCB0aGUgYXNwZWN0IHJhdGlvLlxuXHQvLyBJZiBuZWl0aGVyIGlzIHNwZWNpZmllZCwgZGVmYXVsdHMgdG8gcm91Z2hseSB0aGUgZ29sZGVuIHJhdGlvXG5cdC8vIHNwZWNpZnlpbmcgdGhlIGhlaWdodCBrZWVwcyB0aGUgc3ZnIGF0IGEgc3RhbmRhcmQgaGVpZ2h0IGFuZCBvbmx5IHJlc2l6ZXMgdGhlIHdpZHRoXG5cdC8vIHNwZWNpZnlpbmcgdGhlIGFzcGVjdCByYXRpbyByZXNpemVzIGJvdGhcblxuXHRpZiAoaGFzV2lkdGggJiYgaGFzSGVpZ2h0KSB7XG5cdFx0aWYgKGhhc0FzcGVjdCkge1xuXHRcdFx0Y29uc29sZS5sb2coXCJPdmVycmlkaW5nIGFzcGVjdCByYXRpbyBzaW5jZSBib3RoIGB3aWR0aGAgYW5kIGBoZWlnaHRgIGFyZSBzcGVjaWZpZWRcIik7XG5cdFx0XHRvcHRzLmFzcGVjdCA9IG9wdHMuaGVpZ2h0IC8gb3B0cy53aWR0aDtcblx0XHR9XG5cdFx0YmFzZS53aWR0aCA9IG9wdHMud2lkdGg7IFxuXHRcdGJhc2UuaGVpZ2h0ID0gb3B0cy5oZWlnaHQ7IFxuXHR9IGVsc2UgeyAvLyBpZiBoYXMgbmVpdGhlciBhbiBhc3BlY3Qgb3IgQk9USCBhIHdpZHRoIGFuZCBoZWlnaHQsIGRlZmF1bHQgdG8gYXBwcm94aW1hdGVseSB0aGUgZ29sZGVuIHJhdGlvXG5cdCAgICBvcHRzLmFzcGVjdCA9IG9wdHMuYXNwZWN0IHx8IDAuNjE4O1xuXG5cdFx0aWYgKGhhc1dpZHRoICYmICFoYXNIZWlnaHQpIHtcblx0XHRcdGJhc2Uud2lkdGggPSBvcHRzLndpZHRoOyBcblx0XHRcdGJhc2UuaGVpZ2h0ID0gYmFzZS53aWR0aCAqIG9wdHMuYXNwZWN0O1xuXHRcdH0gZWxzZSBpZiAoaGFzSGVpZ2h0KSB7XG5cdFx0XHRiYXNlLmhlaWdodCA9IG9wdHMuaGVpZ2h0O1xuXHRcdFx0YmFzZS53aWR0aCA9IGJhc2UuaGVpZ2h0IC8gb3B0cy5hc3BlY3Q7XG5cdFx0fSBlbHNlIHsgLy8gaWYgb25seSBoYXMgYXNwZWN0XG5cdFx0XHRiYXNlLndpZHRoID0gaW5pdGlhbFdpZHRoO1xuXHRcdFx0YmFzZS5oZWlnaHQgPSBiYXNlLndpZHRoICogb3B0cy5hc3BlY3Q7XG5cdFx0fVxuXHR9XG5cblx0YmFzZS5vcmlnaW5hbF93aWR0aCA9IGJhc2Uud2lkdGg7XG5cblxuXHQvLyBjcmVhdGUgYSBuZXcgU1ZHIGVsZW1lbnRcbiAgICB2YXIgeG1sbnMgPSBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI7XG4gICAgdmFyIHN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyh4bWxucywgXCJzdmdcIik7XG5cdHN2Zy5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcIndpZHRoXCIsIGJhc2Uud2lkdGgpO1xuXHRzdmcuc2V0QXR0cmlidXRlTlMobnVsbCwgXCJoZWlnaHRcIiwgYmFzZS5oZWlnaHQpO1xuXHRwYXJlbnQuYXBwZW5kQ2hpbGQoc3ZnKTtcblx0XG5cdC8vIHNldHRpbmcgcmVzaXplIHRvIFwiYXV0b1wiIHNldHMgdGhlIHZpZXdwb3J0IHRvIHRoZSBvcmlnaW5hbCB3aWR0aCBhbmQgaGVpZ2h0IHNvIHRoYXQgdGhlIFNWRyBhbHdheXMgc2NhbGVzXG4gICAgaWYgKG9wdHMucmVzaXplICYmIG9wdHMucmVzaXplID09IFwiYXV0b1wiKSB7XG5cdFx0c3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsIFwidmlld0JveFwiLCBcIjAgMCBcIiArIGJhc2Uud2lkdGggKyBcIiBcIiArIGJhc2UuaGVpZ2h0KTtcbiAgICB9XG5cblx0Ly8gZnVuY3Rpb24gY2FsbGVkIHdoZW4gdGhlIHdpbmRvdyByZXNpemVzXHRcdFxuXHRmdW5jdGlvbiByZXNpemUoKSB7IFxuXHRcdGxldCBoYXNXaWR0aCA9IG9wdHMuaGFzT3duUHJvcGVydHkoXCJ3aWR0aFwiKTtcblx0XHRsZXQgaGFzSGVpZ2h0ID0gb3B0cy5oYXNPd25Qcm9wZXJ0eShcImhlaWdodFwiKTtcblx0XHRsZXQgaGFzQXNwZWN0ID0gb3B0cy5oYXNPd25Qcm9wZXJ0eShcImFzcGVjdFwiKTtcblxuXHRcdGJhc2Uud2lkdGggPSBwYXJlbnQuY2xpZW50V2lkdGg7XG5cdFx0c3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsIFwid2lkdGhcIiwgYmFzZS53aWR0aCk7XG5cdFx0XG5cdFx0Ly8gaWYgYGhlaWdodGAgaXMgbm90IHNwZWNpZmllZCwgcmVzaXplIGl0IHRvIHRoZSBhc3BlY3QgcmF0aW9cblx0XHRpZiAoIWhhc0hlaWdodCkge1xuXHRcdFx0YmFzZS5oZWlnaHQgPSBiYXNlLndpZHRoICogb3B0cy5hc3BlY3Q7XG5cdFx0XHRzdmcuc2V0QXR0cmlidXRlTlMobnVsbCwgXCJoZWlnaHRcIiwgYmFzZS5oZWlnaHQpO1x0XHRcdFx0XG5cdFx0fVxuXG5cdFx0YmFzZS5hc3BlY3QgPSBiYXNlLmhlaWdodCAvIGJhc2Uud2lkdGg7XG5cdCAgICBiYXNlLnNjYWxlID0gYmFzZS53aWR0aCAvIGJhc2Uub3JpZ2luYWxfd2lkdGg7XG5cblx0XHQvLyBvcHRpb25hbCBjYWxsYmFja1xuXHRcdGlmIChvcHRzLm9uUmVzaXplKSB7XG5cdFx0XHRvcHRzLm9uUmVzaXplKGJhc2Uud2lkdGgsIGJhc2UuaGVpZ2h0LCBiYXNlLnNjYWxlLCBzdmcpO1xuXHRcdH1cblx0fVxuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHJlc2l6ZSgpO1xuXHR9KTtcblxuXHQvLyBtYW51YWxseSB0cmlnZ2VyIGEgcGFnZSByZXNpemUgYW5kIHJ1biB0aGUgcmVzaXplIGZ1bmN0aW9uIG9uY2Vcblx0d2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdyZXNpemUnKSk7XG5cblx0Ly8gcmVzaXplKCk7IC8vIGNhbGwgdGhpcyBvbiBsb2FkIHNpbmNlIHNvbWV0aW1lcyB0aGUgaW5pdGlhbCBjb25kaXRpb25zIGFyZSB3aWRlciB0aGFuIGNvbnRhaW5lclxuXG5cdC8vIG1ldGhvZHNcblx0YmFzZS5zZXRSZXNpemUgPSBmdW5jdGlvbihmKSB7XG5cdFx0b3B0cy5vblJlc2l6ZSA9IGY7XG5cdH1cblxuXHRiYXNlLmNoYW5nZUFzcGVjdCA9IGZ1bmN0aW9uKGFzcGVjdCkge1xuXHRcdG9wdHMuYXNwZWN0ID0gYXNwZWN0O1xuXHRcdGJhc2UuaGVpZ2h0ID0gYmFzZS53aWR0aCAqIG9wdHMuYXNwZWN0O1xuXHRcdHN2Zy5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcImhlaWdodFwiLCBiYXNlLmhlaWdodCk7XG5cdH1cblxuXHQvKlxuXHRiYXNlLmNoYW5nZVdpZHRoID0gZnVuY3Rpb24od2lkdGgpIHtcbiAgICBcdGJhc2Uud2lkdGggPSB3aWR0aDtcbiAgICBcdGlmIChvcHRzLmFzcGVjdCkge1xuXHQgICAgXHRvcHRzLmFzcGVjdCA9IGJhc2UuaGVpZ2h0IC8gYmFzZS53aWR0aDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICBcdG9wdHMud2lkdGggPSB3aWR0aDtcblx0ICAgIH1cblx0XHRzdmcuc2V0QXR0cmlidXRlTlMobnVsbCwgXCJ3aWR0aFwiLCBiYXNlLndpZHRoKTtcblx0fVxuXHQqL1xuXG5cdGJhc2UuY2hhbmdlSGVpZ2h0ID0gZnVuY3Rpb24oaGVpZ2h0KSB7XG4gICAgXHRiYXNlLmhlaWdodCA9IGhlaWdodDtcbiAgICBcdGlmIChvcHRzLmFzcGVjdCkge1xuXHQgICAgXHRvcHRzLmFzcGVjdCA9IGJhc2UuaGVpZ2h0IC8gYmFzZS53aWR0aDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICBcdG9wdHMuaGVpZ2h0ID0gaGVpZ2h0O1xuXHQgICAgfVxuXHRcdHN2Zy5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcImhlaWdodFwiLCBiYXNlLmhlaWdodCk7XG5cdH1cblxuXHRiYXNlLnRyaWdnZXJSZXNpemUgPSBmdW5jdGlvbigpIHtcblx0XHRyZXNpemUoKTtcblx0fVxuXG5cdGJhc2Uuc3ZnID0gc3ZnO1xuXHRyZXR1cm4gYmFzZTtcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBtb2R1bGUgZXhwb3J0cyBtdXN0IGJlIHJldHVybmVkIGZyb20gcnVudGltZSBzbyBlbnRyeSBpbmxpbmluZyBpcyBkaXNhYmxlZFxuLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG5yZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vaW5kZXguanNcIik7XG4iXSwic291cmNlUm9vdCI6IiJ9