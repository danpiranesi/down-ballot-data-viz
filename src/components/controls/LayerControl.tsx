'use client';

import React from 'react';

interface LayerOption {
  id: string;
  label: string;
}

interface LayerControlProps {
  layers: LayerOption[];
  activeLayers: string[];
  onToggleLayer: (layerId: string) => void;
}

export const LayerControl = ({ 
  layers, 
  activeLayers, 
  onToggleLayer 
}: LayerControlProps) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="font-medium mb-3">Map Layers</h3>
      <div className="space-y-2">
        {layers.map(layer => (
          <label key={layer.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={activeLayers.includes(layer.id)}
              onChange={() => onToggleLayer(layer.id)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span>{layer.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};