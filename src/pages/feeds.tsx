/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */

import clsx from 'clsx';
import type { NextPage } from 'next';
import * as React from 'react';

import useLoaded from '@/hooks/useLoaded';
import useScrollDirection from '@/hooks/useScrollDirection';
import { useWindowScrollPositions } from '@/hooks/useWindowScrollPositions';

import Layout from '@/components/layout/Layout';
import { CollectionsWidget, PostCard,PostWidget } from '@/components/post';
import Seo from '@/components/Seo';

import { StateContext } from '@/pages/_app';
import { getCollections, getPosts } from '@/services'; 

interface TarlacProps {
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

const Tarlac: NextPage<TarlacProps> = ({ posts, collections }: TarlacProps): JSX.Element => {

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
        templateTitle='Tarlac'
        description='A virtual tour compilation of tourist destination in Tarlac Province, Philippines'
      />
      <main>
        <section
            className={clsx(
              'min-h-main -mt-20 mb-20 flex flex-col justify-center',
              isLoaded && 'fade-in-start'
            )}
          >
          <div className="container mx-auto top-[0px]">

            <div className='container mx-auto px-0 mb-8 bg-black'>
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
              
              <div className='grid grid-cols-1 lg:grid-cols-5 gap-1 pt-[10]'>

                <div className='hidden lg:block lg:col-span-1  col-span-1'>

                  <div className={"transition-all duration-300 lg:sticky relative"
                      + (scrollDirection === 'up' || scrollY < 30 ?  ' lg:top-[100px]' : ' lg:top-[20px]')
                    }>

                    <CollectionsWidget />

                  </div>

                </div>

                <div className="lg:col-span-3  col-span-1 px-2 lg:px-0 bg-black">
                
                  {posts.map((post:any, index) => <PostCard post={post} key={post.title}/>)}
                 
                </div>

                <div className='lg:col-span-1 col-span-1'>

                  <div className={"transition-all duration-300 lg:sticky relative"
                    + (scrollDirection === 'up' || scrollY < 30 ?  ' lg:top-[100px]' : ' lg:top-[20px]')}>

                    <PostWidget />

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

export default Tarlac
