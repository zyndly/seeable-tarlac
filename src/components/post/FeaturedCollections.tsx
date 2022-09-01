/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import useEffectUpdate from '@/hooks/useEffectUpdate';


const FeaturedCollections = () : JSX.Element => {

    const [collections, setCollections] = React.useState<[] | any>([]);
    const [shadowCollections, setShadowCollections] = React.useState<[] | any>([]);
    const [shadowPosition, setShadowPosition ] = React.useState({top: 0, left: 0});
    const [parentBackgroundImage, setParentBackgroundImage] = React.useState('');
    const [targetIndexState , setTargetIndex] = React.useState(0);
    const backgroundRef = React.useRef(null); 
    const firstCollectionsPopulate = React.useRef(true);
    const isFirstRender = React.useRef(true)


    const dummyCollections = [

        {
            backgroundImage: 'https://media.graphassets.com/cl6ixwrpxf11o0e15462q3dxr',
            title: 'test title',
            subtitle: 'test subtitle',
            description: 'This is a test description',
            slug: 'test',
            focused: true
        },
        {
            backgroundImage: 'https://media.graphassets.com/cl6ixwrpxf11o0e15462q3dxr',
            title: 'test title',
            subtitle: 'test subtitle',
            description: 'This is a test description',
            slug: 'test',
            focused: false
        },
        {
            backgroundImage: 'https://media.graphassets.com/cl6ixwrpxf11o0e15462q3dxr',
            title: 'test title',
            subtitle: 'test subtitle',
            description: 'This is a test description',
            slug: 'test',
            focused: false
        },
        {
            backgroundImage: 'https://media.graphassets.com/cl6ixwrpxf11o0e15462q3dxr',
            title: 'test title',
            subtitle: 'test subtitle',
            description: 'This is a test description',
            slug: 'test',
            focused: false
        }
    ];

    React.useEffect(()=>{

        setCollections(dummyCollections.map((collection: any, index:number)=>{

            collection.ref = React.createRef(); 
            collection.stage = 2; //collections must start with stage2

            //values for initial index
            if(index==0){

                collection.focused = true;
                collection.top = 0;
                collection.left = 0; 
            }

            return collection; 
        }));

        setTargetIndex(0);
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const firstCollectionsCB = React.useCallback(() => {

        // eslint-disable-next-line no-console
        console.log("collections: ", collections);

        if (isFirstRender.current) {
            isFirstRender.current = false // toggle flag after first render/mounting
            return;
        }
        
        //for first collections population
       

        if(firstCollectionsPopulate && collections.length > 0){

            setParentBackgroundImage(collections[targetIndexState].backgroundImage);
        }

        firstCollectionsPopulate.current = false; 


    }, [collections, targetIndexState]);

    useEffectUpdate(firstCollectionsCB);

    React.useEffect(()=>{

        if(firstCollectionsPopulate.current == false ){
            // eslint-disable-next-line no-console
            console.log('backgroundImage should be updating, target index: ', targetIndexState);
            setParentBackgroundImage(collections[targetIndexState].backgroundImage);
        }
        
    }, [collections, targetIndexState]);


    const focusCollection = async (targetIndex:number, ref: React.RefObject<HTMLDivElement>) => {
        /* 
            2 steps
            First get position of element and set it to absolute in that position
            Then animate it to full screen while changing position to top
   
        */

        await Promise.resolve("state updated");  //to stop react batch updating 

        //get element position
        const top: number = ref!.current!.offsetTop;
        const left:number = ref!.current!.offsetLeft;
        let previousFocusIndex = 0;

        //remove duplicates
        const collectionsCopy = collections.filter((collection:any)=> !collection.duplicate); 

        //unfocus all other collections and set element position
        setCollections( collectionsCopy.map((collection:any, index: number)=>{

            // eslint-disable-next-line no-console
            console.log("index: ", targetIndex);

            collection.focused = targetIndex === index; 

            if(index === targetIndex){

                //set position for absolute
                collection.top = top;
                collection.left = left; 
                collection.stage = 1;
            }

            //deal with removal of previously focused collection
            if(collection.focused){
                previousFocusIndex = index; 
            }

            return collection;

        }));
        

        //animate to fullscreen while changing top position to 0
        const timeout1 = setTimeout(()=>{

            ReactDOM.flushSync(()=>{
                setCollections( 
                    collections.map((collection:any, index: number)=>{

                        const newCollection:any = {
                            ...collection
                        }
                        newCollection.focused = targetIndex === index; 

                        

                        if(index === targetIndex){

                            //set position for absolute
                            newCollection.top = top;
                            newCollection.left = left; 
                            newCollection.stage = 2;
                        }

                        return newCollection; 
                        
                    })
                );
            });
            

            clearTimeout(timeout1);

        }, 20);        

        /*
            This is to avoid dealing with the problem of "how do display elements hidden behind another"
            while they all remain in relative position. 

            Instead, what we will do is enlarge the focused collection, and then after its enlarged, 
            we will set the background of the parent div to be the same. After which, we hide the focused collection.

            This will result in other elements still being displayed instead of being hidden behind the enlarged
            focused collection. 

            The disadvantage of this approach however is that we will need to wait again. 
        */

        //set the background div to be the same
        
        /* remove previously focused collection and re-populate in array 
            For this, you need to:
                                    Set the background image of the parent div to be the same image
                                    A useEffect call is used for this
                  
        */

        const timeout2 = setTimeout(()=>{

            ReactDOM.flushSync(()=>{
                setTargetIndex(targetIndex);
            });
                       
            clearTimeout(timeout2);

        }, 800);

        const timeout3 = setTimeout(()=>{
            //now set the targetIndex to stage3, which removes it from UI until the next index change
            ReactDOM.flushSync(()=>{
                setCollections(
                    collections.map((collection:any, index: number)=>{

                        if(index === targetIndex){

                            //set position for absolute
                            collection.stage = 3;
                        }

                        return collection; 
                        
                    })
                );
            });

            clearTimeout(timeout3);
        }, 850);


        // console.log('target index: ', targetIndex);

        //reorder collection approach

        // setTargetIndex(targetIndex);

        // let timeout3 = setTimeout(()=>{

        //     let newCollections = [
        //         ...collections.filter((collection:any, index:number)=>index == targetIndex),
        //         ...collections.filter((collection:any, index:number)=>index !== targetIndex)
        //     ]
    
        //     setCollections(newCollections);

        //     clearTimeout(timeout3);

        // }, 1000);

        
        //setShadowCollections(collections.map((collection:any, index:number)=> index !== targetIndex));

        // eslint-disable-next-line no-console
        console.log("collections: ", collections);
    }

    const computeTop = (collection:any):string => {

        let top = '0px';

        if(collection.focused && (collection.stage === 1)){
            //top should be ref size
            top = collection.top ? `${collection.top}px` : 'auto'; 

        }else if(collection.focused && (collection.stage === 2)) {
            //top be should 0
            top = '0px'; 

        } else {
            //case where collection is not focused
            top = 'auto'; 
        }


        return top;

    }

    const computeLeft = (collection:any):string => {

        let top = 'auto';

        if(collection.focused && (collection.stage === 1)){
            //top should be ref size
            top = collection.left ? `${collection.left}px` : 'auto'; 

        }else if(collection.focused && (collection.stage === 2)) {
            //top should be 0
            top = '0px'; 

        }else {
            //case where collection is not focused
            top = 'auto'; 
        }


        return top;

    }

    const computeStyling = (collection:any):string=> {

        let style = unfocusedClass;

        if(collection.stage == 1){
            style = focusedClassStage1; 
        }else if(collection.stage == 2 ) {
            style = focusedClassStage2; 
        }else {
            style = focusedClassStage3;
        }

        return style; 

    }

    const focusedClass = 'absolute delay-100 w-full h-full min-h-[100vh] z-5';
    const focusedClassStage1 = 'absolute w-[150px] h-[250px] min-h-[250px] z-5';
    const focusedClassStage2 = 'duration-1000 absolute w-full h-full min-h-[100vh] z-5';
    const focusedClassStage3 = 'duration-00 opacity-0 relative w-[0px] ';

    const unfocusedClass = 'w-[150px] h-[250px] min-w-[150px] min-h-[250px] rounded-lg z-6 m-5 drop-shadow-md hover:h-[250px]';

    return (
            <div 
                ref={backgroundRef} 
                className='relative bg-cover min-h-[100vh] min-w-[100vw] flex flex-row items-end justify-end'
                style={{
                    backgroundImage: `url('${parentBackgroundImage}')`
                }}
            >

                <div className='flex flex-row items-center justify-end'>
                    {collections.map((collection:any, index:number)=>{

                        if(index == 0){
                            // eslint-disable-next-line no-console
                            console.log('parent background image: ', parentBackgroundImage);
                        }
                        
                        //setTimeout to set y position
                        if(typeof collection == 'undefined'){

                            // eslint-disable-next-line react/jsx-key
                            return <div> Undefined </div>
                        }

                        return (
                            <div
                                key={index}
                                className={'transition-all duration-1000 ease-in-out bg-cover  z-5 ' + (collection.focused ? computeStyling(collection) : unfocusedClass)}
                                style={{
                                    backgroundImage: `url('${collection.backgroundImage}')`,
                                    top: collection.focused ? `${computeTop(collection)}` : 'null',
                                    left: collection.focused ? `${computeLeft(collection)}` : 'null'
                                }}
                                ref = {collection.ref}
                                // eslint-disable-next-line @typescript-eslint/no-empty-function
                                onClick={collection.focused ? ()=>{} : ()=>{
                                    focusCollection(index, collection.ref)
                                }}   
                            >

                            </div>
                        )
                        
                    })}
                </div>
                

            </div>
    );
}

export default FeaturedCollections; 