/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { useRouter } from 'next/router';
import React, { useContext } from 'react';

import useScrollDirection from '@/hooks/useScrollDirection';
import { useWindowScrollPositions } from '@/hooks/useWindowScrollPositions';

import { Author, Categories, CollectionsWidget,Comments, CommentsForm, Loader, PostDetail, PostWidget } from '@/components/post'; 

import { StateContext } from '@/pages/_app';
import { getPostDetails,getPosts } from '@/services'; 

export interface PostDetailsProps {
    post: {} | any
}

const PostDetails = ( { post } : PostDetailsProps) : JSX.Element => {

    const router = useRouter();
    const {menu} = useContext(StateContext);
    const scrollDirection = useScrollDirection();
    const {scrollY} = useWindowScrollPositions();

    if(router.isFallback){
        return <Loader />;
    }

    return (
        <div className={'container mx-auto md:px-10 mb-8'+(menu?' blur-filter': ' trans-500')}>

            <div className='grid grid-cols-1 lg:grid-cols-5 gap-1'>

                <div className='hidden lg:block lg:col-span-1'>
                    <div className={'relative lg:sticky transition-all duration-300  '
                        + (scrollDirection === 'up' || scrollY < 30 ?  ' lg:top-[100px]' : ' lg:top-[20px]')
                    }>
                        <CollectionsWidget />
                        

                    </div>
                    
                </div>

                <div className='col-span-1 lg:col-span-3'>

                    <PostDetail post={post}/>
                    <Author author={post.author}/>
                    <CommentsForm slug={post.slug}/>
                    <Comments slug={post.slug}/>

                </div>

                <div className='col-span-1'>
                    <div className={'relative lg:sticky transition-all duration-300 '
                        + (scrollDirection === 'up' || scrollY < 30 ?  ' lg:top-[100px]' : ' lg:top-[20px]')
                    }>
                        <PostWidget 
                            slug={post.slug}
                            categories={post.categories.map((category: any) => category.slug) }
                            />
                        <Categories />

                    </div>
                    
                </div>

            </div>
        </div>
    );
}

export const getStaticProps = async ({params}: any) : Promise<{}> => {

    const data = await getPostDetails(params.slug);
  
    return {
      props: { post: data }, revalidate: 60
    }
  }

export const getStaticPaths = async () : Promise<{}> => {

    const posts = await getPosts();

    return {
        paths: posts.map(({ slug }) => ({ params: {slug}})),
        fallback: false
    }
}


export default PostDetails; 