import { PropsWithChildren } from 'react';

import { HeadingContainer  }  from '@/components/layout/HeadingContainer';

export const PageHeading = ({ children }: PropsWithChildren) => {
  return (
    <HeadingContainer>
      <h1 className='text-3xl md:text-6xl mt-4 pt-4 font-bold flex text-center md:text-left'>
        {children}
      </h1>
    </HeadingContainer>
  );
};
