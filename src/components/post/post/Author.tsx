import Image from 'next/image';
import * as React from 'react';

interface AuthorProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    author: any
}

const Author = ({author} : AuthorProps) : JSX.Element => {

    return (
        <div className=' text-center mt-20 mx-4 md:mx-0 mb-8 p-12 relative rounded-lg bg-[#E2EBCC] bg-opacity-80'>

            <div className='absolute left-0 right-0 -top-14'>

                <Image 
                    alt={author.name}
                    unoptimized
                    height='100px'
                    width='100px'
                    className='align-middle rounded-full'
                    src={author.photo.url}
                />

            </div>

            <h3 className='text-black my-4 text-xl font-bold '>
                {author.name}
            </h3>

            <p className='text-black text-lg'>
                {author.bio}
            </p>
            
        </div>
    );
}

export default Author;