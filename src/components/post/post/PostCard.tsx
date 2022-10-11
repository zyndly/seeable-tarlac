/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import moment from 'moment';
import Link from 'next/link';
import React from 'react';
import { FiCalendar } from 'react-icons/fi'; 

export interface Post {
    post: {
        title: string,
        excerpt: string,
        featuredImage: {
          url: string
        },
        slug: string,
        author: {
          name: string,
          photo: {
            url: string
          }
        },
        createdAt: string,
        categories: []
    }
}

const PostCard = ({ post }: Post): JSX.Element => {

  return (
    <div className='bg-black/[0.3] flex flex-col items-center text-white rounded-lg p-0 lg:pb-20 pb-12 mb-8 '>
        
        {/*Image div */}
        <div className='relative overflow-hidden h-80 w-full lg:h-[400px] pb-80 px-0 mb-6 rounded-tl-lg rounded-tr-lg'>

          <img 
            src={post.featuredImage?.url} 
            alt={post.title}
            className='object-top relative h-80 lg:h-[400px] w-full object-cover rounded-t-lg'
            >
          
          </img>
        </div>

        {/* title*/}
        <h1 className='transition duration-300 text-center mb-8 cursor-pointer
           text-2xl font-bold text-lime-500
        '>

          <Link href={`/post/${post.slug}`}>
            {post.title}
          </Link>
        </h1>

        {/* */}
        <div className='block lg:flex flex-col text-center items-center justify-center  mb-8 w-full'>

          <div className='flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8'>

            <img 
              alt={post.author.name}
              height="30px"
              width="30px"
              className='align-middle rounded-full'
              src={post.author.photo.url}
            />

            <p className='inline align-middle text-white/[0.5] ml-3 text-sm'>
              {post.author.name}
            </p>

          </div>

          <div className='font-medium text-sm text-white/[0.5] flex flex-row align-center justify-center m-5'>
            <FiCalendar className='mt-[3px] mr-3' />
            <span className=''>
              {moment(post.createdAt).format('MMM DD, YYYY')}
            </span>
          </div>
          

        </div>

        <p className='text-center text-md text-white/[0.8] font-light px-4 lg:px-20 mb-8'>
          {post.excerpt}
        </p>

        <div className='text-center'>
          <Link href={`/post/${post.slug}`}>
            <span className='transition duration-300 transform inline-block bg-black hover:bg-lime-400 hover:text-black hover:font-normal text-md font-light rounded-full text-lime-500 px-8 py-2 cursor-pointer'>
              Read more
            </span>
          </Link>
        </div>

    </div>
  )
}

export default PostCard;