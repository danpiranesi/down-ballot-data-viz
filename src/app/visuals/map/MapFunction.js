'use client';
import { ColoradoMap } from '@/components/visuals/D3Map';
import React, { useContext} from 'react';
import { SelectedPropContext } from '@/context/SelectedPropContext';


export default function MapFunc () {
  return (
      <ColoradoMap propositionId={1} year={2020} voteData={SelectedPropContext.votes}/>
  )
}
