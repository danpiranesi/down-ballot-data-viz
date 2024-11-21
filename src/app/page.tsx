'use client';

import { Header } from '@/components/layout/Header';
import { MapContainer } from '@/components/map/MapContainer';
import { LayerControl } from '@/components/controls/LayerControl';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import PropositionDropdown from '@/components/filtering/PropositionDropdown'


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3">
            <Card>
              <MapContainer />
            </Card>
          </div>
          
          <div className="space-y-4">
            <Card className="p-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Select Proposition</h3>
                  <PropositionDropdown />
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <LayerControl 
                layers={[
                  { id: 'counties', label: 'Counties' },
                  { id: 'districts', label: 'Districts' },
                  { id: 'results', label: 'Election Results' }
                ]}
                activeLayers={['counties']}
                onToggleLayer={(id) => console.log('Toggle layer:', id)}
              />
            </Card>
            
            <Card className="p-4">
              <div className="space-y-2">
                <Button variant="default" className="w-full">
                  Export Map
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}