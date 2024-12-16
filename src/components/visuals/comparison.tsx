'use client';

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Feature, FeatureCollection, Geometry } from 'geojson';
import {VoteData} from '@/types/propdata';
import GradientBar from '../ui/Key';


type MapProps = {
  prop1VoteData?: VoteData[];
  prop2VoteData?: VoteData[];

}

type CountyProperties = {
  name: string;
  [key: string]: any;
}

export function ComparisonVisual({prop1VoteData = [], prop2VoteData = []}: MapProps) {
    console.log(prop1VoteData)
    console.log(prop2VoteData)
  return (
    <div>
        
    </div>
  );
}
