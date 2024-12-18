'use client';
import { ColoradoMap } from '@/components/visuals/D3Map';
import React, { useContext} from 'react';
import { VoteDataContext } from '@/context/VoteDataContext';


export default function MapFunc () {
  const voteData = useContext(VoteDataContext);
  return (
      <ColoradoMap propositionId={1} year={2020} voteData={voteData}/>
  )
}
