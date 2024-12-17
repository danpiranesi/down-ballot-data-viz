'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Dropdown } from '../ui/Dropdown';
import '@/app/globals.css';

export const Header = () => {
  return (
    <header className="bg-violet-100 border-b shadow-md flex py-4">
      <div style={{width: '75%' }} className="items-left object-contain px-14">
          <Link href="/" className="text-3xl font-bold font-serif">
            Colorado Vote Visuals
          </Link>
        </div>
        <div style={{width: '50%' }} className="container mx-auto pr-14 justify-between flex" id="navbar-default">
            <nav className="space-x-4">
                <Link href="/" className="text-xl hover:text-violet-950 hover:underline">Home</Link>
            </nav>
            <div className='dropdown'>
              <button className='button text-xl hover:text-violet-950'>Visualizations <img src='dropdown.png' height={'10px'} width={'10px'} className="inline-block"/></button>
                <div className='content bg-violet-100'>
                <Link href="/visuals/map" className="link text-xl hover:text-violet-950 hover:underline">Map</Link>
                <Link href="/visuals/histogram" className="link text-xl hover:text-violet-950 hover:underline">Histogram</Link>
                <Link href="/comparison" className="link text-xl hover:text-violet-950 hover:underline">Comparison</Link>
              </div>
            </div>
            <nav className="space-x-4">
                <Link href="/about" className="text-xl hover:text-violet-950 hover:underline">About</Link>
            </nav>
            <nav className="space-x-4">
              <Link href="/contact" className="text-xl hover:text-violet-950 hover:underline">Contact</Link>
              
            </nav>
          </div>
    </header>
  );
};