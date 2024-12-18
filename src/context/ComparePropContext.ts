import React, { createContext } from 'react';
import { Proposition } from '@/types/propdata';

export const ComparePropContext = createContext<Proposition| null>(null);