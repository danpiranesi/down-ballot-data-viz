import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Proposition } from '@/types/propdata';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProp: Proposition | null;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, selectedProp}) => {
  const [embedCode, setEmbedCode] = useState<string>('');

  useEffect(() => {
    // TODO
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const currentPath = typeof window !== 'undefined' ? window.location.pathname + window.location.search : '';
    const iframeSrc = `${origin}${currentPath}`;
    const code = `<iframe src="${iframeSrc}" width="600" height="600" frameborder="0" allowfullscreen></iframe>`;
    setEmbedCode(code);
  }, [isOpen]);

  const handleDownloadSVG = () => {
    const svgElement = document.querySelector('svg#map-svg');
    if (!svgElement) {
      console.error('SVG element not found!');
      return;
    }
  
    const propositionName = selectedProp?.name || 'colorado_map';
    const year = selectedProp?.year || new Date().getFullYear();
    const sanitizedName = propositionName.replace(/\s+/g, '_').toLowerCase();
    const fileName = `${sanitizedName}_${year}.svg`;
  
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);
  
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const blobUrl = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded shadow p-4 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Export Options</h2>
        <p className="mb-4">You can export the current visualization as an SVG or use the embed code below.</p>

        <div className="mb-4">
          <Button variant="primary" className="w-full mb-2" onClick={handleDownloadSVG}>
            Download SVG
          </Button>
          <label className="text-sm font-semibold block mb-1">Embed Code:</label>
          <textarea
            readOnly
            className="w-full p-2 border rounded text-sm"
            rows={4}
            value={embedCode}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
