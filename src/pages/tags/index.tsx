import React, { useContext } from 'react';
import { useRouter } from 'next/router';

import { getCategories, getTagPosts } from '../../services';
import { PostCard, Categories, Loader, MenuWidget, PostWidget } from '../../components';
import { StateContext } from '../_app';
import Link from 'next/link';
import CollectionsWidget from '../../components/CollectionsWidget';
import useScrollDirection from '../../hooks/useScrollDirection';
import { useWindowScrollPositions } from '../../hooks/useWindowScrollPositions';

interface TagIndexProps {
    tags: []
}

const TagsIndex = ({ tags }: TagIndexProps) : JSX.Element => {
  const router = useRouter();
  const { categories, menu } = useContext(StateContext);
  const scrollDirection = useScrollDirection();
  const {scrollY} = useWindowScrollPositions(); 

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <div className={"container flex flex-col items-center mx-auto px-8 mb-8 pt-[100px]"+(menu?' blur-filter': ' trans-500')}>

      <h1 className='text-lime-600 font-bold text-4xl py-10 font-staatliches'>
       {`All Tags`}
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

        <div className="col-span-1 lg:col-span-3 flex flex-wrap">
            {tags.map((category:any)=>(

                <Link href={`/tags/${category.slug}`} key={category.slug}>

                    <div className='w-[200px] h-[200px] bg-[#4A5A6A]/[0.3] rounded-lg m-5 flex justify-center items-center'>
                        <span className={`relative cursor-pointer absolute px-3 py-1 mx-2 text-lime-600 rounded-full text-md border-white`}>
                            {`#${category.name}`}
                        </span>
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
  );
};
export default TagsIndex;

// Fetch data at build time
export async function getStaticProps({ params }:any) {

    console.log("params: ", params);
  const tags = await getCategories();

  return {
    props: { tags}, revalidate: 60
  };
}
