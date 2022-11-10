import { PropsWithChildren } from 'react';
import React from 'react';

export const HeadingContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className="layout relative flex flex-col items-center w-full max-w-full h-[240px] pb-12 overflow-y-autoshadow-xl bg-[url('/images/TourGuides.png')]">
      <div className='mt-6'>
        {children}
      </div>
    </div>
  );
};