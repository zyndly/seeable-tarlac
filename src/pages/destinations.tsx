/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useContext, useRef } from 'react';

import useScrollDirection from '@/hooks/useScrollDirection';
import { useWindowScrollPositions } from '@/hooks/useWindowScrollPositions';

import LandingHero from '@/components/layout/LandingHero'
import { Categories, CollectionsWidget, PostCard, PostWidget, SlidingCollections } from '@/components/post';

import { StateContext } from '@/pages/_app';
import { getCollections, getPosts } from '@/services'; 

interface DestinationProps {
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

  console.log("Console.blog for ", userName);
}

const Destinations: NextPage<DestinationProps> = ({ posts, collections }: DestinationProps): JSX.Element => {

  const searchRef = useRef(null);
  const featuredPosts = posts.filter((post:any)=> post.featuredPost); 
  const {menu} = useContext(StateContext);
  const scrollDirection = useScrollDirection();
  const {scrollY} = useWindowScrollPositions();
  

  return (

      <div className="container mx-auto px-0 top-[0px]" style={{minWidth: '100vw'}}
      
      >
        <Head>
          <title>SEEABLE Tarlac</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className=' block relative w-full min-h-[120vh] lg:min-h-[100vh] lg:h-auto top-[0px] z-5 ' style={{minWidth: '100vw'}}>
          <SlidingCollections collectionsProp={collections} scrollRef={searchRef} title='Featured Collections' featured={true} />
        </div>

        <div ref={searchRef} className='w-full  min-h-[1200px] md:min-h-[1500px] lg:min-h-[1700px] h-auto top-[150vh] lg:top-[100vh] z-0' style={{minWidth: '100vw'}}>
          <LandingHero featuredPosts={featuredPosts as []}/>
        </div>

        <div style={{minWidth: '100vw'}} className={'relative bg-[#202124] z-5'+(menu? ' blur-filter ': ' trans-500')}>

          <div
              className='divider mb-[100px] w-full flex flex-row items-center justify-center  text-[30px] md:text-[40px] py-5 font-staatliches text-lime-600'
            >
                <div className='w-[10%] min-w-[100px] h-[1px] bg-white rounded-full'>

                </div>

                <span className='px-3'>
                  Latest Update
                </span>

                <div className='w-[10%] min-w-[100px] h-[1px] bg-white rounded-full'>

                </div>
                  
          </div>

          <div className='container mx-auto px-0 mb-8 bg-[#202124]'>
            
            <div className='grid grid-cols-1 lg:grid-cols-5 gap-1 pt-[10]'>

              <div className='hidden lg:block lg:col-span-1  col-span-1'>

                <div className={"transition-all duration-300 lg:sticky relative"
                    + (scrollDirection === 'up' || scrollY < 30 ?  ' lg:top-[100px]' : ' lg:top-[20px]')
                  }>

                  <CollectionsWidget />

                </div>

              </div>

              <div className="lg:col-span-3  col-span-1 px-2 lg:px-0">
                {posts.map((post:any, index) => <PostCard post={post} key={post.title}/>)}
              </div>

              <div className='lg:col-span-1 col-span-1 bg-[#202124]'>

              

                <div className={"transition-all duration-300 lg:sticky relative"
                  + (scrollDirection === 'up' || scrollY < 30 ?  ' lg:top-[100px]' : ' lg:top-[20px]')}>

                  <PostWidget />
                  <Categories />

                </div>
              
              </div>
              
            </div>
          </div>
        </div>



        
        
      </div>
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

export default Destinations
