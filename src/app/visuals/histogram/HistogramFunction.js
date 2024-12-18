'use client';
import { PropositionHistogram } from '@/components/visuals/histogramChart';
import React, { useContext} from 'react';
import { SelectedPropContext } from '@/context/SelectedPropContext';


export default function HistogramFunc () {
    const SelectedProp = useContext(SelectedPropContext)
    return (
        <PropositionHistogram propositionId={1} year={2020} voteData={SelectedProp ? SelectedProp.votes : []}/>
    )
}
