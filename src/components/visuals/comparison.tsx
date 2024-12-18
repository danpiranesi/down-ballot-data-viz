// src/components/visuals/ComparisonVisual.tsx

'use client';

import React, { useEffect, useRef } from 'react';
import { VoteData } from '@/types/propdata';
import * as d3 from 'd3';

type MapProps = {
  prop1VoteData?: VoteData[];
  prop2VoteData?: VoteData[];
};

export function ComparisonVisual({ prop1VoteData = [], prop2VoteData = [] }: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll('*').remove();

    // Set dimensions and margins
    const margin = { top: 20, right: 30, bottom: 40, left: 40 },
      width = 800 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // Append SVG group
    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Combine both vote datasets
    const combinedVoteData = [...prop1VoteData, ...prop2VoteData];

    // X scale
    const x = d3
      .scaleBand<string>()
      .domain(combinedVoteData.map(d => d.county_name))
      .range([0, width])
      .padding(0.2);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    // Y scale
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(combinedVoteData, d => d.yes_count + d.no_count) || 0])
      .nice()
      .range([height, 0]);

    svg.append('g')
      .call(d3.axisLeft(y));

    // Add bars for Prop 1
    svg.selectAll('.bar1')
      .data(prop1VoteData)
      .enter()
      .append('rect')
      .attr('class', 'bar1')
      .attr('x', d => x(d.county_name) || 0)
      .attr('y', d => y(d.yes_count + d.no_count))
      .attr('width', x.bandwidth() / 2)
      .attr('height', d => height - y(d.yes_count + d.no_count))
      .attr('fill', 'steelblue');

    // Add bars for Prop 2
    svg.selectAll('.bar2')
      .data(prop2VoteData)
      .enter()
      .append('rect')
      .attr('class', 'bar2')
      .attr('x', d => (x(d.county_name) || 0) + x.bandwidth() / 2)
      .attr('y', d => y(d.yes_count + d.no_count))
      .attr('width', x.bandwidth() / 2)
      .attr('height', d => height - y(d.yes_count + d.no_count))
      .attr('fill', 'orange');

    // Add labels (optional)
    svg.selectAll('.text1')
      .data(prop1VoteData)
      .enter()
      .append('text')
      .attr('class', 'text1')
      .attr('x', d => (x(d.county_name) || 0) + x.bandwidth() / 4)
      .attr('y', d => y(d.yes_count + d.no_count) - 5)
      .attr('text-anchor', 'middle')
      .text(d => d.yes_count + d.no_count);

    svg.selectAll('.text2')
      .data(prop2VoteData)
      .enter()
      .append('text')
      .attr('class', 'text2')
      .attr('x', d => (x(d.county_name) || 0) + (3 * x.bandwidth()) / 4)
      .attr('y', d => y(d.yes_count + d.no_count) - 5)
      .attr('text-anchor', 'middle')
      .text(d => d.yes_count + d.no_count);

  }, [prop1VoteData, prop2VoteData]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default ComparisonVisual;


