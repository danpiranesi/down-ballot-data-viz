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

export const VoteDataContext = createContext<VoteData[]>([]);

export default function visualLayoutRootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  const pathname = usePathname();
  const [selectedProp, setSelectedProp] = useState<Proposition | null>(null);
  const [voteData, setVoteData] = useState<VoteData[]>([]);
  const [totalYesVotes, setTotalYesVotes] = useState<number>(0);
  const [totalNoVotes, setTotalNoVotes] = useState<number>(0);


 
  // Calculate totals when voteData changes
  useEffect(() => {
    const sumVotes = () => {
      if (!Array.isArray(voteData)) return { totalYes: 0, totalNo: 0 };
  
      let totalYes = 0;
      let totalNo = 0;
  
      voteData.forEach((vote) => {
        totalYes += vote.yes_count;
        totalNo += vote.no_count;
      });
  
      return { totalYes, totalNo };
    };
  
    const totals = sumVotes();
    setTotalYesVotes(totals.totalYes);
    setTotalNoVotes(totals.totalNo);
  }, [voteData]);
  


  useEffect(() => {
    if (selectedProp) {
      const slug = `?proposition_id=${selectedProp.id}`;
      const newUrl = `${slug}`;
      //const newUrl = `/visuals/${slug}`;
      window.history.pushState({}, '', newUrl); 
      setVoteData(selectedProp.votes)
    }
    
  }, [selectedProp]);


const handleDropdownChange = (proposition: Proposition) => {
  // when the selectedProp is changed in the propFilters, make the change in this component.
  setSelectedProp(proposition);
  

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
              <div className="title justify-center flex mx-14 my-4">
                {selectedProp ? selectedProp.name : 'Select a Year and Proposition'}
              </div>
              <VoteDataContext.Provider value={voteData}>
              {children}
              </VoteDataContext.Provider>
              <div className='mx-14'>
              <GradientBar/>
              </div>
            </Card>
          </div>
          <div className="space-y-4">
            <Card className="p-4">
              <PropositionFilters
                setSelectedProp={handleDropdownChange}
              />
            </Card>
            <Card>
              <ResultDisplay
                yesTotal={totalYesVotes}
                noTotal={totalNoVotes}
              />
            </Card>
            <Card>
              {selectedProp ? selectedProp.passed == true ? 'This legislation passed' : 'This legislation did not pass' : 'no selected prop'}
                
            </Card>
            <Card>
                <VisualizationSelect propId = {selectedProp ? selectedProp.id : 0} />
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
        <Card>
              <div className='title'>{selectedProp ? selectedProp.name : ''}</div>
             
              <div>{selectedProp ? selectedProp.description : ''}</div>
        </Card>
        <Footer/>
      </main>
      <ExportModal isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      selectedProp={selectedProp} 
      />
    </div>
  );
  }