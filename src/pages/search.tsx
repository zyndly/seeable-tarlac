/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable unused-imports/no-unused-vars */
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext,useEffect, useRef, useState } from 'react';
import { BsCloudMoonFill } from "react-icons/bs";

import { Loader } from '@/components/post';

import { StateContext } from './_app';
import { searchPosts } from '../services';
import { truncate } from '../utils';

interface SearchPostProps {
    posts: [],
    tag: string
}

const SearchPosts = () : JSX.Element => {

    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    const [debounce, setDebounce] = useState(false);
    const [morePosts, setMorePosts] = useState(false);
    const {menu} = useContext(StateContext);
    const [initialPosts, setInitialPosts] = useState([]);
    const [moreInitialPosts, setMoreInitialPosts] = useState(false);
    const [lastQuery, setLastQuery] = useState('');
    const [userSearched, setUserSearched] = useState(false);

    console.log(router.query);

    const searchEl = useRef<HTMLInputElement>(null);
    useEffect(()=>{

        if(typeof router.query.searchQuery === 'string'){
            setSearchQuery(router.query.searchQuery as string); 
            searchPosts(searchQuery, 10).then((results: any)=>{

                setPosts(results)
            });
        }
            
    }, [router.query.searchQuery, searchQuery]);

    

    const submitSearch = (force = false) => {

        const searchQuery:string = searchEl!.current!.value; 

        if(debounce && !force){
            console.log("debounced");
            return; 
        }

        console.log("searched, searchEl: ", searchEl!.current!.value);

        setDebounce(true);
        setTimeout(()=>{
            setDebounce(false);

            const updatedQuery:string = searchEl!.current!.value;
            //search after debounce if query has changed -- searchEl gives up to date value
            if(updatedQuery !== searchQuery){
                updatePosts(updatedQuery);
            }
            
        }, 2000);

        updatePosts(searchQuery);
    }

    const updatePosts = (searchQuery:string):void => {

        setSearchQuery(searchQuery);
        console.log("last query set: ", searchQuery);


        //check if contains only white space
        if(/^\s*$/.test(searchQuery)){
            setPosts([]);

            return; 
        }

        searchPosts(searchQuery, 10).then((searchResults:any)=>{

            if(searchResults.length > 10){
                setMorePosts(true);
            }else{
                setMorePosts(false);
            }

            setPosts(searchResults.filter((post:any, index:number)=>index < 10));
        });
    }

    if (router.isFallback) {
        return <Loader />;
    }

    return (
        <div className={"container mx-auto px-10 mb-8 mt-[100px] trans-500 flex flex-col items-center"+(menu? ' blur-filter': '')}>



            {
            //New code
            }

            <div 
                className={'w-full h-auto landing-hero  pb-15 mb-15 bg-cover grid grid-cols-1 lg:grid-cols-6 gap-1'+(menu? ' blur-filter ': ' trans-500')}

                >

                    <div className='container  mx-auto px-0 py-[70px] md:py-[100px] col-span-1 lg:col-span-4 lg:col-start-2'>

                        <div className='landing-title hidden md:flex flex-col items-center justify-center col-span-1 lg:col-span-6 mb-0 md:mb-15'>
                            <div className='flex flex-col items-center justify-center text-white mb-5'>

                                <div className=' text-[50px] md:text-[100px] lg:text-[150px]  mb-5'>
                                    <BsCloudMoonFill/>
                                </div>

                                <span className='text-2xl md:text-4xl font-[900] text-white pt-[20px] text-center font-labelle'>
                                    Console.blog();
                                </span>
                                
                            </div>

                        </div>

                        <div className='landing-title col-span-1 lg:col-span-6 rounded-lg mx-3'>
                            <div className='flex flex-col w-full h-full items-center justify-center pt-[50px]'>

                                <span className='text-white/[0.5] text-xl font-light'>
                                    Search Articles
                                </span>
                                
                                <input 
                                    type='text'
                                    className='transition-all duration-500 p-4 px-4 m-4 outline-none w-full md:w-[70%] bg-black/[0.3] rounded-full focus:ring-2 focus:ring-white/[0.3] text-lg text-white/[0.6] text-center'
                                    placeholder='Your query'
                                    name='search'
                                    ref={searchEl}
                                    onKeyUp={()=>{submitSearch(false)}}
                                />
                                


                                
                                
                                
                            </div>
                        </div>
                        
                        
                        
                    </div>



            </div>

            
            {
                //END OF NEW CODE
            }
            <h1 className='text-white font-bold text-2xl py-10'>
                {posts.length > 0 ? 'Results for: '+ searchQuery : 'No results'}
            </h1>

            <div className="container grid grid-cols-1 lg:grid-cols-5 gap-1">

                {/* <div className='hidden lg:block lg:col-span-1  col-span-1'>

                    <div className="lg:sticky relative top-[100px]">

                        <CollectionsWidget />

                    </div>

                </div> */}

                <div className="col-span-1 lg:col-span-5">
                    {posts.map((post:any, index:number) => (
                        <Link href={`/post/${post.slug}`} key={post.id}>
                            <div className='flex flex-col md:flex-row justify-items-start items-center w-full md:h-[300px] mb-4 bg-[#4A5A6A]/[0.3] rounded-lg overflow-hidden cursor-pointer'>

                                <div className='md:min-w-[200px] md:max-w-[200px] md:min-w-[270px] md:max-w-[270px] md:min-h-[100%] md:h-[100%] object-cover'>
                                    <img
                                        className=" min-w-[100%] min-h-[100%] object-cover md:h-auto md:rounded-none mr-5" 
                                        src={post.featuredImage.url} 
                                    />
                                </div>
                                
                                
                                <div className='text-white flex flex-col p-5 md:h-full flex-1'>
                                    <span className='font-semibold py-5 flex-none'>
                                        {post.title}
                                    </span>

                                    <span className='flex-1 text-white/[0.5] py-4 flex-none md:max-h-[150px] overflow-hidden'>
                                        {
                                            //why use a framework when you can roll your own?
                                            truncate(post.excerpt, 250)
                                        }
                                    </span>

                                    <div className='flex-none flex flex-row flex-wrap w-full h-20 items-center justify-center'>
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
                        </Link>
                    ))}
                </div>
                {/* <div className="col-span-1 lg:col-span-1">
                    <div className="relative lg:sticky top-[100px]">
                        <Categories />
                    </div>
                </div> */}
            </div>
        </div>
    );
};
export default SearchPosts;