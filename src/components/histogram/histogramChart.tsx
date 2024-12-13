'use client';

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3-v4';
import { VoteData } from '@/types/propdata';

type MapProps = {
  propositionId?: number;
  year?: number;
  voteData: VoteData[];
}

interface CountyData {
  County: string; // The name or identifier of the county
  [key: string]: any; // Other properties (e.g., values for categories, etc.)
}

export function PropositionHistogram({ propositionId, year, voteData }: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("UPDATED DATA")
    if (!svgRef.current || !containerRef.current) return;

    // Set the dimensions and margins of the graph
    const margin = { top: 10, right: 0, bottom: 50, left: 50 },
      width = 800 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // Set up SVG container
    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Extract the county names and voter data
    console.log("in hist, voteData is, ",voteData)
    const counties = voteData.map((d) => d.county_name);

    // Define scales
    const x = d3
      .scaleBand()
      .domain(counties)
      .range([0, width])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(voteData, (d) => d.yes_count + d.no_count) as number])
      .nice()
      .range([height, 0]);

    const color = d3
      .scaleOrdinal()
      .domain(['yesVotes', 'noVotes'])
      .range(['#7fbf7b', '#af8dc3']);

    // Create a clipPath
    const clip = svg
      .append('defs')
      .append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('width', width)
      .attr('height', height + 100)
      .attr('x', 0)
      .attr('y', 0);

    // Create the scatter group
    const scatter = svg
      .append('g')
      .attr('clip-path', 'url(#clip)');

    // Append X-axis
    scatter
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    // Append Y-axis
    const yAxis = svg.append('g').call(d3.axisLeft(y));


    // Create tooltip
    const tooltip = d3
      .select(containerRef.current)
      .append('div')
      .style('opacity', 0)
      .attr('class', 'tooltip')
      .style('background-color', 'white')
      .style('border', 'solid')
      .style('border-width', '1px')
      .style('border-radius', '5px')
      .style('padding', '10px');

    // Stack the data for grouped bars
    // const stackedData = d3
    //   .stack()
    //   .keys(['yes_count', 'no_count'])
    //   (voteData.map(d => ({
    //     yes_count: d.yes_count,
    //     no_count: d.no_count,
    //   })));


    const stackedData = d3
      .stack()
      .keys(['yes_count', 'no_count'])
      (voteData as any) ;

    // Draw bars
    scatter
      .append('g')
      .attr('class', 'bars')
      .selectAll('g')
      .data(stackedData)
      .enter()
      .append('g')
      .attr('fill', (d) => color(d.key)  as string)
      .selectAll('rect')
      .data((d) => d)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.data.county_name))
      .attr('y', (d) => (y(d[1])))
      
      .attr('height', (d) => y(d[0]) - y(d[1]))
      .attr('width', x.bandwidth())
      .attr('data-key', (d) => d.data.County);


    // Zoom functionality
    const zoom = d3
      .zoom()
      .scaleExtent([0.5, 20]) // Control zoom range
      .extent([[0, 0], [width, height]]) // Zoom area extent
      .translateExtent([[0, 0], [width, height]]) // Limit panning
      .on('zoom', updateChart);

    // Add zoom interaction rectangle
    svg
      .append('rect')
      .attr('width', width)
      .attr('height', height)
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
      //.call(zoom);

    // Linear scale for the zoom transformation
    const xLinear = d3
      .scaleLinear()
      .domain([0, counties.length])
      .range([0, width]);

    // Update chart during zoom
    function updateChart(event: any) {
      const t = event.transform;

      // Limit side-to-side movement to not take the graph out of bounds
      t.x = Math.min(0, Math.max(t.x, -width * (t.k - 1)));
      t.y = 0;

      const newX = t.rescaleX(xLinear);
      const newY = t.rescaleY(y);
      newY.domain([0, d3.max(voteData, (d) => d.yes_count + d.no_count)]); // Maintain domain starting from 0

      // Update Y-axis
      yAxis.call(d3.axisLeft(newY));

      // Move X-axis ticks
      svg
        .selectAll('.x-axis .tick')
        .attr('transform', (d: any) => 
          'translate(' +
          (newX(counties.indexOf(d)) + (newX(1) - newX(0)) * 0.25) +
          ',0)'
        );

      // Update bar positions
      svg
        .selectAll('.bars rect')
        .attr('width', (newX(1) - newX(0)) * 0.5) // Adjust bar width for zoom
        .attr('x', (d: any) => newX(counties.indexOf(d.data.County)));
    }

    // Cleanup function
    return () => {
      tooltip.remove();
    };
  }, [voteData]); // Re-render when voteData changes

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
}
