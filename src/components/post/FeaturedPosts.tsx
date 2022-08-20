import React, { useEffect, useState } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'; 
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';

interface FeaturedPostsProps {
    posts: []
}

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1024 },
        items: 2,
    },
    desktop: {
        breakpoint: { max: 1024, min: 768 },
        items: 2,
    },
    tablet: {
        breakpoint: { max: 768, min: 640 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 640, min: 0 },
        items: 1,
    },
};

const ArrowWrap = (arrowProps:any) => { 
    const {carouselState, children, ...restArrowProps} = arrowProps; 
    return ( 
        <span {...restArrowProps}> {children} </span> 
    ); 
};


const FeaturedPosts = ({posts}: FeaturedPostsProps):JSX.Element => {

    const [featuredPosts, setFeaturedPosts] = useState<[] | never[] >([]);

    useEffect(()=>{

        //call featured posts here
        let filteredPosts = posts.filter((post:any)=> post.featuredPost);
        setFeaturedPosts(filteredPosts);

    }, []);

    const arrowLeft = (
        <ArrowWrap>
            <div className=" drop-shadow-lg absolute left-0 text-center p-3 cursor-pointer bg-pink-600 transition duration-150 hover:bg-pink-500 rounded-full">
                <FiArrowLeft className='text-white'/>
            </div>
        </ArrowWrap>
        
      );
    
    const arrowRight= (
        <ArrowWrap>
            <div className=" drop-shadow-lg absolute right-0 text-center p-3 cursor-pointer bg-pink-600 transition duration-150 hover:bg-pink-500 rounded-full">
                <FiArrowRight className='text-white'/>
            </div>
        </ArrowWrap>
        
      );

    return(
        <div className='mb-8'>

            <div
                className='text-[40px] py-10 font-staatliches text-white'
            >
                Featured Destinations
            </div>


            <Carousel 
                infinite customLeftArrow={arrowLeft} 
                customRightArrow={arrowRight} 
                responsive={responsive} 
                itemClass="px-2 h-[450px]"
                autoPlaySpeed={9000}
                autoPlay={false}
                >

                {featuredPosts.map((post: any, index: number)=>(
                    

                    <div className="relative h-[450px] drop-shadow-lg" key={post.id}>
                        <div 
                            className="absolute rounded-lg bg-center bg-no-repeat bg-cover shadow-md inline-block w-full h-[450px]" 
                            style={{ backgroundImage: `url('${post.featuredImage.url}')` }} 
                            />

                        <div className="absolute rounded-lg bg-center bg-gradient-to-b from-black/[0.3] to-black/[0.6] w-full h-[450px]" />
                        <div className="flex flex-col rounded-lg p-4 items-center justify-center absolute w-full h-full">
                        <Link href={`/post/${post.slug}`}>

                            <div className="flex flex-col rounded-lg p-4 items-center justify-center w-full h-full cursor-pointer">
                                <p className="text-white mb-4 text-shadow font-semibold text-xs">
                                        {moment(post.createdAt).format('MMM DD, YYYY')}
                                    </p>

                                    <p className="text-white mb-4 text-shadow font-semibold text-2xl text-center">
                                        {post.title}
                                    </p>

                                    <div className="flex items-center absolute bottom-[130px] w-full justify-center">
                                        <Image
                                        unoptimized
                                        alt={post.author.name}
                                        height="30px"
                                        width="30px"
                                        className="align-middle drop-shadow-lg rounded-full"
                                        src={post.author.photo.url}
                                        />

                                        <p className="inline align-middle text-white text-shadow ml-2 font-medium">
                                            {post.author.name}
                                        </p>
                                </div>
                            </div>

                        </Link>

                            <div className='absolute bottom-5 flex flex-row flex-wrap w-full h-20 items-center justify-center'>

                                {post.categories.map((category:any)=>(

                                    <Link href={`/tags/${category.slug}`} key={category.slug}>
                                        <span className="relative transition duration-150 cursor-pointer absolute px-3 py-1 text-bold mx-2 bg-slate-800 hover:bg-slate-700 text-white rounded-full text-sm">
                                            {`#${category.name}`}
                                        </span>
                                    </Link>
                                ))}

                            </div>
                            
                        </div>

                    </div>

                ))}

            </Carousel>



        </div>
    );
}

export default FeaturedPosts; 