'use client'
import React, { useContext} from 'react';
import { ComparisonVisual } from '@/components/visuals/comparison';
import { SelectedPropContext } from '@/context/SelectedPropContext';
import { ComparePropContext } from '@/context/ComparePropContext';

export default function ComparisonFunction (){
    const prop1 = useContext(SelectedPropContext);
    const prop2 = useContext(ComparePropContext);

    const prop1VoteData = prop1? prop1.votes : [];
    const prop2VoteData = prop2? prop2.votes : [];
    
    return (
        <ComparisonVisual prop1VoteData={prop1VoteData} prop2VoteData={prop2VoteData}/>
    )
}
