//'use client'
import React, { useContext} from 'react';
import { VoteDataContext } from "../layout";
import ComparisonFunc from '@/app/visuals/comparison/ComparisonFunction';

export const metadata = {
    title: 'Colorado Vote Visualizer',
    description: 'Understanding how votes add up matters. It matters for big races, but it matters for smaller, down ballot races too.',
    // open graph is the preview that shows up when the site is shared
    openGraph: {
      title: 'Colorado Vote Visualizer: Proposition Comparison',
      description: 'Compare the percentage of support for two different propositions.',
      url: 'https://www.coloradovotevisuals.com/visuals/comparison',
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
    return (
        <ComparisonFunc/>
    )
}