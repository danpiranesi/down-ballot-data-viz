'use client';

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { mapConfig } from '@/lib/mapbox/config';

const MapComponent = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

useEffect(() => {
  console.log("Token:", process.env.NEXT_PUBLIC_MAPBOX_TOKEN); // Debug line
    
  if (map.current || !mapContainer.current) return;

  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  if (!token) {
    console.error("No Mapbox token found!");
    return;
  }

  mapboxgl.accessToken = token;
  
  map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/mapbox/light-v11',
    center: [-105.7821, 39.5501],
    zoom: 6
  });

  return () => {
    map.current?.remove();
  };
  }, []);

  return (
    <div 
      ref={mapContainer} 
      className="w-full h-[600px] rounded-lg border"
    />
  );
};

export default MapComponent;