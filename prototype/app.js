// загрузить данные
const schemaSize = {
	width: 1000,
	height: 1200
}

const lineStyles = {
  "1": { fill: "#ED2621", stroke: "#ED2621" },
  "2": { fill: "#4DBE52", stroke: "#4DBE52" },
  "3": { fill: "#2C73C3", stroke: "#2C73C3" },
  "4": { fill: "#4CC5F2", stroke: "#4CC5F2" },
  "5": { fill: "#84412E", stroke: "#84412E", closed: true },
  "6": { fill: "#F47025", stroke: "#F47025" },
  "7": { fill: "#89349C", stroke: "#89349C" },
  "8A": { fill: "#FAC51D", stroke: "#FAC51D" },
  "8": { fill: "#FAC51D", stroke: "#FAC51D" },
  "9": { fill: "#9EA09F", stroke: "#9EA09F" },
  "10": { fill: "#A9D92D", stroke: "#A9D92D" },
  "11": { fill: "#dadada", stroke: "#000000" },
  "11A": { fill: "#80D3C9", stroke: "#80D3C9" },
  "12": { fill: "#B0BEE5", stroke: "#B0BEE5" },
  "13": { fill: "#2D74C6", stroke: "#F38F77" },
  "14": { fill: "#ED2621", stroke: "#ED2621", closed: true }
}

d3.csv("moscow.csv")
  .then((source) => {
  		let lines = d3.nest()
						.key((d) => d.Line)
						.entries(source);

		// prepare container
		const width = 500;
		const height = 600;
		const svg = d3.select("#container")
						.append("svg")
						.attr("width", width)
						.attr("height", height);

		// draw metro schema
		// todo aspect ration
		let scaleX = d3.scaleLinear()
						.domain([0, schemaSize.width])
						.range([0, width]);
		let scaleY = d3.scaleLinear()
						.domain([0, schemaSize.height])
						.range([0, height]);	

		let schemaLine = d3.line()
				.x((d) => scaleX(d.X))
    			.y((d) => scaleY(d.Y));

    	const schema = svg
    					.append("g")
    					.attr("class", "schema");
    	/*schema
    		.selectAll(".line")
    		.data(lines)
    			.enter()
    		.append("path")
    			.attr("class", "line")
    			.attr("d", (d) => {
    				const isClosed = lineStyles[d.key].closed;
    				const curveType = isClosed
    									 ? d3.curveCardinalClosed
    									 : d3.curveCardinal;
    				schemaLine.curve(curveType.tension(0.75));
    				return schemaLine(d.values);
    			})
    			.style("fill", "none")
    			.style("stroke", (d) => lineStyles[d.key].fill)
    			.style("stroke-width", 3);
    	schema
    		.selectAll(".station")
    		.data(source, (d) => d.Name)
    			.enter()
    		.append("circle")
    			.attr("cx", (d) => scaleX(d.X))
    			.attr("cy", (d) => scaleY(d.Y))
    			.attr("r", 3)
    			.style("fill", (d) => lineStyles[d.Line].fill)
    			.style("stroke", "#fff")
		*/
    	// draw real lines
    	let latRange = d3.extent(source, (d) => d.Lat);
    	let scaleLat = d3.scaleLinear()
							.domain(latRange)
							.range([width, 0]);
		let lonRange = d3.extent(source, (d) => d.Lon);
		let scaleLon = d3.scaleLinear()
							.domain(lonRange)
							.range([0, height]);	

    	let realLine = d3.line()
				.x(function(d) { return scaleLon(d.Lon); })
    			.y(function(d) { return scaleLat(d.Lat); });

    	const realMetro = svg
    					.append("g")
    					.attr("class", "real");
    	realMetro
    		.selectAll(".line")
    		.data(lines)
    			.enter()
    		.append("path")
    			.attr("class", "line")
    			.attr("d", (d) => {
    				const isClosed = lineStyles[d.key].closed;
    				const curveType = isClosed
    									 ? d3.curveCardinalClosed
    									 : d3.curveCardinal;
    				realLine.curve(curveType.tension(0.75));
    				return realLine(d.values);
    			})
    			.style("fill", "none")
    			.style("stroke", (d) => lineStyles[d.key].fill)
    			.style("stroke-width", 2);

    	schema
    		.selectAll(".station")
    		.data(source, (d) => d.Name)
    			.enter()
    		.append("circle")
    			.attr("cx", (d) => scaleLon(d.Lon))
    			.attr("cy", (d) => scaleLat(d.Lat))
    			.attr("r", 3)
    			.style("fill", (d) => lineStyles[d.Line].fill)
    			.style("stroke", "#fff")


  })
	// сргуппировать по линиям
	// скалить схему 1000 * 1200
	// скалить гео
	// скалить цвета метро
// отрисовать схему метро с цветами линий
// отрисовать настоящее метро серым
// добавить цвета на настоящую линию
// сделать переход