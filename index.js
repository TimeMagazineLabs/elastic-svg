// v0.0.8

export default function elasticSVG(selector, opts) {
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
	// specifying the height keeps the svg at a standard height and only resizes the width
	// specifying the aspect ratio resizes both
    if (typeof opts.height !== "undefined") {
    	base.height = opts.height;
    	base.aspect = base.height / base.width;
    } else {
	    opts.aspect = typeof opts.aspect !== "undefined" ? opts.aspect : 0.618;
		base.height = base.width * opts.aspect;
    }

	// create a new SVG element
    var xmlns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(xmlns, "svg");
	svg.setAttributeNS(null, "width", base.width);
	svg.setAttributeNS(null, "height", base.height);
	parent.appendChild(svg);
	
	// setting resize to "auto" sets the viewport to the original width and height so that the SVG always scales
    if (opts.resize && opts.resize == "auto") {
		svg.setAttributeNS(null, "viewBox", "0 0 " + base.width + " " + base.height);
    }

	// function called when the window resizes		
	function resize() { 
		console.log("resizing base");
		base.width = parent.clientWidth;
		svg.setAttributeNS(null, "width", base.width);

		// only resize the height if aspect was specified instead of height
		if (opts.aspect) {
		    base.height = base.width * opts.aspect;
			svg.setAttributeNS(null, "height", base.height);
		}

	    base.scale = base.width / base.original_width;

		// optional callback
		if (opts.onResize) {
			opts.onResize(base.width, base.height, base.scale, svg);
		}
	}

	window.addEventListener("resize", function() {
		resize();
	});

	resize(); // call this on load since sometimes the initial conditions are wider than container

	// methods
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
    	if (opts.aspect) {
	    	opts.aspect = base.height / base.width;
	    } else {
	    	opts.height = height;
	    }
		svg.setAttributeNS(null, "height", base.height);
	}

	base.triggerResize = function() {
		resize();
	}

	base.svg = svg;
	return base;
}