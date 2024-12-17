'use client';

import React, { useEffect, useRef, useContext } from 'react';
import * as d3 from 'd3';
import { Feature, FeatureCollection, Geometry } from 'geojson';
import { VoteData } from '@/types/propdata';
import { VoteDataContext } from '@/context/VoteDataContext';
import { SelectedPropContext } from '@/context/SelectedPropContext';

type MapProps = {
  propositionId?: number;
  year?: number;
  voteData?: VoteData[];
};

type CountyProperties = {
  name: string;
  [key: string]: any;
};

export function ColoradoMap({ propositionId, year, voteData = [] }: MapProps) {
  const { name: propositionName } = useContext(SelectedPropContext);
  const voteDataFromContext = useContext(VoteDataContext);
  const finalVoteData = voteDataFromContext.length > 0 ? voteDataFromContext : voteData;
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<d3.Selection<HTMLDivElement, unknown, HTMLElement, any>>();

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

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

    function getVotes(county_name: string) {
      const countyData = finalVoteData.find(d => d.county_name === county_name);
      if (!countyData) return { votesFor: 0, votesAgainst: 0, turnout: 0 };
      return {
        votesFor: countyData.yes_count,
        votesAgainst: countyData.no_count,
        turnout: countyData.total_votes
      };
    }

    function getColor(county_name: string) {
      const colorScale = setupcolor();
      const { votesFor, votesAgainst } = getVotes(county_name);
      if (votesFor === 0 && votesAgainst === 0) {
        return '#ccc';
      }
      const percent_yes = (votesFor / (votesFor + votesAgainst) * 100);
      return colorScale(percent_yes);
    }

    function county_passed(county_name: string) {
      const { votesFor, votesAgainst } = getVotes(county_name);
      if (votesFor === 0 && votesAgainst === 0) return false;
      return votesFor > (0.5 * (votesFor + votesAgainst));
    }

    function setupcolor() {
      return d3.scaleLinear<string>()
        .domain([0, 25, 50, 75, 100])
        .range(['#edf8fb', '#b3cde3', '#8c96c6', '#8856a7', '#810f7c']);
    }

    function render(us: FeatureCollection<Geometry, CountyProperties>) {
      const width = containerRef.current?.clientWidth || 1000;
      const height = containerRef.current?.clientHeight || 900;

      const titleHeight = 50; // Space for title
      const gradientHeight = 80; // Space for gradient bar
      const mapHeight = height - titleHeight - gradientHeight -20; // Remaining height for map

      const svg = d3.select(svgRef.current)
        .attr('width', width)
        .attr('height', height);

      // Clear previous content
      svg.selectAll('*').remove();

      // Add title for the proposition
      svg.append('text')
        .attr('x', width / 2)
        .attr('y', titleHeight / 2)
        .attr('text-anchor', 'middle')
        .attr('font-size', 18)
        .attr('font-weight', 'bold')
        .attr('fill', '#333')
        .text(propositionName || 'Select a Proposition');

      // Define linear gradient for counties hashing
      svg.append('defs')
        .append('pattern')
        .attr('id', 'diagonalHatch')
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('width', 9)
        .attr('height', 9)
        .append('path')
        .attr('d', 'M0,9 l9,-9 M-9,9 l9,-9 M9,9 l9,-9')
        .attr('stroke', '#000000')
        .attr('stroke-width', 1.5);

      svg.append('defs')
        .append('pattern')
        .attr('id', 'diagonalHatch_hover')
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('width', 4)
        .attr('height', 4)
        .append('path')
        .attr('d', 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2')
        .attr('stroke', '#ccc')
        .attr('stroke-width', 0.4);

      // Setup projection and path for map
      const projection = d3.geoMercator().fitSize([width, mapHeight], us);
      const path = d3.geoPath().projection(projection);

      // Draw background counties (base fill)
      svg.append('g')
        .attr('transform', `translate(0, ${titleHeight})`) // Move map below title
        .selectAll('path')
        .data(us.features)
        .join('path')
        .attr('fill', (d) => county_passed(d.properties.name) ? getColor(d.properties.name) : '#ccc')
        .attr('d', path)
        .attr('stroke', '#333')
        .attr('stroke-width', 0.5);

      // Draw hash pattern overlay if passed
      svg.append('g')
        .attr('transform', `translate(0, ${titleHeight})`) // move map below title
        .attr('class', 'counties')
        .selectAll('path')
        .data(us.features)
        .enter()
        .append('path')
        .attr('fill', (d) => county_passed(d.properties.name) ? 'url(#diagonalHatch)' : getColor(d.properties.name))
        .attr('d', path)
        .attr('stroke', '#333')
        .attr('stroke-width', 0.5)
        .on('mouseenter', function (event, d: Feature<Geometry, CountyProperties>) {
          const passed = county_passed(d.properties.name);
          const votes = getVotes(d.properties.name);
          d3.select(this).style('opacity', 0.5)
            .attr('fill', passed ? 'url(#diagonalHatch_hover)' : getColor(d.properties.name));

          tooltip.style('opacity', 1)
            .html(`
              <div class="font-medium text-gray-900 mb-1">${d.properties.name} County</div>
              <div class="text-gray-700">
                Votes For: ${votes.votesFor.toLocaleString()}<br/>
                Votes Against: ${votes.votesAgainst.toLocaleString()}<br/>
                Turnout: ${votes.turnout.toLocaleString()}
              </div>
            `)
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 20) + 'px');
        })
        .on('mousemove', function (event) {
          tooltip
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 20) + 'px');
        })
        .on('mouseleave', function (event, d: Feature<Geometry, CountyProperties>) {
          d3.select(this).style('opacity', 1)
            .attr('fill', county_passed(d.properties.name) ? 'url(#diagonalHatch)' : getColor(d.properties.name));
          tooltip.style('opacity', 0);
        });

      // Position of the gradient bar below the map
      const barWidth = 500;
      const barHeight = 20;
      const barX = (width - barWidth) / 2;
      const barY = titleHeight + mapHeight + 40;

      const defs = svg.append('defs');
      const gradient = defs.append('linearGradient')
        .attr('id', 'legend-gradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '0%');

      gradient.append('stop').attr('offset', '0%').attr('stop-color', '#edf8fb');
      gradient.append('stop').attr('offset', '25%').attr('stop-color', '#b3cde3');
      gradient.append('stop').attr('offset', '50%').attr('stop-color', '#8c96c6');
      gradient.append('stop').attr('offset', '75%').attr('stop-color', '#8856a7');
      gradient.append('stop').attr('offset', '100%').attr('stop-color', '#810f7c');

      // Gradient Rectangle
      svg.append('rect')
        .attr('x', barX)
        .attr('y', barY)
        .attr('width', barWidth)
        .attr('height', barHeight)
        .attr('fill', 'url(#legend-gradient)')
        .attr('stroke', '#333')
        .attr('stroke-width', 1);

      // Gradient Labels
      const labels = [0, 25, 50, 75, 100];
      labels.forEach((percent, i) => {
        const xPos = barX + (barWidth * (i / (labels.length - 1)));
        const anchor = i === 0 ? 'start' : i === labels.length - 1 ? 'end' : 'middle';

        svg.append('text')
          .attr('x', xPos)
          .attr('y', barY + barHeight + 15)
          .attr('text-anchor', anchor)
          .attr('font-size', 12)
          .attr('fill', '#333')
          .text(`${percent}%`);
      });

      // Gradient Title
      svg.append('text')
        .attr('x', width / 2)
        .attr('y', barY - 10)
        .attr('text-anchor', 'middle')
        .attr('font-size', 14)
        .attr('fill', '#333')
        .text('Percent Support');
    }

    // Fetch GeoJSON data
    fetch('https://raw.githubusercontent.com/earthlab/earthpy/refs/heads/main/earthpy/example-data/colorado-counties.geojson')
      .then(response => response.json())
      .then((countyData: FeatureCollection<Geometry, CountyProperties>) => {
        render(countyData);

        // Handle window resize
        const handleResize = () => {
          if (containerRef.current) {
            render(countyData);
          }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      })
      .catch(error => {
        console.error('Error loading county data:', error);
      });

    return () => {
      if (tooltipRef.current) {
        tooltipRef.current.remove();
      }
    };
  }, [finalVoteData, propositionName]);

  return (
    <div ref={containerRef} className="relative w-full min-h-[600px]">
      <svg ref={svgRef} id="map-svg" className="w-full h-full" />
    </div>
  );
}
