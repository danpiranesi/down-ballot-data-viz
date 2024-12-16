'use client'
import React, { useContext} from 'react';
import { prop1voteDataContext, prop2voteDataContext } from "../layout";
import { ComparisonVisual } from '@/components/visuals/comparison';

export default function Map (){
    const prop1voteData = useContext(prop1voteDataContext);
    const prop2voteData = useContext(prop2voteDataContext);
    return (
        <ComparisonVisual prop1VoteData={prop1voteData} prop2VoteData={prop2voteData}/>
    )
}