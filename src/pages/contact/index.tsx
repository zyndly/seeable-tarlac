import * as React from 'react';

import { Contact } from '@/components/contact/Contact';
import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import { PageHeading } from '@/components/text/PageHeading';

export default function ContactPage() {
  return (
    <Layout>

      <Seo templateTitle='Contact Us' />

      <main>
        <section className='bg-[#F2F5EB]'>
        <PageHeading>We&apos;d love to hear from you </PageHeading>
          <Container>
            <Contact />
          </Container>
        </section>
      </main>
    </Layout>
  );
}