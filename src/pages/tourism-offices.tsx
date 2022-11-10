import { useRouter } from 'next/router';
import React, { useRef  } from 'react';

import Layout from "@/components/layout/Layout";
import { Loader } from '@/components/post';
import Seo from "@/components/Seo";
import { PageHeading } from "@/components/text/PageHeading";
import Tooltip from '@/components/Tooltip';

export default function TourismOfficesPage() {

  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  if (router.isFallback) {
    return <Loader />;
  }
  return (
    <Layout>
      <Seo 
        templateTitle='Tourism Offices'
        description=''
      />

      <PageHeading> TOURISM OFFICES </PageHeading>

      <div ref={scrollRef} className="col-span-1 lg:col-span-3 flex flex-wrap flex-row justify-center items-start ">
        
        { tourismOffices.map((offices) => (
          <Tooltip interactive={false} key={offices.href} content={offices.tooltip}>
            
            <div className="max-w-xs min-w-xs rounded-lg overflow-hidden shadow-lg">
              <div className="py-4 ">
                <div className="py-2 bg-primary-800">
                  <div className="font-bold text-xl px-4">
                    {`${offices.place}`} 
                  </div>
                </div>
                <p className="text-gray-700 font-bold py-2 px-4 text-base">
                    {`${offices.contactPerson}`} 
                </p>

                <p className="text-gray-700 py-2 px-4 text-base">
                    {`${offices.address}`} 
                </p>

                <p className="text-gray-700 pt-4 px-4 text-base">
                    Tel: <span className='text-primary-500'>{`${offices.contactNumber1}`} </span> 
                </p>
                <p className="text-gray-700 px-4 text-base">
                    Phone: <span className='text-primary-500'>{`${offices.contactNumber2}`} </span>
                </p>
                <p className="text-gray-700 px-4 text-base">
                    Email: <span className='text-primary-500'>{`${offices.email}`} </span>
                </p>

                <p className="text-gray-700 px-4 text-base">
                    Website: <a className='text-primary-500 hover:text-lime-600' target="_blank" rel="noreferrer noopener external nofollow" href="{`${offices.website}`}">{`${offices.website}`}</a>
                </p>

              </div>
            </div>
          
          </Tooltip>
          ))}

      </div>


      

      
    </Layout>
  );
}

const tourismOffices = [ 
  {
    place: 'Province of Tarlac',
    contactPerson: 'Contact Person',
    address: 'Address Address Address Address Address Address Address Address Address Address',
    contactNumber1: 'Contact Number 1',
    contactNumber2: 'Contact Number 2',
    email: 'Email',
    website: 'Website',

    href: 'link',
    tooltip: 'tooltip',
      
    
  },
]