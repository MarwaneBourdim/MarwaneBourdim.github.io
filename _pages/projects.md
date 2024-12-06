---
layout: archive
title: Projects
permalink: /projects/
author_profile: true
---

<div id="network" style="width: 100%; height: 600px; border: 1px solid #ccc;"></div>

<script src="https://d3js.org/d3.v7.min.js"></script>
<script>
    // Set dimensions based on the div's size
    const width = document.getElementById('network').offsetWidth;
    const height = 600;

    // Create an SVG container within the #network div
    const svg = d3.select("#network")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // Sample data for nodes and links
    const nodes = [
        { id: "Node 1" },
        { id: "Node 2" },
        { id: "Node 3" },
        { id: "Node 4" }
    ];

    const links = [
        { source: "Node 1", target: "Node 2" },
        { source: "Node 2", target: "Node 3" },
        { source: "Node 3", target: "Node 4" },
        { source: "Node 4", target: "Node 1" }
    ];

    // Create a simulation
    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(100))
        .force("charge", d3.forceManyBody().strength(-300))
        .force("center", d3.forceCenter(width / 2, height / 2));

    // Add link elements
    const link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(links)
        .enter()
        .append("line")
        .attr("stroke", "#999")
        .attr("stroke-width", 2);

    // Add node elements
    const node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("r", 10)
        .attr("fill", "#69b3a2")
        .call(d3.drag()
            .on("start", dragStart)
            .on("drag", dragging)
            .on("end", dragEnd)
        );

    // Add labels to nodes
    const label = svg.append("g")
        .selectAll("text")
        .data(nodes)
        .enter()
        .append("text")
        .attr("dx", 12)
        .attr("dy", ".35em")
        .text(d => d.id);

    // Update positions on each tick of the simulation
    simulation.on("tick", () => {
        link.attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node.attr("cx", d => d.x)
            .attr("cy", d => d.y);

        label.attr("x", d => d.x)
            .attr("y", d => d.y);
    });

    // Drag functions
    function dragStart(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragging(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragEnd(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
</script>
cx="579.2865822881386" cy="262.70333979833316"></circle><text class="graph-label" x="579.2865822881386" y="262.70333979833316" dx="10" dy="1" fill="#df40a1"><a href="fragments/" fill="#df40a1" x="579.2865822881386" y="262.70333979833316">journal of fragments</a></text></g><g cx="554.8213979346654" cy="183.36781004230698" style="touch-action: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"><circle fill="#df40a1" stroke-width="1.5" r="5" cx="554.8213979346654" cy="183.36781004230698"></circle><text class="graph-label" x="554.8213979346654" y="183.36781004230698" dx="10" dy="1" fill="#df40a1"><a href="aliene/" fill="#df40a1" x="554.8213979346654" y="183.36781004230698">aliene</a></text></g></g></svg></div>
