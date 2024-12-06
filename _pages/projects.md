---
layout: archive
title: Projects
permalink: /projects/
author_profile: true
---

<div id="network-graph" style="width: 100%; height: 600px;"></div>

<script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
<script>
  // Data for the network visualization
  const data = {
    nodes: [
      { id: "Project A", group: 1, url: "/projects/project-a" },
      { id: "Project B", group: 2, url: "/projects/project-b" },
      { id: "Project C", group: 3, url: "/projects/project-c" },
      { id: "Project D", group: 4, url: "/projects/project-d" }
    ],
    links: [
      { source: "Project A", target: "Project B" },
      { source: "Project A", target: "Project C" },
      { source: "Project B", target: "Project D" },
      { source: "Project C", target: "Project D" }
    ]
  };

  // Dimensions
  const width = 1000, height = 600;

  // Create an SVG element
  const svg = d3.select("#network-graph")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Create a simulation
  const simulation = d3.forceSimulation(data.nodes)
    .force("link", d3.forceLink(data.links).id(d => d.id).distance(100))
    .force("charge", d3.forceManyBody().strength(-300))
    .force("center", d3.forceCenter(width / 2, height / 2));

  // Add links
  const link = svg.append("g")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(data.links)
    .join("line")
    .attr("stroke-width", 2);

  // Add nodes
  const node = svg.append("g")
    .selectAll("circle")
    .data(data.nodes)
    .join("circle")
    .attr("r", 10)
    .attr("fill", d => d3.schemeCategory10[d.group % 10])
    .call(drag(simulation));

  // Add labels with links
  const label = svg.append("g")
    .selectAll("text")
    .data(data.nodes)
    .join("text")
    .attr("dy", -15) // Position labels slightly above nodes
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .style("pointer-events", "none"); // Prevent text from blocking dragging

  label.append("a")
    .attr("xlink:href", d => d.url) // Set link to project page
    .attr("target", "_blank") // Open link in a new tab
    .style("text-decoration", "underline")
    .append("tspan")
    .style("pointer-events", "all") // Re-enable pointer-events for links
    .text(d => d.id);

  // Update positions on tick
  simulation.on("tick", () => {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    node
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);

    label
      .attr("x", d => d.x)
      .attr("y", d => d.y);
  });

  // Drag functionality
  function drag(simulation) {
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  }
</script>

