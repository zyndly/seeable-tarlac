import * as React from 'react';

import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import { PageHeading } from '@/components/text/PageHeading';
import { SubTitle } from '@/components/text/SubTitle';


export default function PrivacyPage() {
  return (
    <>
      <Layout>
        
        <Seo 
          templateTitle='Privacy Policy'
          description=''
          
          />
        <PageHeading>PRIVACY POLICY </PageHeading>
        <Container>
          <div className='text-black'>
            <div>
              <p className='mb-2'>Seeable Tarlac website is owned by Seeable Tarlac, which is the data controller of your personal data.</p>
              <p className='mb-2'>Seeable Tarlac has adopted this Privacy Policy, which determines how we are processing the information collected by Seeable Tarlac and also provides the reasons why we must collect certain personal data about you. Therefore, you must read this Privacy Policy before using the Seeable Tarlac website.</p>
              <p>We take care of your personal data and undertake to guarantee its confidentiality and security.</p>
            </div>

            <SubTitle>Personal information we collect:</SubTitle>
            <p>When you visit Seeable Tarlac, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the installed cookies on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products you view, what websites or search terms referred you to the Site, and how you interact with the Site. We refer to this automatically-collected information as “Device Information.” Moreover, we might collect the personal data you provide to us (including but not limited to Name, Surname, Address, payment information, etc.) during registration to be able to fulfill the agreement.</p>
            
            <SubTitle>Why do we process your data?</SubTitle>
            <p>Our top priority is customer data security, and, as such, we may process only minimal user data, only as much as it is absolutely necessary to maintain the website. Information collected automatically is used only to identify potential cases of abuse and establish statistical information regarding website usage. This statistical information is not otherwise aggregated in such a way that it would identify any particular user of the system.</p>
            <p>You can visit the website without telling us who you are or revealing any information by which someone could identify you as a specific, identifiable individual. If, however, you wish to use some of the website’s features, or you wish to receive our newsletter or provide other details by filling in a form, you may provide personal data to us, such as your email, first name, last name, city of residence, organization, and telephone number. You can choose not to provide us with your personal data, but then you may not be able to take advantage of some of the website’s features. For example, you won’t be able to receive our newsletter or contact us directly from the website. Users who are uncertain about what information is mandatory are welcome to contact us via seeabletarlac@gmail.com.</p>
            
            <SubTitle>Your rights:</SubTitle>
            <p className='mb-2'>If you are a European resident, you have the following rights related to your personal data:</p>
            
            <ul className='list-disc ml-6'>
              <li className='hover:underline hover:text-lime-600 hover:cursor-pointer'>The right to be informed.</li>
              <li className='hover:underline hover:text-lime-600 hover:cursor-pointer'>The right of access.</li>
              <li className='hover:underline hover:text-lime-600 hover:cursor-pointer'>The right to rectification.</li>
              <li className='hover:underline hover:text-lime-600 hover:cursor-pointer'>The right to erasure.</li>
              <li className='hover:underline hover:text-lime-600 hover:cursor-pointer'>The right to restrict processing.</li>
              <li className='hover:underline hover:text-lime-600 hover:cursor-pointer'>The right to data portability.</li>
              <li className='hover:underline hover:text-lime-600 hover:cursor-pointer'>The right to object.</li>
              <li className='hover:underline hover:text-lime-600 hover:cursor-pointer'>Rights in relation to automated decision-making and profiling.</li>
            </ul>

            <p className='my-2'>If you would like to exercise this right, please contact us through the contact information below.</p>
            <p>Additionally, if you are a European resident, we note that we are processing your information in order to fulfill contracts we might have with you (for example, if you make an order through the Site), or otherwise to pursue our legitimate business interests listed above. Additionally, please note that your information might be transferred outside of Europe, including Canada and the United States.</p>

            <SubTitle>Links to other websites:</SubTitle>
            <p>Our website may contain links to other websites that are not owned or controlled by us. Please be aware that we are not responsible for such other websites or third parties&apos; privacy practices. We encourage you to be aware when you leave our website and read the privacy statements of each website that may collect personal information.</p>

            <SubTitle>Information security:</SubTitle>
            <p>We secure information you provide on computer servers in a controlled, secure environment, protected from unauthorized access, use, or disclosure. We keep reasonable administrative, technical, and physical safeguards to protect against unauthorized access, use, modification, and personal data disclosure in its control and custody. However, no data transmission over the Internet or wireless network can be guaranteed.</p>

            <SubTitle>Legal disclosure:</SubTitle>
            <p>We will disclose any information we collect, use, or receive if required or permitted by law, such as to comply with a subpoena or similar legal process, or when we believe in good faith that disclosure is necessary to protect our rights, protect your safety or the safety of others, investigate fraud, or respond to a government request.</p>

            <SubTitle>Contact information:</SubTitle>
            <p>If you would like to contact us to understand more about this policy or wish to contact us concerning any matter relating to individual rights and your Personal Information, you may send an email to 
              <span className='text-lime-600'> seeabletarlac@gmail.com</span>  or visit our contact page at  
              <a className='hover:text-lime-600' target="_blank" rel="noreferrer noopener external nofollow" href="http://seeabletarlac.vercel.app/contact">http://seeabletarlac.vercel.app/contact</a></p>


          </div>
        </Container>
        
      </Layout>
    </>
  )

}