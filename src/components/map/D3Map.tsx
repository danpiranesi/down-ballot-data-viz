import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { VoteData } from '@/types/propdata';

interface ColoradoMapProps {
  data?: VoteData[];
  width?: number;
  height?: number;
}

export const ColoradoMap: React.FC<ColoradoMapProps> = ({ 
  data = [], 
  width = 800, 
  height = 500 
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear any existing content
    d3.select(svgRef.current).selectAll("*").remove();

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("max-width", "100%")
      .style("height", "auto");

    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height / 2)
      .attr("text-anchor", "middle")
      .text("Colorado Map - Replace with actual D3 map implementation");

    // Add a border to show the component is working
    svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("stroke", "black")
      .attr("fill", "none");

  }, [data, width, height]);

  return (
    <div className="colorado-map-container">
      <svg ref={svgRef}></svg>
    </div>
  );
}; 