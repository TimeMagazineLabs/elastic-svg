function drawCA(parent, settings) {
	var defaultSettings = {
		ruleNumber: 30,
		margin: 5,
		squareSize: 10,
		initialSequence: [ 0 ] // offset from center
	};

	settings = Object.assign(defaultSettings, settings || {});

	if (typeof parent === 'string') {
		parent = document.querySelector(parent);
	}

	var width = parent.clientWidth;
	var height = parent.clientHeight;

	if (parent.tagName === "svg") {
		var svg = d3.select(parent);
	} else {
		var svg = d3.select(parent).append("svg").attr("width", width).attr("height", height);
	}

	// remove any existing stuff in the SVG
	svg.selectAll("*").remove();

	var MARGIN = settings.margin;
	var UNIT = settings.squareSize;
	var NCOLS = Math.floor((width - MARGIN * 2) / UNIT);
	var NROWS = Math.min(Math.floor((height - MARGIN * 2 - 20) / UNIT), Math.floor(NCOLS / 2));

	svg.append("text").text(`RULE ${ settings.ruleNumber }`)
		.attr("x", width / 2).attr("y", 15)
		.style("font-size", "18px")
		.style("font-weight", 700)
		.style("font-family", "Arial")
		.style("text-anchor", "middle")
		.attr("class", "cellularAutomata");
		
	var g = svg.append("g").attr("class", "cellularAutomata").attr("transform", `translate(${ MARGIN },20)`);

	var RULE = ("00000000" + settings.ruleNumber.toString(2)).slice(-8).split('');

	let ruleLookup = {};

	RULE.forEach((d, i) => {
		let key = ("000" + (7 - i).toString(2)).slice(-3);
		ruleLookup[key] = +d;
	});

	var rows = [];
	const firstRow = new Uint8Array(NCOLS + 2).fill(0);

	// initial conditions
	let center = Math.round(NCOLS / 2);
	settings.initialSequence.forEach((d, i) => {
		firstRow[center + d] = 1;		
	});

	rows.push(firstRow);

	// compute a new row from the last one in rows array
	function addRow() {
		let previousRow = rows.slice(-1)[0];
		const nextRow = new Uint8Array(NCOLS + 2).fill(0);

		for (let c = 1; c < previousRow.length - 1; c += 1) {
			let triplet = previousRow.slice(c - 1, c + 2).join('');
			let state = ruleLookup[triplet];
			nextRow[c] = state;
		}

		rows.push(nextRow);
	}

	for (let c = 0; c < NROWS - 1; c += 1) {
		addRow();
	}

	let g_rows = g.selectAll(".row")
		.data(rows)
		.enter()
		.append("g")
		.attr("transform", (d,i) => { return `translate(0,${ UNIT * i })`; });

	g_rows.selectAll(".square")
		.data(d => d.slice(1, -1))
		.enter()
		.append("rect")
		.attr("x", (d, i) => i * UNIT).attr("y", 0)
		.attr("width", UNIT).attr("height", UNIT)
		.style("stroke", "black")
		.style("stroke-width", 0.5 + "px")
		.style("fill", d => d ? "black" : "white")
		.attr("class", (d,i) => { return `sq_${ i }`; });
}