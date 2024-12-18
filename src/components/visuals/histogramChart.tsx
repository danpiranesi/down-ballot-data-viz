'use client';

import React, { useEffect, useRef, useContext } from 'react';
import * as d3 from 'd3-v4';
import { VoteData } from '@/types/propdata';
import { VoteDataContext } from '@/context/VoteDataContext';
import { SelectedPropContext } from '@/context/SelectedPropContext';

type MapProps = {
  propositionId?: number;
  year?: number;
  voteData?: VoteData[];
}

interface CountyData {
  County: string; // the name or identifier of the county
  [key: string]: any; // other properties (e.g., values for categories, etc.)
}

export function PropositionHistogram({ voteData = [] }: MapProps) { // Provide default value
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<d3.Selection<HTMLDivElement, unknown, HTMLElement, any> | null>(null);
  const { name: propositionName } = useContext(SelectedPropContext);

  useEffect(() => {
    console.log("UPDATED DATA");
    if (!svgRef.current || !containerRef.current) return;

    // Clear all existing elements from the SVG
    d3.select(svgRef.current).selectAll("*").remove();

    // Create tooltip
    const tooltip = d3.select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('background-color', 'white')
      .style('padding', '10px')
      .style('border', '1px solid #ddd')
      .style('border-radius', '4px')
      .style('pointer-events', 'none')
      .style('box-shadow', '0 2px 4px rgba(0,0,0,0.1)')
      .style('color', '#374151') 
      .style('font-size', '14px');

    tooltipRef.current = tooltip;

    // Set the dimensions and margins of the graph
    const titleHeight = 40;
    const margin = { top: titleHeight, right: 0, bottom: 50, left: 70 },
      width = 800 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // Set up SVG container
    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom + titleHeight)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Add Title
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', -10) // position above the chart
      .attr('text-anchor', 'middle')
      .style('font-size', '18px')
      .style('font-weight', 'bold')
      .style('fill', '#333')
      .text(propositionName || 'Select a Proposition');

    // Extract the county names and voter data
    console.log("in hist, voteData is:", voteData);
    const counties = voteData.map((d) => d.county_name);

    // Define scales
    const x = d3
      .scaleBand<string>()
      .domain(counties)
      .range([0, width])
      .padding(0.2);

    // Handle d3.max safely
    const maxVotes = d3.max(voteData, (d: VoteData) => d.yes_count + d.no_count) || 0;

    const y = d3
      .scaleLinear()
      .domain([0, maxVotes])
      .nice()
      .range([height, 0]);

    svg
      .append('defs')
      .append('pattern')
      .attr('id', 'diagonalHatch_hover')
      .attr('patternUnits', 'userSpaceOnUse')
      .attr('width', 4)
      .attr('height', 4)
      .append('path')
      .attr('d', 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2')
      .attr('stroke', '#ccc')
      .attr('stroke-width', 0.4);

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

    // Add an initial label "Counties"
    const xAxisLabel = svg
      .append('text')
      .attr('class', 'x-axis-label')
      .attr('x', width / 2)
      .attr('y', height + 35)
      .attr('text-anchor', 'middle')
      .style('font-size', '24px')
      .style('font-weight', 'bold')
      .text('Counties');

    // Append X-axis
    scatter
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end')
      .style('font-size', '12px') // Increase font size
      .style('font-weight', 'bold') // Make font bold
      .style('opacity', '0');

    // Adjust tick positions with type-safe transformation
    scatter
      .selectAll<SVGGElement, string>('.x-axis .tick')
      .attr('transform', function (d: string) {
        const xPos = x(d);
        if (xPos === undefined) {
          return 'translate(0,0)'; // Fallback position
        }
        return `translate(${xPos + x.bandwidth()},0)`;
      });

    // Add the Y-axis label
    const yAxisLabel = svg
      .append('text')
      .attr('class', 'y-axis-label')
      .attr('x', -height / 2) 
      .attr('y', -margin.left + 20) 
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .text('Total Votes');

    // Append Y-axis
    const yAxis = svg.append('g').call(d3.axisLeft(y));

    // Prepare stacked data
    const stackedData = d3
      .stack()
      .keys(['yes_count', 'no_count'])
      (voteData as any);

    const color = d3
      .scaleOrdinal<string>()
      .domain(['yes_count', 'no_count'])
      .range(['#810f7c', '#b3cde3']);

    // Set zoom and pan features with translateExtent
    const zoom = d3
      .zoom()
      .scaleExtent([1, 30]) // Limit zoom range
      .translateExtent([
        [0, 0],
        [width, height],
      ]) // Define panning boundaries
      .on('zoom', updateChart);

    d3.select(svgRef.current).call(zoom);

    // Linear scale for the zoom transformation
    const xLinear = d3
      .scaleLinear()
      .domain([0, counties.length])
      .range([0, width]);

    function updateChart() {
      // Recover the new scale from zoom event
      var t = d3.event.transform;

      // Remove attempts to mutate t.x and t.y

      var newX = t.rescaleX(xLinear);

      // Determine visible counties
      var visibleCounties = counties.filter((county, i) => {
        const xPos = newX(i);
        return xPos >= 0 && xPos <= width; // Check if county is within visible frame
      });

      // Calculate new Y domain based on visible counties
      const visibleMax = d3.max(visibleCounties, (county) => {
        const countyData = voteData.find(
          (d) => d.county_name === county,
        );
        return countyData
          ? (countyData.yes_count + countyData.no_count)
          : 0;
      }) || 1; // Ensure at least 1 to prevent zero domain

      // Fade into visibility of x axis
      if (t.k > 2.1) {
        xAxisLabel
          .transition()
          .duration(100)
          .style('opacity', 0);
        scatter
          .selectAll('text')
          .transition()
          .duration(100)
          .style('opacity', '1');
      } else {
        xAxisLabel
          .transition()
          .duration(100)
          .style('opacity', 1);
        scatter
          .selectAll('text')
          .transition()
          .duration(100)
          .style('opacity', '0');
      }

      // Update the Y scale domain dynamically to fit visible bars
      var newY = y.copy().domain([0, visibleMax]);

      // Animate Y-axis transition
      yAxis
        .transition()
        .duration(500)
        .ease(d3.easeCubicOut)
        .call(d3.axisLeft(newY));

      // Compute the bar width with a maximum cap
      const barWidth = Math.min(newX(1) - newX(0), 40); // Cap bar width to 40px

      // Update bar positions and heights with animation for prop1 bars
      svg
        .selectAll('.bars rect')
        .transition()
        .duration(500)
        .ease(d3.easeCubicOut)
        .attr('x', (d: VoteData) => {
          const index = counties.indexOf(d.county_name);
          return newX(index) !== undefined ? newX(index) : 0;
        })
        .attr('width', barWidth) // Use the computed bar width
        .attr('y', (d: VoteData) => newY((d.yes_count) / (d.yes_count + d.no_count) * 100))
        .attr('height', (d: VoteData) => height - newY((d.yes_count) / (d.yes_count + d.no_count) * 100));

      // Update bar positions and heights with animation for prop2 bars
      svg
        .selectAll('.bars2 rect')
        .transition()
        .duration(500)
        .ease(d3.easeCubicOut)
        .attr('x', (d: VoteData) => {
          const index = counties.indexOf(d.county_name);
          return newX(index) !== undefined ? newX(index) + barWidth * 1.3 : barWidth * 1.3;
        })
        .attr('width', barWidth) // Use the computed bar width
        .attr('y', (d: VoteData) => newY((d.yes_count) / (d.yes_count + d.no_count) * 100))
        .attr('height', (d: VoteData) => height - newY((d.yes_count) / (d.yes_count + d.no_count) * 100));

      // Move ticks along the X-axis
      svg
        .selectAll<SVGGElement, string>('.x-axis .tick')
        .transition()
        .duration(500)
        .ease(d3.easeCubicOut)
        .attr('transform', (d: string) => {
          const index = counties.indexOf(d);
          const xPos = newX(index);
          if (xPos === undefined) {
            return 'translate(0,0)'; // Fallback position
          }
          return `translate(${xPos + barWidth * 0.5},0)`;
        });
    }

    return () => {
      if (tooltipRef.current) {
        tooltipRef.current.remove();
      }
      // Optionally, remove all SVG elements to clean up
      d3.select(svgRef.current).selectAll("*").remove();
    };
  }, [voteData]); // Re-run effect when voteData changes

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <svg ref={svgRef} id="histogram-svg" className="w-full h-full" />
    </div>
  );
}

export default PropositionHistogram;

