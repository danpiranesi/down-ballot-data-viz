'use client'
import React from 'react';
import Link from 'next/link';

export const MapImage = () => {
    return (
        <div id='image-box' className="border-b shadow-md py-4 px-4 sm:px-8 rounded-lg h-full flex flex-col bg-lavender-100">
            <Link href="visuals/map" className="text-lg sm:text-xl font-bold font-serif hover:underline mb-3">
              County Level Pass/Fail Density Map
            </Link>

            <div className="bg-white p-2 sm:p-4 shadow-md rounded-lg flex-grow overflow-hidden flex items-center justify-center">
              <div className="w-full h-[200px] md:h-[250px] lg:h-[300px] relative">
                <img 
                    src="/map_image2.png"
                    className="w-full h-full object-contain"
                    alt="Choropleth County Map"
                />
              </div>
            </div>
        </div>
    );
};
