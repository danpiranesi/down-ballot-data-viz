import { createContext } from 'react';
import { Proposition, VoteData } from '@/types/propdata';

interface Prop1ContextProps {
  selectedProp1: Proposition | null;
  prop1VoteData: VoteData[];
}

export const Prop1Context = createContext<Prop1ContextProps>({
  selectedProp1: null,
  prop1VoteData: [],
});