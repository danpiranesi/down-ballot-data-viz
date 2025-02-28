'use client';

import React, { useContext, useEffect, useRef } from 'react';
import * as d3 from 'd3-v4';
import {VoteData} from '@/types/propdata';
import { SelectedPropContext } from '@/context/SelectedPropContext';
import { ComparePropContext } from '@/context/ComparePropContext';


type MapProps = {
  prop1VoteData?: VoteData[];
  prop2VoteData?: VoteData[];

}

type CountyProperties = {
  name: string;
  [key: string]: any;
}

export function ComparisonVisual({prop1VoteData, prop2VoteData}: MapProps) {
  const SelectedProp1 = useContext(SelectedPropContext)
  const propositionName1  = SelectedProp1 ?SelectedProp1.name : '';
  const SelectedProp2 = useContext(ComparePropContext)
  const propositionName2  = SelectedProp2 ?SelectedProp2.name : '';
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<d3.Selection<HTMLDivElement, unknown, HTMLElement, any>>();


  useEffect(() => {
    var voteData: VoteData[] = [];
    
    if (prop2VoteData && prop2VoteData.length > 0) {
      voteData = structuredClone(prop2VoteData);
    }
    else if (prop1VoteData && prop1VoteData.length > 0) {
      voteData = structuredClone(prop1VoteData);
    }

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

      const titleHeight = 50; // Space for title
      const titleText = (propositionName1 && propositionName2) 
  ? propositionName1 + ' vs ' + propositionName2 
  : 'select 2 propositions';

// Append the main text to the SVG
const textElement = svg.append('text')
  .attr('x', width / 2)
  .attr('y', titleHeight / 2)
  .attr('text-anchor', 'middle')
  .attr('font-size', 18)
  .attr('font-weight', 'bold')
  .attr('fill', '#333');

// Append the first line (propositionName1 + ' vs')
textElement.append('tspan')
  .attr('x', width / 2)
  .attr('dy', 0) 
  .text(propositionName1 + ' vs');

// Append the second line (propositionName2 or 'select 2 propositions')
textElement.append('tspan')
  .attr('x', width / 2)
  .attr('dy', '1.2em') 
  .text(propositionName2);

      


    

  //d3.select(svgRef.current).call(zoom);
    // Extract the county names and voter data
    const counties = voteData.map((d) => d.county_name);



    // Define scales
    var x = d3
    .scaleBand()
    .domain(counties) // Map counties to bands
    .range([0, width * 2]) // Map bands to chart width
    .paddingInner(0.65) // Space within bands
    .paddingOuter(0.2); // Space on the outer edges


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
  var xAxis = scatter
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

      // Adjust tick positions
  scatter
  .selectAll('.x-axis .tick')
  .attr('transform', function (d) {
    // Move tick to center of bar
    return 'translate(' + ((x(d as string) || 0) + x.bandwidth()) + ',0)';
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
      // Draw bars
  // Draw bars
  if (prop1VoteData && prop1VoteData.length > 0) {
  scatter
    .append('g')
    .attr('class', 'bars')
    .selectAll('rect')
    .data(prop1VoteData)
    .enter()
    .append('rect')
    .attr('x', (d) => x(d.county_name as string) || 0)
    .attr('y', (d) => {
      return(y((d.yes_count)/(d.yes_count+d.no_count)*100));
    })
    .attr('width', x.bandwidth())
    .attr('height', (d) => height - (y((d.yes_count)/(d.yes_count+d.no_count)*100)))
    .attr('fill', '#998ec3') // purple for "prop 1"
    .style('stroke', '#000000')
    .on('mouseenter', function (d) {
      const mouseX = d3.mouse(document.body)[0];
      const mouseY = d3.mouse(document.body)[1];
      d3.select(this).style('opacity', 0.7); // Highlight the bar
      const countyName = d.county_name;
      const yesVotes = d.yes_count;
      const noVotes = d.no_count;
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
  }

  if (prop2VoteData && prop2VoteData.length > 0)  {
  scatter
    .append('g')
    .attr('class', 'bars2')
    .selectAll('rect')
    .data(prop2VoteData)
    .enter()
    .append('rect')
    .attr('x', (d) => (x(d.county_name as string) || 0) + x.bandwidth() * 1.3)
    .attr('y', (d) => (y((d.yes_count)/(d.yes_count+d.no_count)*100)))
    .attr('width', x.bandwidth())
    .attr('height', (d) => height - (y((d.yes_count)/(d.yes_count+d.no_count)*100)))
    .attr('fill', '#f1a340') // orange for prop 2
    .style('stroke', '#000000')
    .on('mouseenter', function (d) {
      const mouseX = d3.mouse(document.body)[0];
      const mouseY = d3.mouse(document.body)[1];
      d3.select(this).style('opacity', 0.7); // Highlight the bar
      const countyName = d.county_name;
      const yesVotes = d.yes_count;
      const noVotes = d.no_count;
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
  }

  // Set zoom and pan features
  const zoom = d3
    .zoom()
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

  // Add type assertion to fix the incompatibility
  d3.select(svgRef.current).call(zoom as any);

    /*
    // This add an invisible rect on top of the chart area. This rect can recover pointer events: necessary to understand when the user zoom
    svg
    .append('rect')
    .attr('width', width)
    .attr('height', height)
    .style('fill', 'none')
    .style('pointer-events', 'all')
    .attr(
      'transform',
      'translate(' + margin.left + ',' + margin.top + ')',
    )
    .call(zoom);
    */


    var xLinear = d3
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
        const visibleMax = d3.max(visibleCounties, (county) => {
          // Add null check before using find
          const countyData = voteData?.find(
            (d) => d.county_name === county,
          );
          return countyData
            ? (100)
            : 0;
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
            //console.log('data: ' + d.data.county_name);
            // Add type assertion to d
            return(newX(counties.indexOf((d as VoteData).county_name)))}
          )
          .attr('width', barWidth) // Use the computed bar width
          .attr('y', (d) => {
            return (newY(((d as VoteData).yes_count)/((d as VoteData).yes_count+(d as VoteData).no_count)*100));
          })
          .attr('height', (d) => height - (newY(((d as VoteData).yes_count)/((d as VoteData).yes_count+(d as VoteData).no_count)*100)));
          

          svg
          .selectAll('.bars2 rect')
          .transition()
          .duration(500)
          .ease(d3.easeCubicOut)
          .attr('x', (d) => {
            //console.log('data: ' + d.data.county_name);
            // Add type assertion to d
            return(newX(counties.indexOf((d as VoteData).county_name))+ barWidth*1.3)}
          )
          .attr('width', barWidth) // Use the computed bar width
          .attr('y', (d) => {
            return (newY(((d as VoteData).yes_count)/((d as VoteData).yes_count+(d as VoteData).no_count)*100));
          })
          .attr('height', (d) => height - (newY(((d as VoteData).yes_count)/((d as VoteData).yes_count+(d as VoteData).no_count)*100)));
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
              (newX(counties.indexOf(d as string)) + barWidth * 1.15) +
              ',0)',
          );
      }

      return () => {
        if (tooltipRef.current) {
          tooltipRef.current.remove();
        }
      };
  }, [prop1VoteData,prop2VoteData]); // Re-render when voteData changes

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
}
