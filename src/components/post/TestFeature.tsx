import React, {useCallback, useEffect, useRef, useState} from 'react';
import useEffectUpdate from '../hooks/useEffectUpdate';
import FeaturedPosts from './FeaturedPosts';
import * as ReactDOM from 'react-dom';

const TestFeatured = () : JSX.Element => {

    const [collections, setCollections] = useState<[] | any>([]);
    const [shadowCollections, setShadowCollections] = useState<[] | any>([]);
    const [shadowPosition, setShadowPosition ] = useState({top: 0, left: 0});
    const [parentBackgroundImage, setParentBackgroundImage] = useState('');
    const [targetIndexState , setTargetIndex] = useState(0);
    const backgroundRef = useRef(null); 
    const firstCollectionsPopulate = useRef(true);
    const isFirstRender = useRef(true);
    const [compLayout, setCompLayout ] = useState<[] | any>([]);


    let dummyCollections = [

        {
            backgroundImage: 'https://media.graphassets.com/PE2C3O7SLAs15PHcLvpA',
            title: 'test title',
            subtitle: 'test subtitle',
            description: 'This is a test description',
            slug: 'tsdsd1',
            focused: true
        },
        {
            backgroundImage: 'https://media.graphassets.com/dMhhYSlRxWqAwqcXuQGG',
            title: 'test title',
            subtitle: 'test subtitle',
            description: 'This is a test description',
            slug: 'sdsdsd',
            focused: false
        },
        {
            backgroundImage: 'https://media.graphassets.com/aKBvD1RGRUOQwXOARuv5',
            title: 'test title',
            subtitle: 'test subtitle',
            description: 'This is a test description',
            slug: 'sdsdsdsdfdfd',
            focused: false
        },
        {
            backgroundImage: 'https://media.graphassets.com/aKBvD1RGRUOQwXOARuv5',
            title: 'test title',
            subtitle: 'test subtitle',
            description: 'This is a test description',
            slug: 'tesasasdst4',
            focused: false
        }
    ];

    useEffect(()=>{

        setCollections(dummyCollections.map((collection: any, index:number)=>{

            collection.ref = React.createRef(); 
            collection.stage = 0; //collections must start with stage 0

            //values for initial index
            if(index==0){

                collection.focused = true;
            }

            return collection; 
        }));

        setTargetIndex(0);
        
    }, []);


    const focusCollection = async (targetIndex:number, ref: React.RefObject<HTMLDivElement>) => {
        /* 
            2 steps
            First get position of element and set it to absolute in that position
            Then animate it to full screen while changing position to top


        
        */

        await Promise.resolve("state updated");  //to stop react batch updating  

        //unfocus all other collections and set element position
        setCollections( collections.map((collection:any, index: number)=>{

            console.log("index: ", targetIndex);
            //remove all previous stage2'
            collection.stage = 0; 
            //set previously focused to stage 2
            if(collection.focused){
                collection.stage = 2;
            }

            collection.focused = targetIndex === index; 

            if(index === targetIndex){

                collection.stage = 1;
            }

            return collection;

        }));

        console.log('focus collection called');

        //pop and push to collections layout
        //featureLayout.pop();

        // let newFeatureLayout = [featureLayout[0]]; 
        // newFeatureLayout.push(generateFeaturedLayout(true))
        // newFeatureLayout.push(featureLayout[1]);

        //setCompLayout(newFeatureLayout);
        //setCompLayout([featureLayout[1], featureLayout[2]]);

        //wait until animation is over to set the z-index of previous focus back to normal
        const animTimeout = setTimeout(()=>{


            ReactDOM.flushSync(()=>{

                setCollections( collections.map((collection:any, index: number)=>{

                    console.log("index: ", targetIndex);
                    //remove all previous stage2'
                    collection.stage = 0; 
        
                    collection.focused = targetIndex === index; 
        
                    if(index === targetIndex){
        
                        collection.stage = 1;
                    }
        
                    return collection;
        
                }));
            });
            

            clearTimeout(animTimeout);

        }, 3000);
        
    }

    const focusedStyling = 'w-full h-full min-h-[100vh] z-6';
    const focusedStage2 = 'delay-1000 w-[150px] h-[250px] min-h-[250px] rounded-lg z-5'; //delayed downsize animation with z-index still in back
    const unfocusedStyling = 'w-[150px] h-[250px] min-h-[250px] rounded-lg z-10 m-5 hover:h-[250px]';

    return (
            <div 
                ref={backgroundRef} 
                className='relative bg-cover min-h-[100vh] min-w-[100vw] bg-white flex flex-row items-end justify-end'
            >

                

                <div 
                    ref={backgroundRef} 
                    className='absolute bg-cover transition-all duration-500 ease-in min-h-[100vh] min-w-[100vw] bg-transparent'
                >

                    {
                    
                    
                    collections.map((collection:any, index:number)=>{

                        console.log('collection slug: ', collection.slug);

                        return (
                            <div
                                key={collection.slug}
                                className={'text-white absolute transition-all duration-1000 ease-in-out bg-cover  z-5 ' + (collection.focused ? focusedStyling : (collection.stage == 2 ? focusedStage2 : unfocusedStyling))}
                                style={{
                                    backgroundImage: `url('${collection.backgroundImage}')`,
                                    right: collection.focused ? '0px' : index*190 + 'px',
                                    bottom: collection.focused ? '0px' : '10px'
                                }}
                                ref = {collection.ref}
                                onClick={collection.focused ? ()=>{} : ()=>{
                                    focusCollection(index, collection.ref)
                                }}   
                            >

                                {collection.stage}

                            </div>
                        )

                        })}

            </div>



                

            </div>
    );
}

export default TestFeatured; 