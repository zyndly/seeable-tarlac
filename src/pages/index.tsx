/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from 'clsx';
import type { NextPage } from 'next';
import * as React from 'react';

import useLoaded from '@/hooks/useLoaded';

import Layout from '@/components/layout/Layout';
import { SlidingCollections } from '@/components/post';
import { FeaturedPosts } from '@/components/post/FeaturedPost';
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

  console.log("Console.blog for ", userName);
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
          <SlidingCollections collectionsProp={collections} scrollRef={searchRef} title='' featured={true} />

        </section>
        <section className='container mx-auto mb-8 px-10'>
          <FeaturedPosts/>
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
