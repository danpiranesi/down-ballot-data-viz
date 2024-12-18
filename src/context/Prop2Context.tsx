import { createContext } from 'react';
import { Proposition, VoteData } from '@/types/propdata';

interface Prop2ContextProps {
  selectedProp2: Proposition | null;
  prop2VoteData: VoteData[];
}

export const Prop2Context = createContext<Prop2ContextProps>({
  selectedProp2: null,
  prop2VoteData: [],
});