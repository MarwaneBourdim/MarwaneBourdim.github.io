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
      { id: "DeMethify", group: 1, url: "/demethify" },
      { id: "Covid-19 ABM", group: 2, url: "/covid-19-abm" },
      { id: "Lineage barcode library", group: 3, url: "/lineage-barcode-library" },
      { id: "Ovarian cancer drug resistance", group: 4, url: "/ovarian-cancer-drug-resistance" },
      { id: "Multi-modal barcoding", group: 5, url: "/multi-modal-barcoding" },
      { id: "Bioethics", group: 6, url: "/bioethics" },
    ],
    links: [
      { source: "DeMethify", target: "Covid-19 ABM" },
      { source: "DeMethify", target: "Lineage barcode library" },
      { source: "DeMethify", target: "Ovarian cancer drug resistance" },
      { source: "DeMethify", target: "Multi-modal barcoding" },
      { source: "DeMethify", target: "Bioethics" },
      { source: "Covid-19 ABM", target: "Lineage barcode library" },
      { source: "Covid-19 ABM", target: "Ovarian cancer drug resistance" },
      { source: "Covid-19 ABM", target: "Multi-modal barcoding" },
      { source: "Covid-19 ABM", target: "Bioethics" },
      { source: "Lineage barcode library", target: "Ovarian cancer drug resistance" },
      { source: "Lineage barcode library", target: "Multi-modal barcoding" },
      { source: "Lineage barcode library", target: "Bioethics" },
      { source: "Ovarian cancer drug resistance", target: "Multi-modal barcoding" },
      { source: "Ovarian cancer drug resistance", target: "Bioethics" },
      { source: "Multi-modal barcoding", target: "Bioethics" },
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
    .on("click", d => d.url);

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
