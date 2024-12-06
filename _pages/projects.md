---
layout: archive
title: Projects
permalink: /projects/
author_profile: true
---


<div id="graph"></div>

<script type="module">
  import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

  // Updated project data
  const data = {
    nodes: [
      { id: "DeMethify", url: "/demethify", group: 1 },
      { id: "Covid-19 ABM", url: "/covid-19-abm", group: 1 },
      { id: "Ovarian Cancer Drug Resistance", url: "/ovarian-cancer-drug-resistance", group: 2 },
      { id: "Lineage Barcode Library", url: "/lineage-barcode-library", group: 2 },
      { id: "Multi-modal Barcoding", url: "/multi-modal-barcoding", group: 3 },
      { id: "Bioethics", url: "/bioethics", group: 3 },
    ],
    links: [], // Placeholder; we'll add full connections dynamically below.
  };

  // Create fully connected graph
  data.nodes.forEach((nodeA, i) => {
    data.nodes.slice(i + 1).forEach(nodeB => {
      data.links.push({ source: nodeA.id, target: nodeB.id });
    });
  });

  const width = 1200; // Increased canvas width
  const height = 800; // Increased canvas height
  const nodeRadius = 20; // Larger node size
  const chargeStrength = -1000; // Increased spacing between nodes

  // Create SVG container
  const svg = d3.select("#graph")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height]);

  // Simulation setup
  const simulation = d3.forceSimulation(data.nodes)
    .force("link", d3.forceLink(data.links).id(d => d.id).distance(150))
    .force("charge", d3.forceManyBody().strength(chargeStrength))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .on("tick", ticked);

  // Add links
  const link = svg.append("g")
    .selectAll("line")
    .data(data.links)
    .join("line")
    .attr("stroke", "#aaa")
    .attr("stroke-width", 2);

  // Add nodes
  const node = svg.append("g")
    .selectAll("circle")
    .data(data.nodes)
    .join("circle")
    .attr("r", nodeRadius)
    .attr("fill", d => d3.schemeCategory10[d.group])
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

  // Add labels
  const labels = svg.append("g")
    .selectAll("text")
    .data(data.nodes)
    .join("text")
    .attr("dx", 25) // Offset for better readability
    .attr("dy", 5)
    .text(d => d.id)
    .attr("font-size", "14px")
    .attr("fill", "#333")
    .on("click", d => window.location = d.url);

  // Ticked function to update positions
  function ticked() {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    node
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);

    labels
      .attr("x", d => d.x)
      .attr("y", d => d.y);
  }

  // Drag event functions
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
</script>
