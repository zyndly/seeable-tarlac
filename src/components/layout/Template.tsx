import * as React from 'react';

import CustomLink from '@/components/links/CustomLink';

export default function Template() {
  return (
      <main>
        <section className='bg-black'>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-white'>

            <h1 className='mt-8'>Coming Soon!</h1>
            <CustomLink className='mt-4' href='/'>
              Back to Home
            </CustomLink>
          </div>
        </section>
      </main>
  );
}