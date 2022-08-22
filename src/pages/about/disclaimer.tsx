import * as React from 'react';

import Layout from '@/components/layout/Layout';
import CustomLink from '@/components/links/CustomLink';
import Seo from '@/components/Seo';

export default function NotFoundPage() {
  return (
    <Layout>

      <Seo 
        templateTitle='Disclaimer'
        description='EDIT DESCRIPTION'
       
       />

      <main>
        <section className='bg-dark'>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-white'>

            <h1 className='mt-8'>Coming Soon!</h1>
            <CustomLink className='mt-4' href='/'>
              Back to Home
            </CustomLink>
          </div>
        </section>
      </main>
    </Layout>
  );
}