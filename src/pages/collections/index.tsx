import React, { useContext, useRef } from 'react';
import { useRouter } from 'next/router';

import { getCategories, getCollections, getTagPosts } from '../../services';
import { PostCard, Categories, Loader, MenuWidget, PostWidget, SlidingCollections } from '../../components';
import { StateContext } from '../_app';
import Link from 'next/link';
import CollectionsWidget from '../../components/CollectionsWidget';
import { useWindowScrollPositions } from '../../hooks/useWindowScrollPositions';
import useScrollDirection from '../../hooks/useScrollDirection';

interface TagIndexProps {
    collections: []
}

const CollectionsIndex = ({ collections }: TagIndexProps) : JSX.Element => {
  const router = useRouter();
  const { categories, menu } = useContext(StateContext);
  const scrollRef = useRef<HTMLDivElement>(null);
  const {scrollY} = useWindowScrollPositions();
  const scrollDirection = useScrollDirection();

  if (router.isFallback) {
    return <Loader />;
  }

  return (

    <div className='w-full h-full'>

        <div className='block relative w-full min-h-[120vh] lg:min-h-[100vh] lg:h-auto top-[0px] z-5 ' style={{minWidth: '100vw'}}>
          <SlidingCollections collectionsProp={collections} scrollRef={scrollRef} title='All Collections' featured={false}/>
        </div>

        <div className={'relative container min-w-[100vw] bg-[#282e34] '+(menu?' blur-filter': ' trans-500')}>

            <div ref={scrollRef} className="rounded-3xl  relative container flex flex-col items-center mx-auto px-10 mb-8 pt-[100px]"
            >

                <h1 className='text-white font-bold text-4xl py-10 font-staatliches'>
                    All Collections
                </h1>

                <div className='flex flex-row w-[80%] items-center justify-center p-4 lg:p-8'>

                    <div className=' self-center flex flex-row flex-wrap w-[80%] h-auto pb-5 mb-5 items-center justify-center border-b-[1px] border-white/[0.3]'>

                        

                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-1">

                    <div className='hidden lg:block lg:col-span-1  col-span-1'>

                        <div className={"lg:sticky relative transition-all duration-300 "
                            + (scrollDirection === 'up' || scrollY < 30 ?  ' lg:top-[100px]' : ' lg:top-[20px]')
                        }>

                            <CollectionsWidget />

                        </div>

                    </div>

                    <div ref={scrollRef} className="col-span-1 lg:col-span-3 flex flex-wrap flex-row justify-center items-start">
                        {collections.map((collection:any)=>(

                            <Link href={`/collections/${collection.slug}`} key={collection.slug}>

                                <div className='bg-cover w-[180px] h-[300px] bg-[#4A5A6A]/[0.3] rounded-lg m-5 overflow-hidden'
                                    style={{
                                        backgroundImage: `url(${collection.image.url})`
                                    }}
                                >

                                    <div className='w-full h-full bg-gradient-to-b from-black/[0.6] to-black/[0.4] flex justify-center items-center '>
                                        <span className={`relative cursor-pointer absolute px-3 py-1 mx-2 text-white font-bold font-staatliches text-2xl  rounded-full text-md border-white`}>
                                            {`${collection.title}`}
                                        </span>

                                    </div>
                                    
                                </div>
                                
                            </Link>
                        ))}
                    </div>

                    <div className="col-span-1">
                        <div className={"relative lg:sticky transition-all duration-300 "
                            + (scrollDirection === 'up' || scrollY < 30 ?  ' lg:top-[100px]' : ' lg:top-[20px]')
                        }>
                            <PostWidget />
                        </div>
                    </div>
                </div>
            </div>

        </div>

        
    </div>
    
  );
};
export default CollectionsIndex;

// Fetch data at build time
export async function getStaticProps({ params }:any) {

    console.log("params: ", params);
  const collections = await getCollections(10);

  return {
    props: { collections}, revalidate: 60
  };
}
