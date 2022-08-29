import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Template from '@/components/layout/Template';
import Seo from '@/components/Seo';

export default function PrivacyPage() {
  return (
    <>
      <Layout>
        <Seo 
          templateTitle='Terms & Conditions'
          description=''
          
          />
        
        <Template/>

      </Layout>
    </>
  )

}