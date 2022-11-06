/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Link from 'next/link';
import * as React from 'react';

import { DestinationPosts } from '@/components/post/FeaturedPost';
import { ChurchPosts } from '@/components/post/FeaturedPost/';
import SectionTitle from '@/components/text/SectionTitle';

import { StateContext } from '@/pages/_app';
import { searchPosts } from '@/services';
import { truncate } from '@/utils/utils';

interface SearchInterface {
  featuredPosts: [],
}

const SearchBar = ({featuredPosts}:SearchInterface): JSX.Element => {

  const [posts, setPosts] = React.useState([]);
  const [initialPosts, setInitialPosts] = React.useState([]);
  const [debounce, setDebounce] = React.useState(false);
  const [morePosts, setMorePosts] = React.useState(false);
  const [moreInitialPosts, setMoreInitialPosts] = React.useState(false);
  const [lastQuery, setLastQuery] = React.useState('');
  const [userSearched, setUserSearched] = React.useState(false);
  const searchEl = React.useRef<HTMLInputElement>(null);
  const {menu} = React.useContext(StateContext);

  const submitSearch = (force = false) => {

      //flag that user has now searched
      if(!userSearched){
          setUserSearched(true);
      }

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
          //search for debounced value -- searchEl gives up to date value
          if(updatedQuery !== searchQuery){
              updatePosts(updatedQuery);
          }
          
      }, 2000);

      updatePosts(searchQuery);
  }

  const updatePosts = (searchQuery:string):void => {

      setLastQuery(searchQuery);
      console.log("last query set: ", searchQuery);


      //check if contains only white space
      if(/^\s*$/.test(searchQuery)){
          setPosts([]);

          return; 
      }

      searchPosts(searchQuery, 6).then((searchResults:any)=>{

          if(searchResults.length > 3){
              setMorePosts(true);
          }else{
              setMorePosts(false);
          }

          setPosts(searchResults.filter((post:any, index:number)=>index < 3));
      });
  }

  React.useEffect(()=>{
      //initial search on component load
       
      if(featuredPosts.length > 3){
          setMoreInitialPosts(true);
      }else{
          setMoreInitialPosts(false);
      }

      console.log('initial posts: ', featuredPosts);

      setInitialPosts(featuredPosts.filter((post:any, index:number)=>index < 3));
      
  }, [featuredPosts]);

  return (

    <div className={'bg-[#F2F5EB] grid grid-cols-1 lg:grid-cols-6 gap-1'+(menu? ' blur-filter ': ' trans-500')}> 
      <div className='container mx-auto px-0 pt-[20px] col-span-1 lg:col-span-4 lg:col-start-2 '>

        <div className='landing-title row-span-2 col-span-1 lg:col-span-6 lg:col-start-1  rounded-lg mx-3'>
            <div className='flex flex-col h-full items-center justify-center'>
                
                <input 
                    type='text'
                    className='transition-all duration-500 p-4 px-4 m-4 outline-none w-[90vw] md:w-[50%] bg-white rounded-full focus:ring-2 focus:ring-white text-lg text-black text-center'
                    placeholder='What are you looking for...'
                    name='search'
                    ref={searchEl}
                    onKeyUp={()=>{submitSearch(false)}}
                />

                {posts.length > 0 ?
                
                
                    <div className='flex flex-col items-center justify-start w-full pt-[50px]'>

                        <span className='text-primary-800 text-3xl font-semibold'>
                            SEARCH RESULT
                        </span>
                        <span className='text-xl text-primary-700 font-semibold pb-5'>Find your home away from home</span>

                        <div className='w-full text-md'>
                            {posts.map((post:any, index:number)=>(

                                <Link href={`/post/${post.slug}`} key={post.id}>
                                    <div className='search-result-show h-[200px] max-h-[250px] bg-cover border-lime-600 border-0 hover:border-2 hover:duration-400 hover:box-content transition flex flex-row md:flex-row justify-items-start items-center w-full mb-4 bg-primary-900/[0.3] rounded-lg overflow-hidden cursor-pointer'
                                        style={{
                                            opacity: 0,
                                            '--custom-delay': index*50+'ms',
                                            //backgroundImage: `url(${post.featuredImage.url})`
                                        }as React.CSSProperties}
                                    >

                                        <div className='min-h-[300px] min-w-[25%] bg-cover'
                                            style={{
                                                height: '100%',
                                                backgroundImage: `url(${post.featuredImage.url})`
                                            }as React.CSSProperties}
                                        > 
                                        </div>
                                        
                                        <div className='text-white h-[200px] flex flex-col p-4 md:p-6 bg-black/[0.4] md:bg-black/[0.4]'>
                                            <span className='text-primary-300 font-semibold pb-2'>
                                                {post.title}
                                            </span>

                                            <span className='hidden xl:block text-white/[0.7]'>
                                                {truncate(post.excerpt, 500)}
                                            </span>

                                            <span className='block md:hidden text-white/[0.7]'>
                                                {truncate(post.excerpt, 100)}
                                            </span>

                                            <span className='hidden md:block xl:hidden text-white/[0.7]'>
                                                {truncate(post.excerpt, 300)}
                                            </span>
                                            
                                        </div>
                                        
                                    </div>
                                </Link>
                            
                            ))}
                        </div>

                        {morePosts && 

                            <Link href={{ pathname: '/search', query: { searchQuery: lastQuery } }}>
                                <div className='transition-all duration-500 cursor-pointer button bg-primary-900 text-white hover:text-primary-300 p-3 hover:px-10 px-6 rounded-full'> 
                                    View More
                                </div>
                            </Link>
                            
                        }
                        
                    </div>

                    :
                    ''
                }

                {userSearched && posts.length == 0 ?

                    <div className='flex flex-col items-center justify-start w-full pt-[20px]'> 
                        <span className='text-primary-800 text-xl'>
                            No results found
                        </span>
                    </div>
                    
                    :

                    ''
                }
                


                {initialPosts.length > 0 && posts.length == 0 ?
                    
                    <div className='flex flex-col items-center justify-start w-full pt-[20px]'>
                        <SectionTitle title="Featured Destinations" subtitle=''/>

                        <div className='w-full text-md'>
                            {initialPosts.map((post:any, index:number)=>(

                                <Link href={`/post/${post.slug}`} key={post.id}>
                                    <div className='search-result-show h-[200px] max-h-[250px] bg-cover border-0 hover:border-2 hover:duration-300 hover:box-content transition flex flex-row md:flex-row justify-items-start items-center w-full mb-4 bg-primary-900/[0.3] rounded-lg overflow-hidden cursor-pointer'
                                        style={{
                                            opacity: 0,
                                            '--custom-delay': index*50+'ms',
                                            //backgroundImage: `url(${post.featuredImage.url})`
                                        }as React.CSSProperties}
                                    >

                                        <div className='min-h-[300px] min-w-[25%] bg-cover'
                                            style={{
                                                height: '100%',
                                                backgroundImage: `url(${post.featuredImage.url})`
                                            }as React.CSSProperties}
                                        > 
                                        </div>
                                        
                                        <div className='text-primary-300 h-[200px] flex flex-col p-4 md:p-6 bg-black/[0.4] md:bg-black/[0.4]'>
                                            <span className='font-semibold pb-2'>
                                                {post.title}
                                            </span>

                                            <span className='hidden xl:block text-white/[0.7]'>
                                                {truncate(post.excerpt, 500)}
                                            </span>

                                            <span className='block md:hidden text-white/[0.7]'>
                                                {truncate(post.excerpt, 100)}
                                            </span>

                                            <span className='hidden md:block xl:hidden text-white/[0.7]'>
                                                {truncate(post.excerpt, 300)}
                                            </span>
                                            
                                        </div>
                                        
                                    </div>
                                </Link>
                            
                            ))}
                        </div>

                        {moreInitialPosts ? 

                            <Link href={{ pathname: '/collections/festivals'}}>
                                <div className='position-center ransition-all duration-500 cursor-pointer button bg-primary-900 text-primary-300 p-3 hover:px-10 px-6 rounded-full'> 
                                    View More
                                </div>
                            </Link>

                            :

                            ''
                            
                        }
                        
                    </div>

                    :

                    ''
                }

                  
                              
          </div>

          

        </div>
{/* Destinations */}     
          <SectionTitle title="Attractions" subtitle='Discover captivating destinations' />
          <DestinationPosts />

          <SectionTitle title="Churches" subtitle="Catch a glimpse of Tarlac's Beautiful Churches "/>
          <ChurchPosts />
      
      </div>
    </div>
    );
}

export default SearchBar;