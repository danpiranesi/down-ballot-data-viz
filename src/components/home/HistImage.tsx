'use client'
import React from 'react';
import Link from 'next/link';

export const HistImage = () => {
    return (
        <div id='image-box' className="border-b shadow-md py-4 px-8" style={{ borderBottomRightRadius: 10, borderBottomLeftRadius: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10}}> {/* Convoluted but will go into style later */}
            <Link href="/visuals/histogram" className="text-xl font-bold font-serif hover:underline">
            County Level Pass/Fail Histogram
          </Link>
          <div id='histogram-image' className="bg-white p-4 shadow-md object-contain rounded-lg">
          <img id='histogram' 
              src="/histogram_example.png"
              className="hidden md:block"
              alt="Colorado County Bar Chart"
            />   
                      
          </div>


        </div>
    );
};
