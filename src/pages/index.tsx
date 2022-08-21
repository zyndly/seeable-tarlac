import clsx from 'clsx';
import * as React from 'react';

import useLoaded from '@/hooks/useLoaded';

import Layout from '@/components/layout/Layout';
import { SlidingCollections } from '@/components/post';
import Seo from '@/components/Seo';

import { getCollections, getPosts } from '@/services'; 

interface DestinationProps {
  posts: [],
  collections: []
}

export default function HomePage({ posts, collections }: DestinationProps) {
  const searchRef = React.useRef(null);
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
          <div className='layout flex flex-col items-center justify-center text-center'>
            <div className='min-w-[90px] min-h-[120vh] lg:min-h-[100vh] lg:h-auto top-[0px] ' style={{minWidth: '90vw'}}>
              <SlidingCollections collectionsProp={collections} scrollRef={searchRef} title='Featured Collections' featured={true} />
            </div>
          </div>
        </section>
      </main>
      
    </Layout>
    
  );
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const getStaticProps = async () : Promise<{}> => {

  const posts = (await getPosts()) || [];
  const collections = (await getCollections()) || [];

  return {
    props: { posts, collections }, revalidate: 60
  }
}
