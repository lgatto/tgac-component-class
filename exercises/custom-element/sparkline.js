const d3 = require("d3");

module.exports.render = function({
    el = required("el"),
    width = 100,
    height = 20,
    color = "black",
    points = [],
}) {

    // points = [{x:10, y:20}, {x:20, y:25}, {x:80, y:95}, {x:90, y:111}, {x:100, y:20}, {x:110, y:50}];

    const X_PADDING = 2;
    
    const xScale = d3.scale.linear()
	      .range([X_PADDING, width - X_PADDING])
	      .domain(d3.extent(points, (d) => d.x));

    const yScale = d3.scale.linear()
	      .range([height - 2, 2])
	      .domain(d3.extent(points, (d) => d.y));
    
    // function makeLine(points: Array,{x: number, y: number}>: svgPathString {}
    const makeLine = d3.svg.line()
	      .x(({x}) => xScale(x))
	      .y(({y}) => yScale(y))
    
    const update = d3.select(el)
	      .selectAll("svg")
	      .data([points])

    update.enter()
	.append("svg")
	.append("path")

    // update + enter
    update
	.attr("width", width + "px")
	.attr("height", height + "px")

    update.select("path")
	.attr("d", makeLine)
	.attr({
	    fill: "none",
	    stroke: color
	})

    const updatePoint = d3.select(el)
    	      .select("svg")
    	      .selectAll("circle")
    	      .data(points)

    const enterPoint = updatePoint
    	      .enter()
    	      .append("circle")
    	      .attr("r", width/50)
    	      .attr("fill", "black")

    updatePoint.attr("cx", (d) => xScale(d.x))
        .attr("cy", (d) => yScale(d.y))
        .on("click", (d) => {
            alert("you clicked: " + JSON.stringify(d));
        })
        
}


function required(name) {
    throw Error(`missing option: ${name}`);
}
