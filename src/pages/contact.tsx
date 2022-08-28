import * as React from 'react';

import { Contact } from '@/components/contact/Contact';
import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import { PageHeading } from '@/components/layout/PageHeading';
import Seo from '@/components/Seo';

export default function ContactPage() {
  return (
    <Layout>

      <Seo templateTitle='Contact Us' />

      <main>
        <section className='bg-black'>
        <PageHeading>Contact Us</PageHeading>
          <Container>
            <Contact />
          </Container>
        </section>
      </main>
    </Layout>
  );
}