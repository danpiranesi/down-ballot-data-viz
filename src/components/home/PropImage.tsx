//'use client';
import React from 'react';
import Link from 'next/link';

export const PropImage = () => {
    return (
        <div id='image-box' className="border-b shadow-md py-4 px-8 rounded-lg">
        <div className='px-14' >
            <Link href="visuals/comparison" className="text-xl font-bold font-serif hover:underline">
            Proposition Comparison
          </Link>

        </div>
          <div id='image' className="bg-white p-4 shadow-md object-contain rounded-lg">
          
                      
          </div>

        </div>
    );
};