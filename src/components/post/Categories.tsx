import Link from 'next/link';
import * as React from 'react';

import { StateContext } from '@/pages/_app';
// eslint-disable-next-line unused-imports/no-unused-imports
import { getCategories } from '@/services';


export type Category = {
    name?: string,
    slug?: string
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CategoriesProps {
    
}

// eslint-disable-next-line unused-imports/no-unused-vars
const Categories  = (props: CategoriesProps): JSX.Element => {

    const { categories } = React.useContext(StateContext);

    return (
        <div className='p-8 mb-8 text-primary-800'>

            <h3 className='text-xl mb-8 border-b pb-4'>
                Popular Tags
            </h3>

            {categories.map((category:Category) => (
                <div key={category.name} className='flex flex-row items-center w-full lg:py-2 py-1' > 


                    <Link className='txt-md hover:animate-shimmer' href={`/tags/${category.slug}`}>

                        <span className='cursor-pointer px-3 py-1 mx-2 bg-primary-900 hover:animate-shimmer text-white rounded-full text-sm'>
                            {`${category.name}`}
                        </span>
                        
                    </Link>
                    

                </div>
            ))}
        
        </div>
    );
}

export default Categories; 