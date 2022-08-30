import { PropsWithChildren } from 'react';


export const Title = ({ children }: PropsWithChildren) => {
  return (
    
      <h1 className='text-primary-600 mt-8 mb-8 text-center'>
        {children}
      </h1>
    
  );
};
