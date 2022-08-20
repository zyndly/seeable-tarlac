import React, { ReactNode } from 'react';
import moment from 'moment';
import { FiCalendar } from 'react-icons/fi'; 
import Link from 'next/link';
import { RichText } from '@graphcms/rich-text-react-renderer';
import { getPostDetails } from '../services/index';

interface PostDetailProps {
    post: {}| any
}

const PostDetail = ({ post } : PostDetailProps) : JSX.Element => {


    return (
        <div className='bg-[#161719] md:rounded-lg lg:p-0 pb-12 mb-8 mt-[150px] text-white/[0.8]'>

            <div className='relative overflow-hidden shadow-d shadow-lg'>

                <img 
                
                    src={post.featuredImage.url}
                    alt={post.title}
                    className='object-top h-full w-full md:rounded-t-lg'
                />
            </div>

            <div className='flex flex-col items:center p-4 lg:p-8'>

                <div className=' self-center flex flex-row flex-wrap w-[80%] h-auto pb-5 mb-5 items-center justify-center border-b-[1px] border-white/[0.3]'>

                    {post.categories.map((category:any)=>(

                        <Link href={`/tags/${category.slug}`} key={category.slug}>
                            <span className="relative cursor-pointer absolute px-3 py-1 mx-2 bg-slate-800 hover:bg-slate-700 text-white rounded-full text-sm">
                                {`#${category.name}`}
                            </span>
                        </Link>
                    ))}

                </div>

                <div className='flex items-center mb-8 w-full'>

                    <div className='flex items-center mb-4 lg:mb-0 w-full lg:w-auto mr-8'>

                        <img 
                            alt={post.author.name}
                            height="30px"
                            width="30px"
                            className='align-middle rounded-full'
                            src={post.author.photo.url}
                        />

                        <p className='inline align-middle text-white/[0.6] ml-3 text-lg'>
                            {post.author.name}
                        </p>

                    </div>

                    <div className='font-medium text-white/[0.6] flex flex-row align-center justify-center m-5'>
                        <FiCalendar className='mt-[3px] mr-3' />
                        <span className=''>
                            {moment(post.createdAt).format('MMM DD, YYYY')}
                        </span>
                    </div>

                </div>

                <h1 className='mb-8 text-3xl font-bold text-lime-600'> {post.title}</h1>

                <RichText
                    content={post.content.raw}
                    renderers={{
                    h1: ({ children }) => <h1 className="text-black">{children}</h1>,
                    h2: ({ children }) => <h2 className='text-black'>{children}</h2>,
                    h3: ({ children }) => <h3 className='text-black'>{children}</h3>,
                    a: ({ children, href, openInNewTab }) => (
                        <a
                          href={href}
                          target={openInNewTab ? '_blank' : '_self'}
                          style={{ color: 'green' }}
                          rel="noreferrer"
                        >
                          {children}
                        </a>
                      ),
                    Asset: {
                        text: () => (
                            <div>
                            <p>text plain</p>
                            </div>
                        ),
                    },
                    bold: ({ children }) => <strong>{children}</strong>,
                    }}
                />

            </div>

        </div>
    );
}

export default PostDetail;