'use client';
import React, { useState, useEffect, createContext} from 'react';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ColoradoMap } from '@/components/map/D3Map';
import { LayerControl } from '@/components/controls/LayerControl';
import { PropositionFilters } from '@/components/filtering/PropositionFilters';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ResultDisplay } from '@/components/results/ResultDisplay';
import { Proposition, VoteData } from '@/types/propdata';
import GradientBar from '@/components/ui/Key';
import VisualizationSelect from '@/components/vizSelect/VisualizationSelect';
import { useRouter } from 'next/router';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

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


  const fetchVoteData = async (id: number) => {
    try {
      const response = await fetch(`${window.location.origin}/api/propositions/${id}`);
      //const response = await fetch(`/api/propositions/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch vote data');
      }
      const data = await response.json();
      console.log("data is: ", data)
  
      if (Array.isArray(data.votes)) {
        setVoteData(data.votes); // Extract and set only the votes array
      } else {
        console.warn('API did not return a valid votes array:', data);
        setVoteData([]); // Default to an empty array
      }
    } catch (error) {
      console.error('Error fetching vote data:', error);
      setVoteData([]); // Handle errors by setting voteData to an empty array
    }
  };  
  
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
    const params = new URLSearchParams(window.location.search);
    const propositionId = params.get('proposition_id'); // Retrieve the query string value
    if (propositionId) {
      const id = parseInt(propositionId, 10);

      // Set selectedProp state based on URL
      const prop = {
        id,
        name: `Congrats! You found an annoying bug. This is on Dan's TODO`, 
        year: 2020, 
        for_statement: '',
        against_statement: '',
      };
      setSelectedProp(prop);

      fetchVoteData(id); 
    }
  }, []);

  useEffect(() => {
    if (selectedProp) {
      const slug = `?proposition_id=${selectedProp.id}`;
      const newUrl = `${slug}`;
      //const newUrl = `/visuals/${slug}`;
      window.history.pushState({}, '', newUrl); 
    }
  }, [selectedProp]);

  // Calculate totals when voteData changes
  useEffect(() => {
    const sumVotes = () => {
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

const handleDropdownChange = (proposition: Proposition) => {
  setSelectedProp(proposition);
  fetchVoteData(proposition.id);

};


// const handleVisualChange =  (
//   //event: React.MouseEvent<HTMLElement>,
//   visualType : "Histogram"| "Map" | "Comparison"
// ) => {
//   if (selectedProp){
//     router.push(`/visuals/${visualType}/?proposition_id=${selectedProp.id}`)
//   }else{
//     router.push(`/visuals/${visualType}/`)
//   }

//   };



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
                {selectedProp ? selectedProp.name : 'Select a Year and Proposition'}
              </div>
              <VoteDataContext.Provider value={voteData}>
              {children}
              </VoteDataContext.Provider>
              {/* <ColoradoMap
                propositionId={selectedProp?.id || 0}
                year={selectedProp?.year || 0}
                voteData={voteData}
              /> */}
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
            {/* <ToggleButtonGroup
              color="primary"
              //value={alignment}
              exclusive
              onChange={handleVisualChange}
              aria-label="Platform"
            >
              <ToggleButton value="Histogram">Histogram</ToggleButton>
              <ToggleButton value="Map">Map</ToggleButton>
              <ToggleButton value="Comparison">Comparison</ToggleButton>
            </ToggleButtonGroup> */}
                <VisualizationSelect propId = {selectedProp ? selectedProp.id : 0} />
            </Card>
            <Card>
              <LayerControl
                layers={[
                  { id: 'counties', label: 'Counties' },
                  { id: 'districts', label: 'Districts' },
                  { id: 'results', label: 'Election Results' },
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
        <Footer/>
      </main>
    </div>
  );
  }