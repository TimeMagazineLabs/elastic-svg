// v0.0.8

export default function elasticSVG(selector, opts) {
	opts = opts || {};

	let hasWidth = opts.hasOwnProperty("width");
	let hasHeight = opts.hasOwnProperty("height");
	let hasAspect = opts.hasOwnProperty("aspect");

	// containing DOM element, which defaults to body
	var parent = document.querySelectorAll(selector || "body");

	if (!parent || !parent.length) {
		console.log("Couldn't find a parent for elasticSVG making the selector '" + selector + "'");
		return;
	}

	parent = parent[0];

	let initialWidth = parent.clientWidth;

	// you can specify a width if you like, or we'll snap to size of container
	var base = {
		width: null,
		height: null,
		aspect: null,
		scale: 1
	};

	// we need to remember the original width for scaling purposes

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
	} else { // if has neither an aspect or BOTH a width and height, default to approximately the golden ratio
	    opts.aspect = opts.aspect || 0.618;

		if (hasWidth && !hasHeight) {
			base.width = opts.width; 
			base.height = base.width * opts.aspect;
		} else if (hasHeight) {
			base.height = opts.height;
			base.width = base.height / opts.aspect;
		} else { // if only has aspect
			base.width = initialWidth;
			base.height = base.width * opts.aspect;
		}
	}

	base.original_width = base.width;


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
		let hasWidth = opts.hasOwnProperty("width");
		let hasHeight = opts.hasOwnProperty("height");
		let hasAspect = opts.hasOwnProperty("aspect");

		base.width = parent.clientWidth;
		svg.setAttributeNS(null, "width", base.width);
		
		// if `height` is not specified, resize it to the aspect ratio
		if (!hasHeight) {
			base.height = base.width * opts.aspect;
			svg.setAttributeNS(null, "height", base.height);				
		}

		base.aspect = base.height / base.width;
	    base.scale = base.width / base.original_width;

		// optional callback
		if (opts.onResize) {
			opts.onResize(base.width, base.height, base.scale, svg);
		}
	}

	window.addEventListener("resize", function() {
		resize();
	});

	// manually trigger a page resize and run the resize function once
	window.dispatchEvent(new Event('resize'));

	// resize(); // call this on load since sometimes the initial conditions are wider than container

	// methods
	base.setResize = function(f) {
		opts.onResize = f;
	}

	base.changeAspect = function(aspect) {
		opts.aspect = aspect;
		base.height = base.width * opts.aspect;
		svg.setAttributeNS(null, "height", base.height);
	}

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