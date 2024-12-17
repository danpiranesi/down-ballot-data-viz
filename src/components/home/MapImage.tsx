'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const MapImage = () => {
    return (
        <div id='image-box' className="border-b shadow-md py-4 px-8 content-between rounded-lg">
            <Link href="visuals/map" className="text-xl font-bold font-serif hover:underline">
            County Level Pass/Fail Density Map
          </Link>

         <div id='map-image' className="bg-white p-4 shadow-md rounded-lg">
          <img id='map' 
              src="/Example_Image.png"
              className="hidden md:block"
              alt="Choropleth County Map"
            />    
          </div>
        </div>
    );
};
