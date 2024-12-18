'use client';
import React, { useState, useEffect, createContext} from 'react';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PropositionFilters } from '@/components/filtering/PropositionFilters';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Proposition, VoteData } from '@/types/propdata';
import VisualizationSelect from '@/components/vizSelect/VisualizationSelect';
import { ExportModal } from '@/components/export/ExportModal';
import { SelectedPropContext } from '@/context/SelectedPropContext';
import { ComparePropContext } from '@/context/ComparePropContext';



export default function visualLayoutRootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  const [selectedProp1, setSelectedProp1] = useState<Proposition | null>(null);
  const [selectedProp2, setSelectedProp2] = useState<Proposition | null>(null);
 



  useEffect(() => {
    if (selectedProp1 && selectedProp2){
      const slug = `?proposition1_id=${selectedProp1.id}&proposition2_id=${selectedProp2.id}`;
      const newUrl = `${slug}`;
      //const newUrl = `/visuals/${slug}`;
      window.history.pushState({}, '', newUrl); 
      console.log("selectedProp1 or 2  has changed to", selectedProp1, " and ", selectedProp2)

    }
    else if (selectedProp1) {
      const slug = `?proposition1_id=${selectedProp1.id}`;
      const newUrl = `${slug}`;
      window.history.pushState({}, '', newUrl); 
      console.log("selectedProp1 has changed to", selectedProp1)
    }
    else if (selectedProp2) {
      const slug = `?proposition2_id=${selectedProp2.id}`;
      const newUrl = `${slug}`;
      window.history.pushState({}, '', newUrl); 
      console.log("selectedProp2 has changed to", selectedProp2)
    }
  }, [selectedProp1, selectedProp2]);



const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <div className="pt-4 px-14">
          <h1 className="text-3xl font-serif">Proposition Comparison By County</h1>
          <p className="text-sm">Compare the approval percentage of two propositions</p>
          <hr className="h-px my-4 bg-violet-300 border-0"></hr>
      </div>
      <main className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3">
            <Card className="h-[800px] flex flex-col grow justify-center">
              <div className="justify-center flex mx-14 my-4 text-lg font-serif">
                {selectedProp2 && selectedProp1 ? selectedProp1.name + ' vs ' + selectedProp2.name : 'Select propositions to compare'}
              </div>
              <SelectedPropContext.Provider value={selectedProp1}>
              <ComparePropContext.Provider value={selectedProp2}>
              {children}
              </ComparePropContext.Provider>
              </SelectedPropContext.Provider>
              
  
            </Card>
          </div>
          <div className="space-y-4">
            <Card className="p-4">
              <PropositionFilters
                setSelectedProp={setSelectedProp1}
                slugName={'proposition1_id'}
              />
            </Card>
            <Card className="p-4">
              <PropositionFilters
                setSelectedProp={setSelectedProp2}
                slugName={'proposition2_id'}
              />
            </Card>
            
            <Card>
                <VisualizationSelect propId = {selectedProp1 ? selectedProp1.id : 0} />
            </Card>
            <Card>
              <div className="space-y-2">
              <Button variant="primary" className="w-full" onClick={() => setIsModalOpen(true)}>
                Export Map
              </Button>
              </div>
            </Card>
          </div>
        </div>
        <Footer/>
      </main>
      <ExportModal isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      selectedProp={selectedProp1} 
      />
    </div>
  );
  }