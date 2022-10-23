/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';
import React, {useContext,useEffect, useRef, useState} from 'react';
import * as ReactDOM from 'react-dom';
import { FiArrowDownCircle } from "react-icons/fi";
import { TiArrowLeftThick, TiArrowRightThick } from "react-icons/ti";

import useWindowDimensions from '@/hooks/useWindowDimensions';
import { useWindowScrollPositions } from '@/hooks/useWindowScrollPositions';

import { StateContext } from '@/pages/_app';
import { truncate } from '@/utils/utils';

interface SlidingCollectionsInterface  {
    collectionsProp: [],
    scrollRef: React.RefObject<HTMLDivElement>,
    title: string,
    featured: boolean
}

const SlidingCollections = ({collectionsProp, scrollRef, title, featured}: SlidingCollectionsInterface):JSX.Element => {
    const [collections, setCollections] = useState<[] | any>([]);
    // change parent background
    const [parentBackgroundImage, setParentBackgroundImage] = useState('https://seeabletarlac.vercel.app/images/logo.png');
    const [featuredCollectionsPosition, setFeaturedCollectionsPosition] = useState({top:0, left: 0});

    const parentRef = useRef<HTMLDivElement>(null);
    const innerContainerRef = useRef<HTMLDivElement>(null);
    const widgetRef = useRef<HTMLDivElement>(null); //ref for second widget in list, to be used as reference
    const isFirstRender = useRef(true);

    const {scrollX, scrollY} = useWindowScrollPositions(); 
    const {windowHeight, windowWidth } = useWindowDimensions(); 

    const {menu} = useContext(StateContext);

    useEffect(()=>{
        // eslint-disable-next-line no-console
        console.log('collection results: ', collectionsProp);

            setCollections(collectionsProp.map((collection: any, index:number)=>{

                collection.cleanup = false; 
                return collection; 
            }));
        
    }, [collectionsProp]);

    useEffect(()=>{

        if(isFirstRender.current && collections.length > 0){
            focusCollection(0);
            isFirstRender.current = false; 
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [collections]);

    useEffect(()=>{

        const top = widgetRef.current?.offsetTop;
        const left = widgetRef.current?.offsetLeft; 

        setFeaturedCollectionsPosition({
            top: typeof top !== 'undefined' ? top : 0,
            left: typeof left !== 'undefined' ? left : 0
        });

    }, [])


    const focusCollection = (targetIndex:number) => {

        // eslint-disable-next-line no-console
        console.log('featuredRef: ', widgetRef);

        //grab the target background image
        // eslint-disable-next-line no-var
        var backgroundImage = collections[targetIndex].image.url; 
        const buriedCollections: []| any = [];
        const updatedCollections = collections.map((collection:any, index:number)=>{

            //flag old focused for cleanup
            if(collection.focused){
                collection.cleanup = true; 
            }

            //remove all previous focused collections
            collection.focused = false; 

            if(index == targetIndex){

                collection.focused = true; 

            }

            //put collections index < target index in buried collections

            if(index < targetIndex){
                buriedCollections.push(collection)
            }

            return collection; 
        });

        ReactDOM.flushSync(()=>{
            setCollections(updatedCollections);
        });


        //move targetIndex to start of list
        const newCollections = [
            ...collections.filter((c:any, index:number)=>index == targetIndex), 

            //add non buried collections
            ...collections.filter((c:any, index:number)=>index > targetIndex),

            //add the buried collection to end of list
            ...buriedCollections

        ]

        // eslint-disable-next-line no-console
        console.log('new collections: ', newCollections);

        setTimeout(()=>{
            ReactDOM.flushSync(()=>{
                setCollections(newCollections.map((collection:any, index:number)=>{

                    //remove cleanup flag
                    if(collection.cleanup){
                        collection.cleanup = false; 
                    }
    
                    return collection; 
                }));
            });
        }, 700);
        
        setTimeout(()=>{

            //set the background image of the parent to match the current focus
            ReactDOM.flushSync(()=>{
                setParentBackgroundImage(backgroundImage);

                /*Why am I doing this?
                    So that when the next focus happens, the current focus'
                    image will be the background, however it will be the parent div background
                    and not the actual element. Creating the illusion of an infinte rotating parent
                    child list. 
                */
            });
            
        }, 1500);



        

        
    }

    //experiment with setting this to fixed when you get the chance
    const focusedStyle = 'fixed focused-animation-transition featured-collection-widget w-full h-full ';
    const unfocusedStyle = 'lg:hover:border-[5px] xl:hover:border-[10px] hover:duration-300 absolute animation-transition featured-collection-widget rounded-lg 2xl:w-[250px] 2xl:h-[400px]  xl:w-[200px] xl:h-[300px] lg:w-[150px] lg:h-[250px] md:w-[150px] md:h-[200px] w-[150px] h-[150px] flex flex-col items-sart justify-end';
    const cleanupStyle = 'duration-0 opacity-0';


    const getLayout = (params:any) => {

        return collections.map((collection:any, index:number)=>{

            const marginBottom = params.marginBottom; //150; 
            const marginLeft = params.marginLeft; //10; 
            const offset = params.offset;

            return (

                <div
                    key={collection.slug}
                    className={
                            'collection-image bg-cover overflow-hidden '
                            + (collection.focused ? 
                                focusedStyle : 
                                collection.cleanup ? '' : unfocusedStyle)
                            + (collection.cleanup ? cleanupStyle : '') 
                            + (collection.focused ? '' :' custom-animation-delay : '+index*300+50+'ms ' )
                        }
                            
                    style={{
                        backgroundImage: `url('${collection.image.url}')`,
                        left: collection.focused ? 
                            '0px' : 
                            (parentRef!.current!.clientWidth - offset + index*(270+marginLeft)) + 'px',
                        bottom: collection.focused ? '0px' : marginBottom+10+'px',
                        opacity: collection.focused ? 1 : 0,
                        '--custom-delay': index*200+50+'ms '

                    } as React.CSSProperties}

                    ref = {index == 1 ? widgetRef : null}

                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    onClick={collection.focused ? ()=>{} : ()=>focusCollection(index)}
                >

                    <div
                        
                        className={(collection.focused ? ' no-blur overflow-hidden max-h-full max-w-full h-full w-full p-[60px] xl:p-[80px] 2xl:p-[150px] ': 'max-h-[0px] max-w-full') + ' focused-info bg-gradient-to-b from-black/[0.6] to-transparent'}
                            
                        style={{
                            //for animating disappearing when focused
                            
                            opacity: collection.focused ? 1 : 0,
                        } as React.CSSProperties}
                    >

                        { collection.focused && 
                        
                            <div

                                className={
                                    ' flex flex-col h-full w-full items-start md:justify-start sm-short:pt-[30px] pt-[15vh] md:pt-[15vh] lg:pt-0 lg:justify-center'
                                    + (collection.focused && scrollY < windowHeight*0.5 ? ' collection-background-info-show ': '')
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
                                    className={'w-[100px] h-[1px] mb-[5px] md:mb-[30px]'+ (collection.focused ? ' collection-background-info-show ': '')}
                                    style={{
                                        //for animating disappearing when focused
    
                                        '--custom-delay': 150+'ms ',
                                        opacity: collection.focused ? 0 : 1,
                                    } as React.CSSProperties}
                                    
                                >

                                </div>

                                <div
                                    className={'hidden text-white text-xs md:text-md font-light delay-400 mb-5 max-w-[300px] '+ (collection.focused ? ' collection-background-info-show ': '')}

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

                                    {truncate(collection.description, 1000)}

                                </div>


                                <div className='flex flex-row items-center flex-wrap '>

                                    <Link href={`/collections/${collection.slug}`}>
                                        <div 
                                            className={'button border-2 rounded-full cursor-pointer px-5 py-3 m-1 bg-transparent text-white  text-xs xl:text-xs 2xl:text-sm' + (collection.focused ? ' collection-background-info-show ': '')}
                                            style={{
                                                //for animating disappearing when focused
                                                '--custom-delay': 300+'ms ',
                                                opacity: collection.focused ? 1 : 0,
                                            } as React.CSSProperties}
                                            >
                                            <span className='hover:text-primary-300'>
                                                Discover
                                            </span>
                                        </div>
                                    </Link>

                                    {featured && 
                                        <Link href={`/collections`}>
                                            <div 
                                                className={'button border-2 rounded-full cursor-pointer px-5 py-3 m-1 bg-transparent text-white text-xs xl:text-xs 2xl:text-sm' + (collection.focused ? ' collection-background-info-show ': '')}
                                                style={{
                                                    //for animating disappearing when focused
                                                    '--custom-delay': 300+'ms ',
                                                    opacity: collection.focused ? 1 : 0,
                                                } as React.CSSProperties}
                                                >
                                                <span className='hover:text-primary-300'>
                                                    View All
                                                </span>
                                            </div>
                                        </Link>
                                    }
                                    
                                </div>
                                
                            </div>  
                        }
                        
                        
                        

                    </div>

                    <div 
                        className={
                            'cursor-pointer flex flex-col h-full w-full items-start justify-start bg-gradient-to-b from-transparent to-black/[0.6] p-5 2xl:p-10'
                            + (collection.focused ? ' collection-card-info-hide ': '')
                        }
                        style={{
                            //for animating disappearing when focused

                            opacity: collection.focused ? 0 : 1,
                        } as React.CSSProperties}
                        > 
                        
                        <div className='font-staatliches text-white text-xl xl:text-2xl 2xl:text-4xl font-bold 2xl:pt-[180px] xl:pt-[160px] lg:pt-[80px] sm-short:pt-0'> 
                            {collection.title}
                        </div> 

                        <div className='text-white text-xs lg:text-xs xl:text-md font-light'> 
                            {truncate(collection.subtitle, 100)}
                        </div>
                    </div>
                    

                    

                </div>

            );
            
        });
    }

    return (
        <div 
            className={'fixed overflow-x-hidden overflow-y-visible bg-cover mobile-min-100vh min-w-[100vw] bg-white flex flex-row items-end justify-end after:bg-gradient-to-b from-black/[0.4] to-transparent after:w-full after:block after:min-h-full after:content-[""] '
                + (scrollY > windowHeight*0.5 || menu ? ' blur-filter ': ' trans-500')
                }
            style={{
                backgroundImage: `url('${parentBackgroundImage}')`,
            }}
            ref={parentRef}
            >

            <div 
                className='hidden sm-short:flex sm:hidden transition-all md:hidden lg:hidden xl:hidden 2xl:hidden flex-row overflow-hidden'
                ref={innerContainerRef}
                >
                {getLayout({
                    marginLeft: -115,
                    marginBottom: 100,
                    offset: 510
                })}
            </div>

            <div 
                className='transition-all sm:flex sm-short:hidden md:hidden lg:hidden xl:hidden 2xl:hidden flex-row overflow-hidden'
                ref={innerContainerRef}
                >
                {getLayout({
                    marginLeft: -110,
                    marginBottom: 150,
                    offset: 510
                })}
            </div>
            
            <div 
                className='hidden transition-all md:flex lg:hidden xl:hidden 2xl:hidden flex-row overflow-hidden'
                ref={innerContainerRef}
                >
                {getLayout({
                    marginLeft: -110,
                    marginBottom: 150,
                    offset: 650
                })}
            </div>

            <div 
                className='hidden transition-all lg:flex xl:hidden 2xl:hidden flex-row overflow-hidden'
                ref={innerContainerRef}
                >
                {getLayout({
                    marginLeft: -90,
                    marginBottom: 120,
                    offset: 700
                })}
            </div>

            <div 
                className='hidden transition-all xl:flex 2xl:hidden flex-row overflow-hidden'
                ref={innerContainerRef}
                >
                {getLayout({
                    marginLeft: -50,
                    marginBottom: 120,
                    offset: 900
                })}
            </div>

            <div 
                className='hidden transition-all xl:hidden 2xl:flex flex-row overflow-hidden'
                ref={innerContainerRef}
                >
                {getLayout({
                    marginLeft: 10,
                    marginBottom: 130,
                    offset: 1100
                })}
            </div>


            <div
                
                className={'hidden md:block transition-all duration-1000 absolute text-white/[0.4] mb-0 text-[20px] lg:text-[40px] xl:text-[60px] 2xl:text-[80px] font-bold font-staatliches'}

                style={{
                    top: featuredCollectionsPosition.top > 0 ? (featuredCollectionsPosition.top - 150)+ 'px' : '33vh',
                    left: featuredCollectionsPosition.left > 0 ? featuredCollectionsPosition.left + 'px' : 'auto',
                    right: featuredCollectionsPosition.left > 0 ? 'auto' : '150px'
                }}
                >

                {title}

            </div>

            <div
                    className='hidden text-white nav-buttons absolute md:flex flex-row space-x-[60px] w-[300px] right-[20vw] bottom-[90px] text-xs xl:text-xs 2xl:text-sm'
                >

                    <div
                        className={
                            'transition-all duration-300 button px-5 py-2 border-2 xl:border-[3px] rounded-full cursor-pointer flex flex-row hover:bg-white hover:text-black/[0.5] hover:border-3'
                            + (collections.length > 0 && collections[0].image.url == parentBackgroundImage ? ' opacity-1': ' opacity-[0.1]')
                        }
                        onClick={()=>{

                            if(collections.length > 0 && collections[0].image.url == parentBackgroundImage){
                                focusCollection(collections.length - 1)
                            }
                            
                        }}
                    >
                        <TiArrowLeftThick />
                        
                        
                    </div>

                    <div
                        className={
                            'transition-all duration-300 button px-5 py-2 border-2 xl:border-[3px] rounded-full cursor-pointer flex flex-row hover:bg-white hover:text-black/[0.5] hover:border-3'
                            + (collections.length > 0 && collections[0].image.url == parentBackgroundImage ? ' opacity-1': ' opacity-[0.1]')
                        }
                        onClick={()=>{

                            //when transition finishes collection at [0] should have same background
                            //as the container
                            //only change if collection at [0] has same background as container
                            if(collections.length > 0 && collections[0].image.url == parentBackgroundImage){
                               focusCollection(1) 
                            }
                            
                        
                        }}
                    >
                        
                        <TiArrowRightThick />
                    </div>

            </div>

            <div
                className={'absolute cursor-pointer bottom-[20px] hover:text-white animate-bounce right-[46vw] text-white mb-0 text-[30px] xl:text-[50px] font-bold font-staatliches'}
                onClick={()=>scrollRef!.current?.scrollIntoView({behavior: 'smooth'})}
                >

                <FiArrowDownCircle />

            </div>
            

        </div>
    );

}

export default SlidingCollections; 