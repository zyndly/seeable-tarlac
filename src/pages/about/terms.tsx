import * as React from 'react';

import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';
import { PageHeading } from '@/components/text/PageHeading';
import { SubTitle } from '@/components/text/SubTitle';
import Tooltip from '@/components/Tooltip';


export default function TermsPage() {
  return (
    <>
      <Layout>
        <Seo 
          templateTitle='Terms & Conditions'
          description=''
          
          />
        <PageHeading>Terms and Conditions</PageHeading>

        <Container>
          <div className='text-black'>
            <p>These terms and conditions (“Agreement”) set forth the general terms and conditions of your use of the <a target="_blank" rel="noreferrer noopener external nofollow" href="http://seeabletarlac.com">seeabletarlac.com</a> website (“Website” or “Service”) and any of its related products and services (collectively, “Services”). This Agreement is legally binding between you (“User”, “you” or “your”) and this Website operator (“Operator”, “we”, “us” or “our”). If you are entering into this agreement on behalf of a business or other legal entity, you represent that you have the authority to bind such entity to this agreement, in which case the terms “User”, “you” or “your” shall refer to such entity. If you do not have such authority, or if you do not agree with the terms of this agreement, you must not accept this agreement and may not access and use the Website and Services. By accessing and using the Website and Services, you acknowledge that you have read, understood, and agree to be bound by the terms of this Agreement. You acknowledge that this Agreement is a contract between you and the Operator, even though it is electronic and is not physically signed by you, and it governs your use of the Website and Services.</p>
            
            <div className="wpembed-index">
              <SubTitle>Table of contents</SubTitle>
              {termsLinks.map(({ href, text, tooltip }) => (
                <Tooltip interactive={false} key={href} content={tooltip}>
                  <UnstyledLink
                    className='block p-2 -m-2 hover:text-primary-800 rounded-sm text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
                    href={href}
                  >
                    {text}
                  </UnstyledLink>
                </Tooltip>
              ))}
            </div>
                    
            <div id="user-content">
            <SubTitle>User Content</SubTitle>
              <p>We do not own any data, information or material (collectively, “Content”) that you submit on the Website in the course of using the Service. You shall have sole responsibility for the accuracy, quality, integrity, legality, reliability, appropriateness, and intellectual property ownership or right to use of all submitted Content. We may monitor and review the Content on the Website submitted or created using our Services by you. You grant us permission to access, copy, distribute, store, transmit, reformat, display and perform the Content of your user account solely as required for the purpose of providing the Services to you. Without limiting any of those representations or warranties, we have the right, though not the obligation, to, in our own sole discretion, refuse or remove any Content that, in our reasonable opinion, violates any of our policies or is in any way harmful or objectionable. Unless specifically permitted by you, your use of the Website and Services does not grant us the license to use, reproduce, adapt, modify, publish or distribute the Content created by you or stored in your user account for commercial, marketing or any similar purpose.</p>
            </div>
            
            <div id="backups">
              <SubTitle>Backups</SubTitle>
              <p>We perform regular backups of the Website and its Content, however, these backups are for our own administrative purposes only and are in no way guaranteed. You are responsible for maintaining your own backups of your data. We do not provide any sort of compensation for lost or incomplete data in the event that backups do not function properly. We will do our best to ensure complete and accurate backups, but assume no responsibility for this duty.</p>
            </div>
            
            <div id="links-to-other-resources">
              <SubTitle>Links to other resources</SubTitle>
              <p>Although the Website and Services may link to other resources (such as websites, mobile applications, etc.), we are not, directly or indirectly, implying any approval, association, sponsorship, endorsement, or affiliation with any linked resource, unless specifically stated herein. Some of the links on the Website may be “affiliate links”. This means if you click on the link and purchase an item, the Operator will receive an affiliate commission. We are not responsible for examining or evaluating, and we do not warrant the offerings of, any businesses or individuals or the content of their resources. We do not assume any responsibility or liability for the actions, products, services, and content of any other third parties. You should carefully review the legal statements and other conditions of use of any resource which you access through a link on the Website. Your linking to any other off-site resources is at your own risk.</p>
            </div>
            
            
            <div id="prohibited-uses">
              <SubTitle>Prohibited uses</SubTitle>
              <p>In addition to other terms as set forth in the Agreement, you are prohibited from using the Website and Services or Content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Website and Services, third party products and services, or the Internet; (h) to spam, phish, pharm, pretext, spider, crawl, or scrape; (i) for any obscene or immoral purpose; or (j) to interfere with or circumvent the security features of the Website and Services, third party products and services, or the Internet. We reserve the right to terminate your use of the Website and Services for violating any of the prohibited uses.</p>
            </div>
            
            
            <div id="intellectual-property-rights">
              <SubTitle>Intellectual property rights</SubTitle>
              <p>“Intellectual Property Rights” means all present and future rights conferred by statute, common law or equity in or in relation to any copyright and related rights, trademarks, designs, patents, inventions, goodwill and the right to sue for passing off, rights to inventions, rights to use, and all other intellectual property rights, in each case whether registered or unregistered and including all applications and rights to apply for and be granted, rights to claim priority from, such rights and all similar or equivalent rights or forms of protection and any other results of intellectual activity which subsist or will subsist now or in the future in any part of the world. This Agreement does not transfer to you any intellectual property owned by the Operator or third parties, and all rights, titles, and interests in and to such property will remain (as between the parties) solely with the Operator. All trademarks, service marks, graphics and logos used in connection with the Website and Services, are trademarks or registered trademarks of the Operator or its licensors. Other trademarks, service marks, graphics and logos used in connection with the Website and Services may be the trademarks of other third parties. Your use of the Website and Services grants you no right or license to reproduce or otherwise use any of the Operator or third party trademarks.</p>
            </div>
            
            <div id="limitation-of-liability">
              <SubTitle>Limitation of liability</SubTitle>
              <p>To the fullest extent permitted by applicable law, in no event will the Operator, its affiliates, directors, officers, employees, agents, suppliers or licensors be liable to any person for any indirect, incidental, special, punitive, cover or consequential damages (including, without limitation, damages for lost profits, revenue, sales, goodwill, use of content, impact on business, business interruption, loss of anticipated savings, loss of business opportunity) however caused, under any theory of liability, including, without limitation, contract, tort, warranty, breach of statutory duty, negligence or otherwise, even if the liable party has been advised as to the possibility of such damages or could have foreseen such damages. To the maximum extent permitted by applicable law, the aggregate liability of the Operator and its affiliates, officers, employees, agents, suppliers and licensors relating to the services will be limited to an amount no greater than one dollar or any amounts actually paid in cash by you to the Operator for the prior one month period prior to the first event or occurrence giving rise to such liability. The limitations and exclusions also apply if this remedy does not fully compensate you for any losses or fails of its essential purpose.</p>
            </div>
            
            <div id="indemnification">
              <SubTitle>Indemnification</SubTitle>
              <p>You agree to indemnify and hold the Operator and its affiliates, directors, officers, employees, agents, suppliers and licensors harmless from and against any liabilities, losses, damages or costs, including reasonable attorneys’ fees, incurred in connection with or arising from any third party allegations, claims, actions, disputes, or demands asserted against any of them as a result of or relating to your Content, your use of the Website and Services or any willful misconduct on your part.</p>
            </div>
            
            <div id="severability">
              <SubTitle>Severability</SubTitle>
              <p>All rights and restrictions contained in this Agreement may be exercised and shall be applicable and binding only to the extent that they do not violate any applicable laws and are intended to be limited to the extent necessary so that they will not render this Agreement illegal, invalid or unenforceable. If any provision or portion of any provision of this Agreement shall be held to be illegal, invalid or unenforceable by a court of competent jurisdiction, it is the intention of the parties that the remaining provisions or portions thereof shall constitute their agreement with respect to the subject matter hereof, and all such remaining provisions or portions thereof shall remain in full force and effect.</p> 
            </div>
            
            <div id="dispute-resolution">
              <SubTitle>Dispute resolution</SubTitle>
              <p>The formation, interpretation, and performance of this Agreement and any disputes arising out of it shall be governed by the substantive and procedural laws of Philippines without regard to its rules on conflicts or choice of law and, to the extent applicable, the laws of Philippines. The exclusive jurisdiction and venue for actions related to the subject matter hereof shall be the courts located in Philippines, and you hereby submit to the personal jurisdiction of such courts. You hereby waive any right to a jury trial in any proceeding arising out of or related to this Agreement. The United Nations Convention on Contracts for the International Sale of Goods does not apply to this Agreement.</p>
            </div>

            <div id="changes-and-amendments">
              <SubTitle>Changes and amendments</SubTitle>
              <p>We reserve the right to modify this Agreement or its terms related to the Website and Services at any time at our discretion. When we do, we will revise the updated date at the bottom of this page, send you an email to notify you. We may also provide notice to you in other ways at our discretion, such as through the contact information you have provided.</p>
              <p>An updated version of this Agreement will be effective immediately upon the posting of the revised Agreement unless otherwise specified. Your continued use of the Website and Services after the effective date of the revised Agreement (or such other act specified at that time) will constitute your consent to those changes.</p>
            </div>
            
            <div id="acceptance-of-these-terms">
              <SubTitle>Acceptance of these terms</SubTitle>
              <p>You acknowledge that you have read this Agreement and agree to all its terms and conditions. By accessing and using the Website and Services you agree to be bound by this Agreement. If you do not agree to abide by the terms of this Agreement, you are not authorized to access or use the Website and Services. </p>
            </div>
                  
            <div id="contacting-us">
              <SubTitle>Contacting us</SubTitle>
              <p className='mb-2'>If you have any questions, concerns, or complaints regarding this Agreement, we encourage you to contact us using the details below:</p>
              <p><a className='hover:text-lime-400' target="_blank" rel="noreferrer noopener external nofollow" href="seeabletarlac.vercel.app/contact">seeabletarlac.vercel.app/contact</a><br/><a href="&#109;&#097;&#105;&#108;&#116;&#111;&#058;se&#101;&#97;&#98;le&#116;&#97;rl&#97;&#99;&#64;gmai&#108;.&#99;&#111;m" target="_blank" rel="nofollow noreferrer">s&#101;ea&#98;&#108;&#101;&#116;a&#114;&#108;&#97;&#99;&#64;&#103;&#109;&#97;&#105;l.&#99;o&#109;</a></p>
              <p className='mt-20'>This document was last updated on August 29, 2022</p>
            </div>
          
          </div>
        </Container>
      </Layout>
    </>
  )

}

const termsLinks = [
  {
    href: '#user-content',
    text: 'User content',
    tooltip: 'View User content Terms',
  },
  
  {
    href: '#backups',
    text: 'Backups',
    tooltip: 'View Backups Terms',
  },

  {
    href: '#links-to-other-resources',
    text: 'Links to other resources',
    tooltip: ' View Links to other resources',
  },

  {
    href: '#prohibited-uses',
    text: 'Prohibited uses',
    tooltip: 'View Prohibited uses',
  },

  {
    href: '#intellectual-property-rights',
    text: 'Intellectual property rights',
    tooltip: 'View Intellectual property rights',
  },

  {
    href: '#limitation-of-liability',
    text: 'Limitation of liability',
    tooltip: 'View Limitation of liability',
  },

  {
    href: '#indemnification',
    text: 'Indemnification',
    tooltip: 'View Indemnification',
  },

  {
    href: '#severability',
    text: 'Severability',
    tooltip: 'View Severability',
  },

  {
    href: '#dispute-resolution',
    text: 'Dispute resolution',
    tooltip: 'View Dispute resolution',
  },

  {
    href: '#changes-and-amendments',
    text: 'Changes and amendments',
    tooltip: 'View Changes and amendments',
  },

  {
    href: '#acceptance-of-these-terms',
    text: 'Acceptance of these terms',
    tooltip: 'View Acceptance of these terms',
  },

  {
    href: '#contacting-us',
    text: 'Contacting us',
    tooltip: 'Got concerns? Contact us',
  },
]