'use client';

import React from 'react';
import { VoteData } from '@/types/propdata';

type MapProps = {
  prop1VoteData?: VoteData[];
  prop2VoteData?: VoteData[];
};

export function ComparisonVisual({ prop1VoteData = [], prop2VoteData = [] }: MapProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* Placeholder Content */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Comparison Visual</h2>
        <p className="text-gray-700">
          The D3 visualization is currently unavailable. Please check back later.
        </p>
        
        {/* Optional: Display Data in a Simple Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">County Name</th>
                <th className="py-2 px-4 border-b">Votes For Prop 1</th>
                <th className="py-2 px-4 border-b">Votes Against Prop 1</th>
                <th className="py-2 px-4 border-b">Votes For Prop 2</th>
                <th className="py-2 px-4 border-b">Votes Against Prop 2</th>
              </tr>
            </thead>
            <tbody>
              {prop1VoteData.map((prop1, index) => {
                const prop2 = prop2VoteData[index];
                return (
                  <tr key={prop1.county_name} className="text-center">
                    <td className="py-2 px-4 border-b">{prop1.county_name}</td>
                    <td className="py-2 px-4 border-b">{prop1.yes_count.toLocaleString()}</td>
                    <td className="py-2 px-4 border-b">{prop1.no_count.toLocaleString()}</td>
                    <td className="py-2 px-4 border-b">
                      {prop2 ? prop2.yes_count.toLocaleString() : 'N/A'}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {prop2 ? prop2.no_count.toLocaleString() : 'N/A'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ComparisonVisual;




