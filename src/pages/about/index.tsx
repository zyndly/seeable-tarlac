/* eslint-disable react/no-unescaped-entities */
import { RiAlarmWarningFill } from 'react-icons/ri';

import ButtonLink from '@/components/buttons/ButtonLink';
import Layout from "@/components/layout/Layout";
import CustomLink from '@/components/links/CustomLink';
import Seo from "@/components/Seo";


export default function AboutPage() {
  return (
    <Layout>
      <Seo 
        templateTitle='About'
        description=''
      />

      <main>
        <section className='bg-black'>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-white'>
              <RiAlarmWarningFill
                size={60}
                className='drop-shadow-glow  animate-flicker text-yellow-300 justify-center'
              />
              <h1 className='mt-8 animate-bounce'> 
                <span className='text-lime-400'>SORRY. </span>
                 IT'S NOT YOU. 
                 <span className='text-lime-400'>IT'S US.</span>
              </h1>
              <h2 className='text-gray-400'>You've found a page that we are still working on</h2>
              <p className='text-gray-400'>There are a lot of unknown in the world right now. But one thing is certain — Seeable is here for you.</p>
            
              <CustomLink className='mt-8 items' href='/contact'>
                Help us make our product better
              </CustomLink>

              <div className='mt-4 flex flex-wrap gap-2'>
                  <ButtonLink href='/'>Take Me Home</ButtonLink>
                </div>
          
          </div>
        </section>
        
      </main>

      
    </Layout>
  );
}