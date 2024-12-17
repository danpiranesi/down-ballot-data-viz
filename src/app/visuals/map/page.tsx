//'use client';
//import { ColoradoMap } from '@/components/map/D3Map';
import React from 'react';
//import { VoteDataContext } from "../layout";
import MapFunc from '@/app/visuals/map/MapFunction';
import { ColoradoMap } from '@/components/visuals/D3Map';
import { VoteData } from '@/types/propdata';
import { VoteDataContext } from '@/context/VoteDataContext';

export const metadata = {
    title: 'Colorado Vote Visualizer',
    description: 'Understanding how votes add up matters. It matters for big races, but it matters for smaller, down ballot races too.',
    // open graph is the preview that shows up when the site is shared
    openGraph: {
      title: 'Colorado Vote Visualizer: County Map',
      description: 'Compare the percentages of people voting for propositions in each county.',
      url: 'https://www.coloradovotevisuals.com/visuals/map',
      images: [
        {
          url: 'https://coloradocotevisuals.com/preview-image.png',
          width: 800,
          height: 600,
        },
      ],
    },
  };

export default function Map (){
  return(
    <MapFunc/>
  ) 
}