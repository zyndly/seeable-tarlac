/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';
import React, { useEffect,useState } from 'react';

import { getCollections } from '@/services';

const SanManuelWidget = (): JSX.Element=> {

    const [collections, setCollections] = useState([]);

    useEffect(()=>{
        getCollections(10).then((results)=>{
            setCollections(results);
        });
    }, []); //forgot the [] and it cost me 300,000 API calls - while developing for an hour!

  return (
    <div className='rounded-lg p-8 mb-8'>

      <h3 className='text-xl mb-8 border-b pb-4 text-lime-500'>
        Destinations
      </h3>
      
      {collections.map((item: any)=>(

        <Link className='text-md text-white' key={item.title} href={`/collections/${item.slug}`}>

            <div className='flex flex-grow flex-row cursor-pointer transition duration-300 hover:bg-lime-800 py-3 px-5  rounded-full' key={item.name}> 
                    
              <span className='text-white text-sm'>
                  {item.title}
              </span>
                
            </div> 
        </Link>       
      ))}
      
    </div>
  )
}

export default SanManuelWidget;
