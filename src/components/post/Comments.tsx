
import parse from 'html-react-parser'; 
import moment from 'moment';
import * as React from 'react';

import { getComments } from '@/services';

interface CommentsProps {
    slug: string
}

const Comments = ( {slug}: CommentsProps) : JSX.Element => {

    const [comments, setComments] = React.useState([]);

    React.useEffect(()=>{
        /* eslint-disable @typescript-eslint/no-explicit-any */
        getComments(slug).then((result: any)=>{
            setComments(result);

            // eslint-disable-next-line no-console
            console.log("comments: ", result);
        });

    }, [slug]);

    return (
        <>
            {comments.length > 0 && (
                <div className='bg-[#161719] text-lime-600 md:rounded-lg p-8 pb-12 mb-8'>
                    <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
                        {comments.length}
                        {' '}
                        Comments
                    </h3>

                    {comments.map((comment: any)=> (
                        <div key={comment.createdAt} className='border-b border-gray-100 mb-4 pb-4'>
                            
                            <p className='mb-4'>
                                <span className='font-semibold'>
                                    {comment.name}
                                </span>

                                {' on '}
                                { moment(comment.createdAt).format('MMM DD, YYYY')}
                            </p>
                            
                            <p className='whitespace-pre-line text-white/[0.6] w-full'>
                                {parse(comment.comment)}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default Comments;