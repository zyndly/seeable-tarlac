import React, {useState, useEffect, useContext} from 'react';
import Link from 'next/link';
import { getCategories } from '../services';
import { StateContext } from '../pages/_app';


export type Category = {
    name?: string,
    slug?: string
}
interface CategoriesProps {
    
}

const Categories  = (props: CategoriesProps): JSX.Element => {

    const { categories } = useContext(StateContext);

    return (
        <div className='p-8 mb-8 text-lime-500'>

            <h3 className='text-xl mb-8 border-b pb-4'>
                Popular Tags
            </h3>

            {categories.map((category:Category) => (
                <div key={category.name} className='flex flex-row items-center w-full lg:py-2 py-1' > 


                    <Link className='txt-md' href={`/tags/${category.slug}`}>

                        <span className='cursor-pointer px-3 py-1 mx-2 bg-black hover:bg-lime-800 text-white rounded-full text-sm'>
                            {`#${category.name}`}
                        </span>
                        
                    </Link>
                    

                </div>
            ))}
        
        </div>
    );
}

export default Categories; 