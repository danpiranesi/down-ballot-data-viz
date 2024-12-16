'use client';
import React, { useState, useEffect, createContext} from 'react';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PropositionFilters } from '@/components/filtering/PropositionFilters';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ResultDisplay } from '@/components/results/ResultDisplay';
import { Proposition, VoteData } from '@/types/propdata';
import GradientBar from '@/components/ui/Key';
import VisualizationSelect from '@/components/vizSelect/VisualizationSelect';
import { ExportModal } from '@/components/export/ExportModal';

export const prop1voteDataContext = createContext<VoteData[]>([]);
export const prop2voteDataContext = createContext<VoteData[]>([]);


export default function visualLayoutRootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  const pathname = usePathname();
  const [selectedProp1, setSelectedProp1] = useState<Proposition | null>(null);
  const [prop1voteData, setProp1VoteData] = useState<VoteData[]>([]);
  const [selectedProp2, setSelectedProp2] = useState<Proposition | null>(null);
  const [prop2voteData, setProp2VoteData] = useState<VoteData[]>([]);



  useEffect(() => {
    if (selectedProp1) {
      const slug = `?proposition_id=${selectedProp1.id}`;
      const newUrl = `${slug}`;
      //const newUrl = `/visuals/${slug}`;
      window.history.pushState({}, '', newUrl); 
      setProp1VoteData(selectedProp1.votes)
    }
    
  }, [selectedProp1]);

  useEffect(() => {
    if (selectedProp2) {
      setProp2VoteData(selectedProp2.votes)
    }
    
  }, [selectedProp2]);


const handleProp1Change = (proposition: Proposition) => {
  // when the selectedProp is changed in the propFilters, make the change in this component.
  setSelectedProp1(proposition);
};

const handleProp2Change = (proposition: Proposition) => {
  // when the selectedProp is changed in the propFilters, make the change in this component.
  setSelectedProp2(proposition);
};

const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <div className="pt-4 px-14">
          <h1 className="text-3xl font-serif">County Level Pass/Fail Density Map</h1>
          <p className="text-sm">Compare the percentages of people voting for propositions in each county.</p>
          <hr className="h-px my-4 bg-violet-300 border-0"></hr>
      </div>
      <main className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3">
            <Card className="h-[800px] flex flex-col grow justify-center">
              <div className="justify-center flex mx-14 my-4 text-lg font-serif">
                {selectedProp2 ? selectedProp2.name : 'Select a Year and Proposition'}
              </div>
              <prop2voteDataContext.Provider value = {prop2voteData}>
              <prop1voteDataContext.Provider value={prop1voteData}>
              {children}
              </prop1voteDataContext.Provider>
              </prop2voteDataContext.Provider>
            </Card>
          </div>
          <div className="space-y-4">
            <Card className="p-4">
              <PropositionFilters
                setSelectedProp={handleProp1Change}
              />
            </Card>
            <Card className="p-4">
              <PropositionFilters
                setSelectedProp={handleProp2Change}
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