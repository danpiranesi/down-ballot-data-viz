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

export function PropositionHistogram({ voteData }: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<d3.Selection<HTMLDivElement, unknown, HTMLElement, any>>();
  const SelectedProp = useContext(SelectedPropContext)
  const propositionName  = SelectedProp ?SelectedProp.name : '';

  useEffect(() => {
    console.log("UPDATED DATA")
    if (!svgRef.current || !containerRef.current) return;
      // clear all existing elements from the SVG
    d3.select(svgRef.current).selectAll("*").remove();

        // create tooltip
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

    // set the dimensions and margins of the graph
    const titleHeight = 40;
    const margin = { top: titleHeight, right: 0, bottom: 50, left: 70 },
      width = 800 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // set up SVG container
    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom + titleHeight)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

        // add Title
        svg
        .append('text')
        .attr('x', width / 2)
        .attr('y', -10) // position above the chart
        .attr('text-anchor', 'middle')
        .style('font-size', 18)
        .style('font-weight', 'bold')
        .style('fill', '#333')
        .text(propositionName || 'Select a Proposition');

  //d3.select(svgRef.current).call(zoom);
    // Extract the county names and voter data
    console.log("in hist, voteData is, ",voteData)
    const counties = (Array.isArray(voteData) ? voteData : []).map((d) => d.county_name);

    // Define scales
    const x = d3
      .scaleBand()
      .domain(counties)
      .range([0, width])
      .padding(0.2);

    // More explicitly handle the domain calculation with proper typing
    let maxValue = 0;
    if (Array.isArray(voteData) && voteData.length > 0) {
      maxValue = voteData.reduce((max, d) => {
        const total = (typeof d.yes_count === 'number' ? d.yes_count : Number(d.yes_count)) + 
                     (typeof d.no_count === 'number' ? d.no_count : Number(d.no_count));
        return total > max ? total : max;
      }, 0);
    }

    const y = d3
      .scaleLinear()
      .domain([0, maxValue])
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
      .attr('stroke-width', .4);


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
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end')
      .style('font-size', '12px') // Increase font size
    .style('font-weight', 'bold') // Make font bold
    .style('opacity', '0');

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

    const stackedData = d3
      .stack()
      .keys(['yes_count', 'no_count'])
      (voteData as any) ;

      const color = d3
      .scaleOrdinal()
      .domain(['yesVotes', 'noVotes'])
      .range(['#810f7c', '#b3cde3',]);


        // Set zoom and pan features
  const zoom = d3
  .zoom()
  .scaleExtent([1, 30]) // limit zoom range: 1 means no zooming out smaller than the SVG
  .extent([
    [0, 0],
    [width, height],
  ])
  .translateExtent([
    [0, 0],
    [width, height],
  ]) // Limit panning
  .on('zoom', updateChart);
// Add zoom interaction rectangle
/*
scatter
  .append('rect')
  .attr('class', 'zoom-rect')
  .attr('width', width)
  .attr('height', height)
  .style('fill', 'none')
  .style('pointer-events', 'all') // Enable capturing zoom events
  .attr('transform', 'translate(0, 0)')
  .call(zoom);
  */

  // Apply zooming capabilities to the whole svg
  d3.select(svgRef.current).call(zoom as any);

// Draw bars
const bars = scatter
.append('g')
.attr('class', 'bars')
.selectAll('g')
.data(stackedData)
.enter()
.append('g')
// @ts-ignore
.attr('fill', function(d) {
  return color(d.key); 
});

// @ts-ignore
bars.selectAll('rect')
// @ts-ignore
.data(d => d)
.enter()
.append('rect')
// @ts-ignore
.attr('x', d => x(d.data.county_name))
// @ts-ignore
.attr('y', d => y(d[1]))
// @ts-ignore
.attr('height', d => y(d[0]) - y(d[1]))
.attr('width', x.bandwidth())
// @ts-ignore
.attr('data-key', (d) => d.data.County)
.style('stroke', '#000000')
.on('mouseenter', function (d) {
  const mouseX = d3.mouse(document.body)[0];
  const mouseY = d3.mouse(document.body)[1];
  d3.select(this).style('opacity', 0.7); // highlight the bar
  const countyName = d.data.county_name;
  const yesVotes = d.data.yes_count;
  const noVotes = d.data.no_count;
  tooltip
    .style('opacity', 1)
    .html(
      `<div class="font-medium text-gray-900 mb-1">${countyName} County</div>
       <div class="text-gray-700">
       Votes For: ${yesVotes.toLocaleString()}<br/>
       Votes Against: ${noVotes.toLocaleString()}<br/>
       Total Votes: ${(yesVotes + noVotes).toLocaleString()}</div>`
    )
    .style('left', mouseX + 10 + 'px')
    .style('top', mouseY - 20 + 'px');
})
.on('mousemove', function () {
  const mouseX = d3.mouse(document.body)[0];
  const mouseY = d3.mouse(document.body)[1];
  tooltip
    .style('left', mouseX + 10 + 'px')
    .style('top', mouseY - 20 + 'px');
})
.on('mouseleave', function () {
  d3.select(this).style('opacity', 1); // Reset opacity
  tooltip.style('opacity', 0); // Hide tooltip
});



    // Linear scale for the zoom transformation
    const xLinear = d3
      .scaleLinear()
      .domain([0, counties.length])
      .range([0, width]);
      function updateChart() {
        // Recover the new scale from zoom event
        var t = d3.event.transform;
    
        // Limit side-to-side movement to keep the graph in bounds
        t.x = Math.min(0, Math.max(t.x, -width * (t.k - 1)));
        t.y = 0;
    
        var newX = t.rescaleX(xLinear);
    
        // Determine visible counties
        var visibleCounties = counties.filter((county, i) => {
          const xPos = newX(i);
          return xPos >= 0 && xPos <= width; // Check if county is within visible frame
        });
    
        // Calculate new Y domain based on visible counties
        let visibleMax = 0;
        visibleCounties.forEach(county => {
          const countyData = voteData?.find(d => d.county_name === county);
          if (countyData) {
            const total = (typeof countyData.yes_count === 'number' ? countyData.yes_count : Number(countyData.yes_count)) +
                         (typeof countyData.no_count === 'number' ? countyData.no_count : Number(countyData.no_count));
            if (total > visibleMax) visibleMax = total;
          }
        });
    
        //fade into visibility of x axis
      
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
        var newY = y.copy().domain([0, visibleMax || 1]);
    
        // Animate Y-axis transition
        yAxis
          .transition()
          .duration(500)
          .ease(d3.easeCubicOut)
          .call(d3.axisLeft(newY));
    
        // Compute the bar width with a maximum cap
        const barWidth = Math.min(newX(1) - newX(0), 40); // Cap bar width to 30px
    
        // Update bar positions and heights with animation
        svg
          .selectAll('.bars rect')
          .transition()
          .duration(500)
          .ease(d3.easeCubicOut)
          .attr('x', (d) => {
            // @ts-ignore
            return(newX(counties.indexOf(d.data.county_name)))}
          )
          .attr('width', barWidth)
          .attr('y', (d) => {
            // @ts-ignore
            return newY(d[1]);
          })
          // @ts-ignore
          .attr('height', (d) => newY(d[0]) - newY(d[1]));
        // Move ticks along the X-axis
        svg
          .selectAll('.x-axis .tick')
          .transition()
          .duration(500)
          .ease(d3.easeCubicOut)
          .attr(
            'transform',
            (d) =>
              'translate(' +
              // @ts-ignore
              (newX(counties.indexOf(d)) + barWidth * 0.5) +
              ',0)',
          );
      }

      return () => {
        if (tooltipRef.current) {
          tooltipRef.current.remove();
        }
      };
  }, [voteData]); // Re-render when voteData changes

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <svg ref={svgRef} id="histogram-svg" className="w-full h-full" />
    </div>
  );
}
