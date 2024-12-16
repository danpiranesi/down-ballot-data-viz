'use client'
import { PropositionHistogram } from '@/components/visuals/histogramChart';
import React, { useContext} from 'react';
import { VoteDataContext } from "../layout";

export default function Map (){
    const voteData = useContext(VoteDataContext);
    return (
        <PropositionHistogram voteData={voteData}/>
    )
}