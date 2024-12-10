import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const MapImage = () => {
    return (
        <div className="bg-violet-100 border-b shadow-md py-4 px-14 content-between" style={{ borderBottomRightRadius: 10, borderBottomLeftRadius: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
            <Link href="/map_page" className="text-2xl font-bold font-serif hover:underline">
            State-Wide County Map
          </Link>

         <div className="bg-white p-4 shadow-md object-contain" style={{ borderBottomRightRadius: 10, borderBottomLeftRadius: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
          <Image
              src="/Example_Image.png"
              width={260}
              height={250}
              className="hidden md:block"
              alt="Choropleth County Map"
            />
          </div>
        </div>
    );
};
