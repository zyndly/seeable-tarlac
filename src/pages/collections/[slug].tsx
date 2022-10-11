/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-console */
/* eslint-disable unused-imports/no-unused-vars */
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useRef } from 'react';

import useScrollDirection from '@/hooks/useScrollDirection';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import { useWindowScrollPositions } from '@/hooks/useWindowScrollPositions';

import Nav from '@/components/layout/Header';
import { Categories, Loader,PostCard } from '@/components/post';
import CollectionsWidget from '@/components/post/CollectionsWidget';
import Seo from '@/components/Seo';

import { StateContext } from '@/pages/_app';
import { getCollection, getCollections } from '@/services/';

interface TagPostProps {
    slug: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    collection: any
}

  

const TagPost = ({ slug, collection }: TagPostProps) : JSX.Element => {
  const router = useRouter();
  // eslint-disable-next-line unused-imports/no-unused-vars
  const {scrollX, scrollY} = useWindowScrollPositions(); 
  const scrollDirection = useScrollDirection(); 
  const {windowHeight, windowWidth } = useWindowDimensions(); 
  const scrollRef = useRef<HTMLDivElement>(null);
  const {menu} = useContext(StateContext);

  const [open, setOpen] = React.useState(false);

  if (router.isFallback) {
    return <Loader />;
  }

  console.log("collection: ", collection , "posts: ", collection.posts, " slug: ", slug);

  return (
    <>
    <Seo
        templateTitle={collection.title}
        description='A virtual tour compilation of tourist destination in Tarlac Province, Philippines'
      />

    <Nav.Mobile open={open} setOpen={setOpen} /> 

      <header className='sticky top-0 z-10 bg-black'>
        <Nav.Desktop open={open} setOpen={setOpen} />
      </header>

    <div className="flex flex-col items-center  mb-8">

      <div className={'fixed bg-cover min-w-[100vw] min-h-[100vh] flex flex-col items-center justify-center shadow-xl'+(menu?' blur-filter': ' trans-100')}

        style={{
          backgroundImage: `url(${collection.image.url})`
        }}
      >

        <div className='bg-gradient-to-b from-black/[0.6] to-black/[0.3] w-auto min-h-[100vh] h-auto p-5 flex flex-col justify-center items-center px-10'>

          <div

          className={
              'transition-all trans-100 flex flex-col h-full w-auto duration-300 items-center md:justify-start sm-short:pt-[30px] pt-[15vh] md:pt-[15vh] lg:pt-0 lg:justify-center'
              + (scrollY < windowHeight*0.5 ? ' collection-background-info-show ': '')
              + (scrollY > windowHeight*0.5 ? ' collection-background-info-hide ': ' opacity-0')
          }

          >


            <div
                className={'text-white mb-0 text-[40px] md:text-[60px] lg:text-[80px] xl:text-[100px] 2xl:text-[140px] font-bold font-staatliches'+ (collection.focused ? ' collection-background-info-show ': '')}

                style={{
                    //for animating disappearing when focused

                    '--custom-delay': 100+'ms ',
                    opacity: collection.focused ? 0 : 1,
                } as React.CSSProperties}
                >

                {collection.title}

            </div>

            <div
                className={'text-white text-xs md:text-md font-light delay-400 mb-5 max-w-[300px] '+ (collection.focused ? ' collection-background-info-show ': '')}

                style={{
                    //for animating disappearing when focused
                    '--custom-delay': 200+'ms ',
                    opacity: collection.focused ? 0 : 1,
                } as React.CSSProperties}
            >

                {collection.subtitle}

            </div>

            <div
                className={'hidden md:block text-white text-xs md:text-sm lg:text-md xl:text-lg font-light delay-800 mb-5 md:max-w-[60vw] lg:max-w-[40vw]'+ (collection.focused ? ' collection-background-info-show ': '')}

                style={{
                    //for animating disappearing when focused
                    '--custom-delay': 250+'ms ',
                    opacity: collection.focused ? 0 : 1,
                } as React.CSSProperties}
            >

                {collection.description}

            </div>

            <div
                className={' md:hidden text-white text-xs md:text-sm lg:text-md xl:text-md font-light delay-800 mb-5 md:max-w-[60vw] lg:max-w-[40vw]'+ (collection.focused ? ' collection-background-info-show ': '')}

                style={{
                    //for animating disappearing when focused
                    '--custom-delay': 250+'ms ',
                    opacity: collection.focused ? 0 : 1,
                } as React.CSSProperties}
            >

                {collection.description}

            </div>

          </div>

          <div
                className={'cursor-pointer mt-[100px] hover:text-white right-[46vw] text-white/[0.6] mb-0 font-bold ' + (collection.focused ? ' collection-background-info-show ': '')}
                onClick={()=>scrollRef!.current?.scrollIntoView({behavior: 'smooth'})}
                style={{
                  //for animating disappearing when focused
                  '--custom-delay': 300+'ms ',
                } as React.CSSProperties}
                >

                    <div 
                        className={'button border-2 rounded-full cursor-pointer px-5 py-3 bg-transparent text-white text-sm xl:text-sm 2xl:text-sm'  }
                        
                        >
                        <span>
                            View Collection
                        </span>
                    </div>

          </div>


          <div
                className={'cursor-pointer mt-[20px] hover:text-white right-[46vw] text-white/[0.6] mb-0 font-bold ' + (collection.focused ? ' collection-background-info-show ': '')}
                style={{
                  //for animating disappearing when focused
                  '--custom-delay': 300+'ms ',
                } as React.CSSProperties}
                >
                  <Link href={`/collections`}>

                    <div 
                        className={'button border-2 rounded-full cursor-pointer px-5 py-3 bg-transparent text-white text-sm xl:text-sm 2xl:text-sm'  }
                        
                        >
                        <span>
                            Discover More Collections
                        </span>
                    </div>
                  </Link>

          </div>

        </div> 

      </div>

      <div className={'relative top-[100vh] min-w-[100vw] bg-dark container flex flex-col items-center mx-auto px-3 '+(menu?' blur-filter': ' trans-100')}
        style={{
          boxShadow: 'rgba(0, 0, 23, 260.56) 0px 22px 70px 4px'
        }}
      >
        <h1 ref={scrollRef} className='text-white font-bold text-4xl py-10 pt-[120px] font-staatliches'>
          {`${collection.title} Collection`}
        </h1>

        <div className='grid grid-cols-1 lg:grid-cols-8 gap-1'>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-1 col-span-1 lg:col-span-6 lg:col-start-2 mx-auto ">

            <div className='hidden lg:block lg:col-span-1  col-span-1'>

              <div className={"lg:sticky relative transition-all duration-300 "
                + (scrollDirection === 'up' || scrollY < 30 ?  ' lg:top-[100px]' : ' lg:top-[20px]')
              }>

                  <CollectionsWidget />

              </div>

            </div>

            <div className="col-span-1 lg:col-span-3">
              {collection.posts.map((post:any, index:number) => (
                <PostCard key={index} post={post} />
              ))}
            </div>

            <div className="col-span-1">
              <div className={"relative lg:sticky transition-all duration-300 "
                + (scrollDirection === 'up' || scrollY < 30 ?  ' lg:top-[100px]' : ' lg:top-[20px]')
              }>
                <Categories />
              </div>
            </div>
          </div>
        </div>
        
      </div>

      

      
    </div>
    </>
  );
};
export default TagPost;

// Fetch data at build time
export async function getStaticProps({ params }:any) {

    console.log("params: ", params);
    const collection = await getCollection(params.slug);

  return {
    props: { slug: params.slug, collection },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
// eslint-disable-next-line @typescript-eslint/ban-types
export async function getStaticPaths(): Promise<{}>{
  const collections = await getCollections();
  return {
    paths: collections.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}