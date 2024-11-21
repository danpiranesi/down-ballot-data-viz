'use client';

import { Header } from '@/components/layout/Header';
import { ColoradoMap } from '@/components/map/D3Map';
import { LayerControl } from '@/components/controls/LayerControl';
import { PropositionFilters } from '@/components/filtering/PropositionFilters';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3">
            <Card className="h-[800px]">
              <ColoradoMap />
            </Card>
          </div>
          
          <div className="space-y-4">
            <Card className="p-4">
              <PropositionFilters />
            </Card>
            
            <Card>
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
            
            <Card>
              <div className="space-y-2">
                <Button variant="primary" className="w-full">
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