import { createContext } from 'react';
import { VoteData } from '@/types/propdata';

export const VoteDataContext = createContext<VoteData[]>([]);