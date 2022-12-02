import { PropsWithChildren } from 'react';


export const TextContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 min-h-[100vh] min-w-[100vw]">
        {children}
    </div>
  );
};
