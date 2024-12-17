//'use client';
//import { ColoradoMap } from '@/components/map/D3Map';
import React from 'react';
//import { VoteDataContext } from "../layout";
import ComparisonFunction from '@/app/comparison/ComparisonFunction';

export const metadata = {
    title: 'Colorado Vote Visualizer',
    description: 'Understanding how votes add up matters. It matters for big races, but it matters for smaller, down ballot races too.',
    // open graph is the preview that shows up when the site is shared
    openGraph: {
      title: 'Colorado Vote Visualizer: County Map',
      description: 'Compare the percentages of people voting for propositions in each county.',
      url: 'https://www.coloradovotevisuals.com/comparison',
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
    <ComparisonFunction/>
  ) 
}