/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable unused-imports/no-unused-vars */
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState  } from 'react';

import { Loader } from '@/components/post';

import { getSanclementePosts } from '@/services';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SanClementePostCard = ({ post, position }: any) => {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [featuredPost, setFeaturedPosts] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    getSanclementePosts().then((result) => {
      setFeaturedPosts(result)
      setDataLoaded(true)
    })
  }, [])


  if (router.isFallback) {
    return <Loader />;
  }


  return (
    <>
      <div ref={scrollRef} className="col-span-1 lg:col-span-3 flex flex-wrap flex-row justify-center items-start">
        {featuredPost.map((post: any) => (

            <Link href={`/post/${post.slug}`} key={post.slug}>

                <div className='cursor-pointer bg-cover w-[180px] h-[300px] bg-dark rounded-lg m-5 overflow-hidden'
                    style={{
                        backgroundImage: `url(${post.featuredImage.url})`
                    }}
                >

                    <div className='w-full h-full bg-gradient-to-b from-black/[0.6] to-black/[0.4] flex justify-center items-center '>
                        <span className=" cursor-pointer absolute px-3 py-1 mx-2 text-white font-bold font-staatliches text-sm  rounded-full text-md border-white">
                            {`${post.title}`}
                        </span>

                    </div>
                    
                </div>
                
            </Link>
        ))}
      </div>
    </>
  )
}

export default SanClementePostCard