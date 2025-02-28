'use client';
import React, { useState, useEffect, createContext, Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PropositionFilters } from '@/components/filtering/PropositionFilters';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ResultDisplay } from '@/components/results/ResultDisplay';
import { Proposition, VoteData } from '@/types/propdata';
import VisualizationSelect from '@/components/vizSelect/VisualizationSelect';
import { ExportModal } from '@/components/export/ExportModal';
import { SelectedPropContext } from '@/context/SelectedPropContext';
import { useSearchParams } from 'next/navigation';

// Create a client component that uses useSearchParams
function SearchParamsHandler({ 
  setPropositionId, 
  setIsEmbed 
}: { 
  setPropositionId: (id: string | null) => void;
  setIsEmbed: (isEmbed: boolean) => void;
}) {
  const searchParams = useSearchParams();
  const isEmbed = searchParams.get('embed') === 'true';
  const propositionId = searchParams.get('proposition_id');
  
  useEffect(() => {
    setIsEmbed(isEmbed);
    if (propositionId) {
      setPropositionId(propositionId);
    }
  }, [searchParams, setIsEmbed, setPropositionId, isEmbed, propositionId]);
  
  return null; // This component doesn't render anything
}

export default function visualLayoutRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [selectedProp, setSelectedProp] = useState<Proposition | null>(null);
  const [totalYesVotes, setTotalYesVotes] = useState<number>(0);
  const [totalNoVotes, setTotalNoVotes] = useState<number>(0);
  const [isEmbed, setIsEmbed] = useState(false);
  const [propositionId, setPropositionId] = useState<string | null>(null);

  // Calculate totals when voteData changes
  useEffect(() => {
    const sumVotes = () => {
      if (!selectedProp) return { totalYes: 0, totalNo: 0 };

      let totalYes = 0;
      let totalNo = 0;

      selectedProp.votes.forEach((vote) => {
        totalYes += vote.yes_count;
        totalNo += vote.no_count;
      });

      return { totalYes, totalNo };
    };

    const totals = sumVotes();
    setTotalYesVotes(totals.totalYes);
    setTotalNoVotes(totals.totalNo);
  }, [selectedProp]);



  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Remove direct useSearchParams call since it's now in the SearchParamsHandler



  useEffect(() => {
    // update URL and voteData when the proposition is selected from dropdown
    if (selectedProp) {
      const newUrl = isEmbed
        ? `?proposition_id=${selectedProp.id}&embed=true`
        : `?proposition_id=${selectedProp.id}`;

      window.history.pushState({}, '', newUrl);
    }
  }, [selectedProp, isEmbed]);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Suspense fallback={<div>Loading...</div>}>
        <SearchParamsHandler setPropositionId={setPropositionId} setIsEmbed={setIsEmbed} />
      </Suspense>
      
      {isEmbed ? (
        <div id="export-container" className="w-full h-full">
          <SelectedPropContext.Provider value={selectedProp}>
            {children}
          </SelectedPropContext.Provider>
        </div>
      ) : (
        <>
          <Header />
          <div className="pt-4 px-14">
            <h1 className="text-3xl font-serif">Visualization Generator</h1>
            <p className="text-sm">Compare the percentages of people voting for propositions in each county.</p>
            <hr className="h-px my-4 bg-violet-300 border-0"></hr>
          </div>
          <main className="container mx-auto px-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-3">
                <Card className="flex flex-col p-4">
                  <div id="export-container">
                    <SelectedPropContext.Provider value={selectedProp}>

                      {children}

                    </SelectedPropContext.Provider>
                  </div>
                </Card>
              </div>
              <div className="space-y-4">
                <Card className="p-4">
                  <PropositionFilters setSelectedProp={setSelectedProp} slugName={'proposition_id'} />
                </Card>
                <Card>
                  <ResultDisplay yesTotal={totalYesVotes} noTotal={totalNoVotes} />
                </Card>
                {selectedProp ? selectedProp.passed ? <Card>This legislation passed</Card> : <Card>This legislation did not pass </Card>: ''}
                <Card>
                  <VisualizationSelect propId={selectedProp ? selectedProp.id : 0} />
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
            <Card className="mt-4">
              <div className='title'>{selectedProp?.name}</div>
              <div>{selectedProp?.description}</div>
            </Card>
            <Footer />
          </main>
          <ExportModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            selectedProp={selectedProp}
          />
        </>
      )}
    </div>
  );
}
