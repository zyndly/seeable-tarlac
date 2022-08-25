
import * as React from 'react';
import { SiFacebook, SiGithub, SiInstagram, SiTwitter } from 'react-icons/si';

import Accent from '@/components/Accent';
import UnstyledLink from '@/components/links/UnstyledLink';
import Tooltip from '@/components/Tooltip';


export default function Footer() {
  return (
    <footer className='mt-4 pb-2'>
      <div className='layout flex flex-col items-center border-t pt-6'>
        <FooterLinks />

        <p className='mt-12 font-medium text-gray-600 dark:text-gray-300'>
          Reach us out
        </p>
        <SocialLinks />

        <p className='my-2 text-sm text-gray-600 dark:text-gray-300'>
          © SeeableTarlac {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

function FooterLinks() {
  return (
    <div className='flex flex-wrap justify-center gap-y-4 gap-x-8'>
      {footerLinks.map(({ href, text, tooltip }) => (
        <Tooltip interactive={false} key={href} content={tooltip}>
          <UnstyledLink
            className='animated-underline rounded-sm text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-primary-300 dark:text-gray-200'
            href={href}
          >
            {text}
          </UnstyledLink>
        </Tooltip>
      ))}
    </div>
  );
}

function SocialLinks() {
  return (
    <div className='mt-2 flex space-x-4'>
      {socials.map((social) => (
        <Tooltip interactive={false} key={social.href} content={social.text}>
          <UnstyledLink
            className='inline-flex items-center justify-center rounded-sm focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
            href={social.href}
          >
            <social.icon className='my-auto h-6 w-6 align-middle text-gray-600 transition-colors hover:text-primary-300 dark:text-gray-300 dark:hover:text-primary-300' />
          </UnstyledLink>
        </Tooltip>
      ))}
    </div>
  );
}

const footerLinks = [
  {
    href: 'https://github.com/zyndly/seeable-tarlac',
    text: 'Source Code',
    tooltip: (
      <>
        This website is <strong>open source</strong>!
      </>
    ),
  },
  {
    href: '/terms',
    text: 'Terms',
    tooltip: 'vacant',
  },
  {
    href: '/privacy',
    text: 'Privacy',
    tooltip: 'vacant',
  },
  {
    href: '/docs',
    text: 'Docs',
    tooltip: 'vacant',
  },
  {
    href: '/submit-post',
    text: 'Submit Post',
    tooltip: 'Submit a post to feature',
  },
  {
    href: '/FAQs',
    text: 'FAQs',
    tooltip: 'vacant',
  },
  {
    href: '/Contact',
    text: 'Contact Seeable',
    tooltip: 'vacant',
  },
  {
    href: '/RSS',
    text: 'RSS',
    tooltip: 'vacant',
  },
  {
    href: '/About',
    text: 'About Seeable',
    tooltip: 'Learn more about Seeable Tarlac',
  },
];

const socials = [
  {
    href: 'https://github.com/zyndly/seeable-tarlac/',
    icon: SiGithub,
    id: 'Github',
    text: (
      <>
        See our projects on <Accent className='font-medium'>Github</Accent>
      </>
    ),
  },
  {
    href: 'https://instagram.com/seeabletarlac',
    icon: SiInstagram,
    id: 'Instagram',
    text: (
      <>
        Follow us on <Accent className='font-medium'>Instagram</Accent>
      </>
    ),
  },
  {
    href: 'https://facebook.com/seeabletarlac',
    icon: SiFacebook,
    id: 'Facebook',
    text: (
      <>
        Find us on <Accent className='font-medium'>Facebook</Accent>
      </>
    ),
  },
  {
    href: 'https://twitter.com/seeabletarlac',
    icon: SiTwitter,
    id: 'Twitter',
    text: (
      <>
        We post updates, tips and insight. Follow me us{' '}
        <Accent className='font-medium'>Twitter</Accent>!
      </>
    ),
  },
];

