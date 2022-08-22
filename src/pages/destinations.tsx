/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from 'clsx';
import type { NextPage } from 'next';
import * as React from 'react';

import useLoaded from '@/hooks/useLoaded';
import useScrollDirection from '@/hooks/useScrollDirection';
import { useWindowScrollPositions } from '@/hooks/useWindowScrollPositions';

import LandingHero from '@/components/layout/LandingHero'
import Layout from '@/components/layout/Layout';
import { Categories, CollectionsWidget, PostCard, PostWidget, SlidingCollections } from '@/components/post';
import Seo from '@/components/Seo';

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

  const searchRef = React.useRef(null);
  const featuredPosts = posts.filter((post:any)=> post.featuredPost); 
  const {menu} = React.useContext(StateContext);
  const scrollDirection = useScrollDirection();
  const {scrollY} = useWindowScrollPositions();
  const isLoaded = useLoaded();

  return (
      <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo
        templateTitle='Destinations'
        description='Tourist Destinations in Tarlac, Province'
      />
      <main>
        <section
            className={clsx(
              'min-h-main -mt-20 mb-20 flex flex-col justify-center',
              isLoaded && 'fade-in-start'
            )}
          >
          <div className="container mx-auto top-[0px]" style={{minWidth: '100vw'}}>

          <div className=' block relative min-w-[90px] min-h-[120vh] lg:min-h-[100vh] lg:h-auto top-[0px] ' style={{minWidth: '90vw'}}>
            <SlidingCollections collectionsProp={collections} scrollRef={searchRef} title='Featured Collections' featured={true} />
          </div>

          <div ref={searchRef} className='w-auto  min-h-[1200px] md:min-h-[1500px] lg:min-h-[1700px] h-auto top-[150vh] lg:top-[100vh] z-0' style={{minWidth: '90vw'}}>
            <LandingHero featuredPosts={featuredPosts as []}/>
          </div>

          <div style={{minWidth: '90vw'}} className={'relative bg-[#202124] z-5'+(menu? ' blur-filter ': ' trans-500')}>

            <div
                className='divider mb-[100px] w-auto flex flex-row items-center justify-center  text-[30px] md:text-[40px] py-5 font-staatliches text-lime-600'
              >
                  <div className='w-[10%] min-w-[90px]h-[1px] bg-white rounded-full'>

                  </div>

                  <span className='px-3'>
                    Latest Update
                  </span>

                  <div className='w-[10%] min-w-[90px] h-[1px] bg-white rounded-full'>

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
        </section>
      </main>
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

export default Destinations
