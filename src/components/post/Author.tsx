import React from 'react';
import Image from 'next/image'; //image component that supports static site generation

interface AuthorProps {
    author: any
}

const Author = ({author} : AuthorProps) : JSX.Element => {

    return (
        <div className='text-center mt-20 mx-4 md:mx-0 mb-8 p-12 relative rounded-lg bg-black bg-opacity-30'>

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

            <h3 className='text-lime-600 my-4 text-xl font-bold '>
                {author.name}
            </h3>

            <p className='text-white text-lg'>
                {author.bio}
            </p>
            
        </div>
    );
}

export default Author;