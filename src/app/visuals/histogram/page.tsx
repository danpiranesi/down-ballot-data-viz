//'use client';
//import { PropositionHistogram } from '@/components/histogram/histogramChart';
import React from 'react';
//import { VoteDataContext } from "../layout";
import HistogramFunc from '@/app/visuals/histogram/HistogramFunction';

export const metadata = {
    title: 'Colorado Vote Visualizer',
    description: 'Understanding how votes add up matters. It matters for big races, but it matters for smaller, down ballot races too.',
    // open graph is the preview that shows up when the site is shared
    openGraph: {
      title: 'Colorado Vote Visualizer: Histogram',
      description: 'Compare the percentages of people voting for propositions in each county.',
      url: 'https://www.coloradovotevisuals.com/visuals/histogram',
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
      <HistogramFunc/>
   )
}