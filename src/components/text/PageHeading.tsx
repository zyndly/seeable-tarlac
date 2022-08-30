import { PropsWithChildren } from 'react';

import { Container } from '@/components/layout/Container';

export const PageHeading = ({ children }: PropsWithChildren) => {
  return (
    <Container>
      <h1 className='text-3xl md:text-6xl font-bold text-center md:text-left text-primary-600'>
        {children}
      </h1>
    </Container>
  );
};
