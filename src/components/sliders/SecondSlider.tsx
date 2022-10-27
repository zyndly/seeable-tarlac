
import * as React from 'react';

import { FeaturedPosts } from '@/components/post/FeaturedPost';

import { StateContext } from '@/pages/_app';

const SecondSlider = (): JSX.Element => {

    const {menu} = React.useContext(StateContext);


    return (

        <>
        <div className={
                'absolute bg-gradient-to-br from-[#ffffff]/[0.7] via-[#ffffff] to-[#ffffff]] w-full min-h-[1800px] shadow-lg h-auto bg-cover '+(menu? ' blur-filter ': ' trans-500')}
        >
        </div>

            <div className={'w-full min-h-[1800px] h-auto bg-cover '+(menu? ' blur-filter ': ' trans-500')}>
                <div className='container mx-auto px-0 pt-[120px] md:pt-[200px] col-span-1 lg:col-span-4 lg:col-start-2 '>
                    <div className='landing-title row-span-2 col-span-1 lg:col-span-6 lg:col-start-1  rounded-lg mx-3'>
                    <FeaturedPosts/>

                    </div>

                </div>

            </div>

        
            
            

            


{/**End of region */}
        
        </>
    );
}

export default SecondSlider;