/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment';
import Link from 'next/link';
import * as React from 'react';

import { getRecentPosts, getSimilarPosts } from '@/services';

export type Post = {
  title?: string,
  
}
interface PostWidgetProps {
  categories?: [string],
  slug?: string
}

const PostWidget = ({categories, slug}: PostWidgetProps): JSX.Element=> {

  const [ relatedPosts, setRelatedPosts ] = React.useState<[]>([]);

  React.useEffect(()=>{

    if(slug){
      //means we are looking at a specific post
      getSimilarPosts(categories, slug).then((result: []) => setRelatedPosts(result));
    }else {
      //show most recent posts
      getRecentPosts().then((result: []) => setRelatedPosts(result));
    }



    
  }, [categories, slug]);

  return (
    <div className='rounded-lg p-8 mb-8 hover:text-white'>

      <h3 className='text-xl mb-8 border-b pb-4 text-primary-900'>
        {slug ? 'Related Posts' : 'Recent Posts'}
      </h3>

      {relatedPosts.map((post:any) => (

        <Link key={post.slug} href={`/post/${post.slug}`}>
          <div key={post.slug} className='cursor-pointer flex flex-row items-center w-full my-2 py-1 text-primary-900 hover:animate-flicker bg-primary-900 rounded-full' > 

            <div className='flex-none'> 
              <img 
                className='text-primary-900 align-middle rounded-full max-h-[50px] min-h-[50px] max-w-[50px] inline-block'
                alt={post.title}
                height='50px'
                width='50px'
                src={post.featuredImage.url}
              />
            </div>

            <div className='flex-grow ml-4 '> 
              <p className=' text-sm text-gray-300'>
                {moment(post.createdAt).format('MMM DD, YYYY')}
              </p>
                <span className=' text-white'>
                  {post.title}
                </span>
            </div>
          </div>
        </Link>
        
      ))}
      
    </div>
  )
}

export default PostWidget;
