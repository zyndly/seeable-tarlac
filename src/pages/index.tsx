import clsx from 'clsx';
import * as React from 'react';

import useLoaded from '@/hooks/useLoaded';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function HomePage() {
  
  const isLoaded = useLoaded();

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo
        templateTitle='Home'
        description='A web base compilation of tourist destinations in Tarlac, Province'
      />

      <main>
      <section
          className={clsx(
            'min-h-main -mt-20 mb-20 flex flex-col justify-center',
            isLoaded && 'fade-in-start'
          )}
        >
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center'>
          </div>
        </section>
      </main>
    </Layout>
  );
}
