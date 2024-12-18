'use client';

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3'; // Updated to latest D3
import { VoteData } from '@/types/propdata';

type MapProps = {
  prop1VoteData?: VoteData[];
  prop2VoteData?: VoteData[];
};

type CountyProperties = {
  name: string;
  [key: string]: any;
};

export function ComparisonVisual({
  prop1VoteData = [],
  prop2VoteData = [],
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<d3.Selection<HTMLDivElement, unknown, HTMLElement, any> | null>(null);

  useEffect(() => {
    // Clone the appropriate vote data
    const voteData: VoteData[] = prop2VoteData.length > 0
      ? structuredClone(prop2VoteData)
      : structuredClone(prop1VoteData);

    console.log("UPDATED DATA");

    // Proceed only if SVG and container are available
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
    const margin = { top: 10, right: 0, bottom: 50, left: 70 },
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
    console.log("in hist, voteData is:", voteData);
    const counties = voteData.map((d) => d.county_name);

    // Define scales
    const x = d3
      .scaleBand<string>() // Explicitly define scaleBand with string type
      .domain(counties)
      .range([0, width * 2])
      .paddingInner(0.65)
      .paddingOuter(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, 100])
      .nice()
      .range([height, 0]);

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
    const xAxis = scatter
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .call(d3.axisBottom(x).tickSizeInner(6))
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
        return 'translate(' + (xPos + x.bandwidth()) + ',0)';
      });

    // Add the Y-axis label
    const yAxisLabel = svg
      .append('text')
      .attr('class', 'y-axis-label')
      .attr('x', -height / 2) // Center vertically
      .attr('y', -margin.left + 20) // Adjust for spacing
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .text('Percent Votes In Favor %');

    // Append Y-axis
    const yAxis = svg.append('g').call(d3.axisLeft(y));

    const barSpacing = 2; // Space between bars in the same county

    // Draw bars for prop1VoteData
    if (prop1VoteData.length > 0) {
      scatter
        .append('g')
        .attr('class', 'bars')
        .selectAll<SVGRectElement, VoteData>('rect')
        .data(prop1VoteData)
        .enter()
        .append('rect')
        .attr('x', (d) => x(d.county_name) || 0) // Provide fallback value
        .attr('y', (d) => {
          const percentYes = (d.yes_count) / (d.yes_count + d.no_count) * 100;
          console.log("vote% ", y(percentYes));
          return y(percentYes);
        })
        .attr('width', x.bandwidth())
        .attr('height', (d) => height - y((d.yes_count) / (d.yes_count + d.no_count) * 100))
        .attr('fill', '#998ec3') // Purple for "prop 1"
        .style('stroke', '#000000')
        .on('mouseenter', function (event, d) {
          const [mouseX, mouseY] = d3.pointer(event, document.body);
          d3.select(this).style('opacity', 0.7); // Highlight the bar
          const countyName = d.county_name;
          const yesVotes = d.yes_count;
          const noVotes = d.no_count;
          tooltipRef.current
            ?.style('opacity', 1)
            ?.html(
              `<div class="font-medium text-gray-900 mb-1">${countyName} County</div>
               <div class="text-gray-700">
               Votes For: ${yesVotes.toLocaleString()}<br/>
               Votes Against: ${noVotes.toLocaleString()}<br/>
               Total Votes: ${(yesVotes + noVotes).toLocaleString()}</div>`
            )
            ?.style('left', mouseX + 10 + 'px')
            ?.style('top', mouseY - 20 + 'px');
        })
        .on('mousemove', function (event) {
          const [mouseX, mouseY] = d3.pointer(event, document.body);
          tooltipRef.current
            ?.style('left', mouseX + 10 + 'px')
            ?.style('top', mouseY - 20 + 'px');
        })
        .on('mouseleave', function () {
          d3.select(this).style('opacity', 1); // Reset opacity
          tooltipRef.current?.style('opacity', 0); // Hide tooltip
        });
    }

    // Draw bars for prop2VoteData
    if (prop2VoteData.length > 0) {
      scatter
        .append('g')
        .attr('class', 'bars2')
        .selectAll<SVGRectElement, VoteData>('rect')
        .data(prop2VoteData)
        .enter()
        .append('rect')
        .attr('x', (d) => (x(d.county_name) || 0) + x.bandwidth() * 1.3)
        .attr('y', (d) => y((d.yes_count) / (d.yes_count + d.no_count) * 100))
        .attr('width', x.bandwidth())
        .attr('height', (d) => height - y((d.yes_count) / (d.yes_count + d.no_count) * 100))
        .attr('fill', '#f1a340') // Orange for prop 2
        .style('stroke', '#000000')
        .on('mouseenter', function (event, d) {
          const [mouseX, mouseY] = d3.pointer(event, document.body);
          d3.select(this).style('opacity', 0.7); // Highlight the bar
          const countyName = d.county_name;
          const yesVotes = d.yes_count;
          const noVotes = d.no_count;
          tooltipRef.current
            ?.style('opacity', 1)
            ?.html(
              `<div class="font-medium text-gray-900 mb-1">${countyName} County</div>
               <div class="text-gray-700">
               Votes For: ${yesVotes.toLocaleString()}<br/>
               Votes Against: ${noVotes.toLocaleString()}<br/>
               Total Votes: ${(yesVotes + noVotes).toLocaleString()}</div>`
            )
            ?.style('left', mouseX + 10 + 'px')
            ?.style('top', mouseY - 20 + 'px');
        })
        .on('mousemove', function (event) {
          const [mouseX, mouseY] = d3.pointer(event, document.body);
          tooltipRef.current
            ?.style('left', mouseX + 10 + 'px')
            ?.style('top', mouseY - 20 + 'px');
        })
        .on('mouseleave', function () {
          d3.select(this).style('opacity', 1); // Reset opacity
          tooltipRef.current?.style('opacity', 0); // Hide tooltip
        });
    }

    // Set zoom and pan features
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 30]) // Limit zoom range: 1 means no zooming out smaller than the SVG
      .extent([
        [0, 0],
        [width, height],
      ])
      .translateExtent([
        [0, 0],
        [width, height],
      ]) // Limit panning
      .on('zoom', updateChart);

    d3.select(svgRef.current).call(zoom);

    const xLinear = d3
      .scaleLinear()
      .domain([0, counties.length])
      .range([0, width]);

    function updateChart(event: any) { // Updated to accept event
      // Recover the new scale from zoom event
      const t = event.transform;

      // Limit side-to-side movement to keep the graph in bounds
      t.x = Math.min(0, Math.max(t.x, -width * (t.k - 1)));
      t.y = 0;

      const newX = t.rescaleX(xLinear);

      // Determine visible counties
      const visibleCounties = counties.filter((county, i) => {
        const xPos = newX(i);
        return xPos >= 0 && xPos <= width; // Check if county is within visible frame
      });

      // Calculate new Y domain based on visible counties
      const visibleMax = d3.max(visibleCounties, (county) => {
        const countyData = voteData.find((d) => d.county_name === county);
        return countyData ? 100 : 0;
      });

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
      const newY = y.copy().domain([0, visibleMax || 1]);

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
        .attr('x', (d) => {
          const index = counties.indexOf(d.county_name);
          return newX(index) !== undefined ? newX(index)! : 0;
        })
        .attr('width', barWidth) // Use the computed bar width
        .attr('y', (d) => newY((d.yes_count) / (d.yes_count + d.no_count) * 100))
        .attr('height', (d) => height - newY((d.yes_count) / (d.yes_count + d.no_count) * 100));

      // Update bar positions and heights with animation for prop2 bars
      svg
        .selectAll('.bars2 rect')
        .transition()
        .duration(500)
        .ease(d3.easeCubicOut)
        .attr('x', (d) => {
          const index = counties.indexOf(d.county_name);
          return newX(index) !== undefined ? newX(index)! + barWidth * 1.3 : barWidth * 1.3;
        })
        .attr('width', barWidth) // Use the computed bar width
        .attr('y', (d) => newY((d.yes_count) / (d.yes_count + d.no_count) * 100))
        .attr('height', (d) => height - newY((d.yes_count) / (d.yes_count + d.no_count) * 100));

      // Move ticks along the X-axis with type-safe transformation
      svg
        .selectAll('.x-axis .tick')
        .transition()
        .duration(500)
        .ease(d3.easeCubicOut)
        .attr('transform', (d: string) => {
          const index = counties.indexOf(d);
          const xPos = newX(index);
          if (xPos === undefined) {
            return 'translate(0,0)'; // Fallback position
          }
          return 'translate(' + (xPos + barWidth * 1.15) + ',0)';
        });
    }

    console.log('hello');

    return () => {
      if (tooltipRef.current) {
        tooltipRef.current.remove();
      }
      // Optionally, remove all SVG elements to clean up
      d3.select(svgRef.current).selectAll("*").remove();
    };
  }, [prop1VoteData, prop2VoteData]); // Re-run effect when voteData changes

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
}


