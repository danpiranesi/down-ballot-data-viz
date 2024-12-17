'use client'
import React, { useContext} from 'react';
import { prop1voteDataContext, prop2voteDataContext } from "./layout";
import { ComparisonVisual } from '@/components/visuals/comparison';
import { Prop1VoteDataContext, Prop2VoteDataContext } from '@/context/PropVoteContext';

export default function ComparisonFunction (){
    const prop1voteData = useContext(Prop1VoteDataContext);
    const prop2voteData = useContext(Prop2VoteDataContext);
    return (
        <ComparisonVisual prop1VoteData={prop1voteData} prop2VoteData={prop2voteData}/>
    )
}
