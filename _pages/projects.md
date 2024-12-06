---
layout: archive
title: Projects
permalink: /projects/
author_profile: true
---

blabla
<div id="graph"></div>

<script type="module">
  import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

  const data = {
    nodes: [
      { id: "DeMethify", group: 1, url: "/demethify" },
      { id: "Covid-19 ABM", group: 2, url: "/covid-19-abm" },
      { id: "Ovarian Cancer Drug Resistance", group: 3, url: "/ovarian-cancer" },
      { id: "Lineage Barcode Library", group: 4, url: "/lineage-barcode" },
      { id: "Multi-modal Barcoding", group: 5, url: "/multi-modal-barcoding" },
      { id: "Bioethics", group: 6, url: "/bioethics" },
    ],
    links: [
      { source: "DeMethify", target: "Covid-19 ABM" },
      { source: "DeMethify", target: "Ovarian Cancer Drug Resistance" },
      { source: "DeMethify", target: "Lineage Barcode Library" },
      { source: "DeMethify", target: "Multi-modal Barcoding" },
      { source: "DeMethify", target: "Bioethics" },
      { source: "Covid-19 ABM", target: "Ovarian Cancer Drug Resistance" },
      { source: "Covid-19 ABM", target: "Lineage Barcode Library" },
      { source: "Covid-19 ABM", target: "Multi-modal Barcoding" },
      { source: "Covid-19 ABM", target: "Bioethics" },
      { source: "Ovarian Cancer Drug Resistance", target: "Lineage Barcode Library" },
      { source: "Ovarian Cancer Drug Resistance", target: "Multi-modal Barcoding" },
      { source: "Ovarian Cancer Drug Resistance", target: "Bioethics" },
      { source: "Lineage Barcode Library", target: "Multi-modal Barcoding" },
      { source: "Lineage Barcode Library", target: "Bioethics" },
      { source: "Multi-modal Barcoding", target: "Bioethics" },
    ],
  };

  const width = 1200;
  const height = 800;

  const svg = d3.select("#graph")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const simulation = d3.forceSimulation(data.nodes)
    .force("link", d3.forceLink(data.links).id(d => d.id).distance(150))
    .force("charge", d3.forceManyBody().strength(-500))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .on("tick", ticked);

  const link = svg.append("g")
    .selectAll("line")
    .data(data.links)
    .join("line")
    .attr("stroke", "#aaa")
    .attr("stroke-width", 2);

  const node = svg.append("g")
    .selectAll("circle")
    .data(data.nodes)
    .join("circle")
    .attr("r", 15) // Increased node size
    .attr("fill", (d, i) => d3.schemeTableau10[i % 10])
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

  const labels = svg.append("g")
    .selectAll("text")
    .data(data.nodes)
    .join("text")
    .attr("dx", 20)
    .attr("dy", ".35em")
    .text(d => d.id)
    .style("font-size", "14px")
    .style("fill", "#333")
    .style("pointer-events", "none");

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

