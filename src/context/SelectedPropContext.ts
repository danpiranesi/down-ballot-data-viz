import React, { createContext } from 'react';
import { Proposition } from '@/types/propdata';

interface SelectedPropContextValue {
  name: string;
  description: string;
}

export const SelectedPropContext = createContext<SelectedPropContextValue>({
  name: '',
  description: '',
});
// export const SelectedPropContext = createContext<Proposition | null>(null);