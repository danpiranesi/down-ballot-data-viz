import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Proposition } from '@/types/propdata';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProp: Proposition | null;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, selectedProp }) => {
  const [embedCode, setEmbedCode] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && selectedProp) {
      // generate dynamic embed URL using the current route
      const embedURL = `${window.location.origin}${window.location.pathname}?embed=true&proposition_id=${selectedProp.id}`;
      const iframeCode = `<iframe src="${embedURL}" width="100%" height="600" style="border: none;"></iframe>`;
      setEmbedCode(iframeCode);
    }
  }, [isOpen, selectedProp]);

  const handleDownloadSVG = () => {
    const svgElement = document.querySelector('svg#map-svg') || document.querySelector('svg#histogram-svg');
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

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(embedCode).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // reset success message after 2 seconds
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded shadow p-4 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Export Options</h2>
        <p className="mb-4">
          You can export the current visualization as an SVG or copy the embed code below to include it directly in your site.
        </p>

        <div className="mb-4">
          <Button variant="primary" className="w-full mb-2" onClick={handleDownloadSVG}>
            Download SVG
          </Button>

          <label className="text-sm font-semibold block mb-1">Embed Code:</label>
          <textarea
            readOnly
            className="w-full p-2 border rounded text-sm mb-2"
            rows={4}
            value={embedCode}
          />

          <Button variant="secondary" className="w-full" onClick={handleCopyToClipboard}>
            Copy Embed Code
          </Button>
          {copySuccess && (
            <p className="text-green-500 text-sm mt-2">Embed code copied to clipboard!</p>
          )}
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
