'use client'
import React, { useContext} from 'react';
import { prop1voteDataContext, prop2voteDataContext } from "./layout";
import { ComparisonVisual } from '@/components/visuals/comparison';
import { VoteDataContext } from '@/context/VoteDataContext';

export default function ComparisonFunction (){
    const prop1voteData = useContext(VoteDataContext);
    console.log("the vote data is ", prop1voteData)
    const prop2voteData = useContext(prop2voteDataContext);
    return (
        <ComparisonVisual prop1VoteData={prop1voteData} prop2VoteData={prop2voteData}/>
    )
}
