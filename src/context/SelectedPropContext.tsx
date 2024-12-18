// SelectedPropContext.tsx
import React, { createContext, useState, ReactNode } from 'react';
import { VoteData } from '@/types/propdata';

export type SelectedPropContextValue = {
  name: string;
  votes?: VoteData[]; // Ensure this property exists and is correctly typed
  description: string;
};

export const SelectedPropContext = createContext<SelectedPropContextValue | undefined>(undefined);

type ProviderProps = {
  children: ReactNode;
};

export const SelectedPropProvider: React.FC<ProviderProps> = ({ children }) => {
  const [selectedProp, setSelectedProp] = useState<SelectedPropContextValue>({
    name: '',
    votes: [],
    description: ''
  });

  // Add any logic to update selectedProp as needed

  return (
    <SelectedPropContext.Provider value={selectedProp}>
      {children}
    </SelectedPropContext.Provider>
  );
};
