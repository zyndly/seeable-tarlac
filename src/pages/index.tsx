/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from 'clsx';
import type { NextPage } from 'next';
import * as React from 'react';

import useLoaded from '@/hooks/useLoaded';

import Layout from '@/components/layout/Layout';
import { SlidingCollections } from '@/components/post';
import SearchBar from '@/components/Search';
import Seo from '@/components/Seo';

import { getCollections, getPosts } from '@/services'; 


interface HomeProps {
  posts: [],
  collections: []
}

//augmenting console object
declare global {
  interface Console {
    blog: any
  }
}

console.blog = (userName: string) => {

  console.log("", userName);
}

const Home: NextPage<HomeProps> = ({ posts, collections }: HomeProps): JSX.Element => {

  const searchRef = React.useRef(null);
  const featuredPosts = posts.filter((post:any)=> post.featuredPost); 
  const isLoaded = useLoaded();

  
  return (
      <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo
        templateTitle='Home'
        description='A virtual tour compilation of tourist destination in Tarlac Province, Philippines'
      />

        <section
            className={clsx(
              'min-h-main -mt-20 mb-20 flex flex-col justify-center',
              isLoaded && 'fade-in-start'
            )}
          >

            <div className=' block min-w-[90px] min-h-[120vh] lg:min-h-[100vh] lg:h-auto top-[0px] ' style={{minWidth: '90vw'}}>
              <SlidingCollections collectionsProp={collections} scrollRef={searchRef} title='' featured={true} />
            </div>

            <div ref={searchRef} className='w-full min-h-[1200px] md:min-h-[1500px] lg:min-h-[1700px] h-auto top-[150vh] lg:top-[100vh] z-0' style={{minWidth: '90vw'}}>
              <SearchBar featuredPosts={featuredPosts as []}/>


            </div>
        </section>
        

    </Layout>
  )
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const getStaticProps = async () : Promise<{}> => {

  const posts = (await getPosts()) || [];
  const collections = (await getCollections()) || [];

  return {
    props: { posts, collections }, revalidate: 60
  }
}

export default Home
