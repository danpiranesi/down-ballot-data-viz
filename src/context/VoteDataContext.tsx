import React, { createContext, useState, useContext, ReactNode } from 'react';
import { VoteData } from '@/types/propdata';

// Define the shape of the context
interface VoteDataContextType {
  voteData: VoteData[];
  setVoteData: (data: VoteData[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

// Create the context with a default value
export const VoteDataContext = createContext<VoteDataContextType>({
  voteData: [],
  setVoteData: () => {},
  loading: false,
  setLoading: () => {},
  error: null,
  setError: () => {},
});

// Context provider component
interface VoteDataProviderProps {
  children: ReactNode;
}

export const VoteDataProvider: React.FC<VoteDataProviderProps> = ({ children }) => {
  const [voteData, setVoteData] = useState<VoteData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <VoteDataContext.Provider 
      value={{ 
        voteData, 
        setVoteData, 
        loading, 
        setLoading, 
        error, 
        setError 
      }}
    >
      {children}
    </VoteDataContext.Provider>
  );
};

// Custom hook for using the context
export const useVoteData = () => useContext(VoteDataContext); 