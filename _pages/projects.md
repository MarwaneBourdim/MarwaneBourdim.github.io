---
layout: archive
title: Projects
permalink: /projects/
author_profile: true
---

<div id="graph"></div>

<script type="module">
  import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

  const data = {
    nodes: [
      { id: "Project 1", group: 1, url: "/project-1" },
      { id: "Project 2", group: 2, url: "/project-2" },
      { id: "Project 3", group: 3, url: "/project-3" },
      { id: "Project 4", group: 4, url: "/project-4" },
    ],
    links: [
      { source: "Project 1", target: "Project 2" },
      { source: "Project 2", target: "Project 3" },
      { source: "Project 3", target: "Project 4" },
    ],
  };

  const width = 900;
  const height = 450;

  const svg = d3.select("#graph")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const simulation = d3.forceSimulation(data.nodes)
    .force("link", d3.forceLink(data.links).id(d => d.id).distance(200)) 
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2))
    .on("tick", ticked);

  const link = svg.append("g")
    .selectAll("line")
    .data(data.links)
    .join("line")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6);

  const node = svg.append("g")
    .selectAll("circle")
    .data(data.nodes)
    .join("circle")
    .attr("r", 10)
    .attr("fill", "steelblue")
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

  const labels = svg.append("g")
    .selectAll("text")
    .data(data.nodes)
    .join("text")
    .attr("dx", 10)
    .attr("dy", ".35em")
    .text(d => d.id)
    .on("click", d => window.location = d.url);

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
