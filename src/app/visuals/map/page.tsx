'use client'
import { ColoradoMap } from '@/components/visuals/D3Map';
import React, { useContext} from 'react';
import { VoteDataContext } from "../layout";

export default function Map (){
    const voteData = useContext(VoteDataContext);
    return (
        <ColoradoMap voteData={voteData}/>
    )
}