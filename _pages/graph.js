import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const data = await d3.json("projects.json");

// Specify the dimensions of the chart.
const width = 1000;
const height = 550;
const force = -500;
const label_dx = 10;
const label_dy = 1;
const offset = -75;

// Specify the color scale.
const color = d3.scaleOrdinal(["#6e40aa","#df40a1","#ff704e","#d2c934","#6bf75c","#1bd9ac","#3988e1","#6e40aa"]);

// The force simulation mutates links and nodes, so create a copy
// so that re-evaluating this cell produces the same result.
const links = data.links.map(d => ({...d}));
const nodes = data.nodes.map(d => ({...d}));

// Create a simulation with several forces.
const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id))
    .force("charge", d3.forceManyBody().strength(force))
    .force("center", d3.forceCenter(width / 2, height / 2 + offset))
    .on("tick", ticked);

// Create the SVG container.
const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

// Add a line for each link, and a circle for each node.
const link = svg.append("g")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.4)
    .selectAll()
    .data(links)
    .join("line")
    .attr("stroke-width", 2);

const node = svg.append("g")
    //.attr("stroke", "#fff")
    .attr("stroke-width", 5)
    .selectAll("g")
    .data(nodes)
    .join("g");

const circle = node.append("circle")
    .attr("fill", d => color(d.group))
    .attr("stroke-width", 1.5)
    .attr("r", 5);

const text = node.append("text")
    .attr("class", "graph-label")
    .attr("x", d => d.x)
    .attr("y", d => d.y)
    .attr("dx", label_dx)
    .attr("dy", label_dy)
    .attr("fill", d => color(d.group));

const hypertext = text.append("a")
    .attr("href", d => d.url)
    //.attr("target", "_blank")
    .attr("fill", d => color(d.group))
    .text(d => d.id);

// Add a drag behavior.
node.call(d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended));

// Set the position attributes of links and nodes each time the simulation ticks.
function ticked() {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
    
    node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
    
    circle
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);

    text
        .attr("x", d => d.x)
        .attr("y", d => d.y);

    hypertext
        .attr("x", d => d.x)
        .attr("y", d => d.y);
}

// Reheat the simulation when drag starts, and fix the subject position.
function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
}

// Update the subject (dragged node) position during drag.
function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
}

// Restore the target alpha so the simulation cools after dragging ends.
// Unfix the subject position now that it’s no longer being dragged.
function dragended(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
}

// When this cell is re-run, stop the previous simulation. (This doesn’t
// really matter since the target alpha is zero and the simulation will
// stop naturally, but it’s a good practice.)
//invalidation.then(() => simulation.stop());

landing_graph.append(svg.node());
