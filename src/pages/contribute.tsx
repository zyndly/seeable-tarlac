import * as React from 'react';

import { Contribute } from '@/components/contribute/Contribute';
import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import { PageHeading } from '@/components/text/PageHeading';

export default function ContactPage() {
  return (
    <Layout>

      <Seo templateTitle='Work with Us' />

      <main>
        <section className='bg-black'>
        <PageHeading>Work with Us</PageHeading>
          <Container>
            <Contribute />
          </Container>
        </section>
      </main>
    </Layout>
  );
}