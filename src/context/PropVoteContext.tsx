'use client';

import { createContext } from 'react';
import { VoteData } from '@/types/propdata';

export const Prop1VoteDataContext = createContext<VoteData[]>([]);
export const Prop2VoteDataContext = createContext<VoteData[]>([]);