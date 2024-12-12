'use client'
import { PropositionHistogram } from '@/components/histogram/histogramChart';
import React, { useContext} from 'react';
import { VoteDataContext } from "../layout";

export default function Map (){
    const voteData = useContext(VoteDataContext);
    return (
        <PropositionHistogram propositionId={1} year={2020} voteData={voteData}/>
    )
}