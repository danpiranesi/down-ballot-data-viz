// src/components/visuals/ComparisonVisual.tsx

'use client';

import React from 'react';

type ComparisonVisualProps = {};

const ComparisonVisual: React.FC<ComparisonVisualProps> = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* Placeholder Content */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Comparison Visual</h2>
        <p className="text-gray-700">
          The D3 visualization is currently unavailable. Please check back later.
        </p>
      </div>
    </div>
  );
};

export default ComparisonVisual;

