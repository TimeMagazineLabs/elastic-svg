(function() {
    var root = this;

	// create a new SVG element
	var elasticSVG = function(selector, opts) {
		opts = opts || {};

		// containing DOM element, which defaults to body
		var parent = document.querySelectorAll(selector || "body");

		if (!parent || !parent.length) {
			console.log("Couldn't find a parent for elasticSVG making the selector '" + selector + "'");
			return;
		}

		parent = parent[0];

		// you can specify a width if you like, or we'll snap to size of container
		var base = {
			width: typeof opts.width !== "undefined" ? opts.width : parent.clientWidth,
			scale: 1
		};

		// we need to remember the original width for scaling purposes
		base.original_width = base.width;

		// you can either specify the height or the aspect ratio. If neither is specified, refaults to roughly the golden ratio
	    if (typeof opts.height !== "undefined") {
	    	base.height = opts.height;
	    	opts.aspect = base.height / base.width;
	    } else {
		    opts.aspect = typeof opts.aspect !== "undefined" ? opts.aspect : 0.618;
			base.height = base.width * opts.aspect;
	    }

        var xmlns = "http://www.w3.org/2000/svg";
        var svg = document.createElementNS(xmlns, "svg");
		svg.setAttributeNS(null, "width", base.width);
		svg.setAttributeNS(null, "height", base.height);
		parent.appendChild(svg);
		
		// setting resize to "auto" sets the viewport to the original width and height so that the SVG always scales
	    if (opts.resize && opts.resize == "auto") {
			svg.setAttributeNS(null, "viewBox", "0 0 " + base.width + " " + base.height);
	    }
		
		function resize() { 
			base.width = parent.clientWidth;
		    base.height = base.width * opts.aspect;
		    base.scale = base.width / base.original_width;

			svg.setAttributeNS(null, "width", base.width);
			svg.setAttributeNS(null, "height", base.height);

			// optional callback
			if (opts.onResize) {
				opts.onResize(base.width, base.height, base.scale);
			}
		}

		var resizeTimer;

		// http://stackoverflow.com/questions/3339825/what-is-the-best-practise-to-not-to-override-other-bound-functions-to-window-onr
		function addResizeEvent(func, dur) {
		    var oldResize = window.onresize,
				resizeTimer,
				dur = typeof dur === "undefined" ? 250 : parseInt(dur, 10);

			window.onresize = function () {
				clearTimeout(resizeTimer);

		        if (typeof oldResize === 'function') {
		            oldResize();
		        }

				resizeTimer = setTimeout(function() {
					func();
				}, dur);
			}
		}

		addResizeEvent(resize, 250);

		if (opts.resize && opts.resize === "auto") {
			resize(); // call this on load since sometimes the initial conditions are wider than container
		}

		base.setResize = function(f) {
			opts.onResize = f;
		}

		base.changeAspect = function(aspect) {
			opts.aspect = aspect;
			base.height = base.width * opts.aspect;
			svg.setAttributeNS(null, "height", base.height);
		}

		base.changeHeight = function(height) {
	    	base.height = height;
	    	opts.aspect = base.height / base.width;
			svg.setAttributeNS(null, "height", base.height);
		}

		base.svg = svg;
		return base;
	}

	// support various modular environments
	if (typeof define === "function" && define.amd) { // RequireJS
	    define(elasticSVG);
	} else if (typeof module === "object" && module.exports) { // browserify
	    module.exports = elasticSVG;
	} else {
	    root.elasticSVG = elasticSVG; // directly included
	}

}());