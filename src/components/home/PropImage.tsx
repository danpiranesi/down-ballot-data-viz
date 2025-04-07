//'use client';
import React from 'react';
import Link from 'next/link';

export const PropImage = () => {
    return (
        <div id='image-box' className="border-b shadow-md py-4 px-4 sm:px-8 rounded-lg h-full flex flex-col bg-lavender-100">
            <Link href="/comparison" className="text-lg sm:text-xl font-bold font-serif hover:underline mb-3 text-center">
              Proposition Comparison
            </Link>

            <div className="bg-white p-2 sm:p-4 shadow-md rounded-lg flex-grow overflow-hidden flex items-center justify-center">
              <div className="w-full h-[200px] md:h-[250px] lg:h-[300px] relative">
                <img 
                    src="/comparison.png"
                    className="w-full h-full object-contain"
                    alt="Zoomed photo of proposition comparison graph"
                />
              </div>
            </div>
        </div>
    );
}; 