/* eslint-disable @next/next/no-img-element */
import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import * as React from 'react';
import { HiOutlineMenu, HiOutlineX , HiSearch } from 'react-icons/hi';

import Accent from '@/components/Accent';
import UnstyledLink from '@/components/links/UnstyledLink';
import Tooltip from '@/components/Tooltip';

const navItems = [
  { name: 'Seeable', href: '/' },
  { name: 'Destinations', href: '/destinations' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Work with Us', href: '/contribute'},
];

type NavProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};


const MobileNav = ({ open, setOpen }: NavProps) => {

  return (
    <>
    
    <Transition.Root show={open} as={React.Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-40 flex lg:hidden'
        onClose={setOpen}
      >
        <Transition.Child
          as={React.Fragment}
          enter='transition-opacity ease-linear duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='transition-opacity ease-linear duration-300'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <Transition.Child
          as={React.Fragment}
          enter='transition ease-in-out duration-300 transform'
          enterFrom='-translate-x-full'
          enterTo='translate-x-0'
          leave='transition ease-in-out duration-300 transform'
          leaveFrom='translate-x-0'
          leaveTo='-translate-x-full'
        >
          
          <div className='relative flex flex-col w-full max-w-xs bg-black bg-opacity-90 pb-12 overflow-y-autoshadow-xl'>
          <div className='h-2 bg-gradient-to-tr from-primary-200 via-primary-300 to-primary-400' />
          
            <div className='flex px-4 pt-5 pb-2 bg-black'>
              
              <button
                type='button'
                className='inline-flex items-center justify-center p-2 -m-2 text-white rounded-md'
                onClick={() => setOpen(false)}
              >
                <span className='sr-only'>Close menu</span>
                <HiOutlineX className='w-6 h-6' aria-hidden='true' />
              </button>

              {/* Logo */}
            <div className='grind justify-items-end pl-20 ml-4 lg:ml-0'>
                <UnstyledLink href='/'>
                  <span className='sr-only'>SEEABLETarlac</span>
                  <img
                    className='w-auto h-12'
                    src='/images/Seeable-logo.png'
                    alt=''
                  />
                  
                </UnstyledLink>
            </div>
            </div>
            

            {/* Links */}
            <div className='px-4 py-6 space-y-6 border-t border-gray-200'>
              {navItems.map((item) => (
                <div key={item.name} className='flow-root'>
                  <UnstyledLink
                    href={item.href}
                    className='block p-2 -m-2 font-medium text-white hover:text-primary-300'
                  >
                    {item.name}
                  </UnstyledLink>
                </div>
              ))}

              {searchIcon.map((button) => (
                <Tooltip interactive={false} key={button.href} content={button.text}>
                  <UnstyledLink
                    className={clsx( 
                      'rounded-sm py-2 transition-colors',
                      'font-medium text-black dark:text-white',
                      'group dark:hover:text-primary-300',
                      'focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
                    )}
                    href={button.href}
                  >
                    <button.icon className='mt-6 h-6 w-6 text-gray-600 transition-colors hover:text-primary-300 dark:text-gray-300 dark:hover:text-primary-300' />
                  </UnstyledLink>
                </Tooltip>
              ))}      
            </div>

          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
    </>
    
  );
};

const DesktopNav = ({ setOpen }: NavProps) => {

   //#region  //*=========== Route Functionality ===========
   const router = useRouter();
   /** Ex: /projects/petrolida-2021 -> ['', 'projects', 'petrolida-2021'] */
   const arrOfRoute = router.route.split('/');
   const baseRoute = '/' + arrOfRoute[1];
   //#endregion  //*======== Route Functionality ===========
 
   //#region  //*=========== Scroll Shadow ===========
   const [onTop, setOnTop] = React.useState<boolean>(true);
   React.useEffect(() => {
     const handleScroll = () => {
       setOnTop(window.pageYOffset === 0);
     };
     window.addEventListener('scroll', handleScroll);
     return () => {
       window.removeEventListener('scroll', handleScroll);
     };
   }, []);
   //#endregion  //*======== Scroll Shadow ===========

  return (
    <header
    className={clsx(
      'sticky top-0 z-50 transition-shadow',
      !onTop && 'shadow-sm'
    )}
  >
    {/* Skip Navigation */}
    <a
      href='#skip-nav'
      className={clsx(
        'rounded-sm p-2 transition',
        'font-medium text-black dark:text-white',
        'bg-white dark:black',
        'group dark:hover:text-primary-300',
        'focus:outline-none focus:ring focus:ring-primary-300',
        'absolute top-4 left-4',
        '-translate-y-16 focus:translate-y-0'
      )}
    >
      <Accent>Skip to main content</Accent>
    </a>
    
    <div className='h-2 bg-gradient-to-tr from-primary-200 via-primary-300 to-primary-400' />

    <div className='bg-black text-white'>
      <nav
        aria-label='Top'
        className={clsx(
          'layout flex lg:flex-col lg:items-center py-4',
          'lg:max-w-[68rem]',
        )}
      >
        
        <div className='flex'>
          
          <button
            type='button'
            className='flex space-x-4 p-2 text-white bg-black rounded-md lg:hidden'
            onClick={() => setOpen(true)}
          >
            <span className='sr-only'>Open menu</span>
            <HiOutlineMenu className='w-6 h-6' aria-hidden='true' />
            <span className='text-primary-300 decoration-8'> Seeable </span>
                     
          </button>

          {/* Flyout menus */}
          <div className='hidden lg:ml-8 lg:block lg:self-stretch lg:'>
            <div className='flex h-full space-x-8'>
              {navItems.map((item) => (
                <UnstyledLink
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    'rounded-sm py-2 transition-colors',
                    'font-medium text-black dark:text-white',
                    'group dark:hover:text-primary-300',
                    'focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
                  )}
                >
                  <span
                    className={clsx(
                      'transition-colors',
                      'bg-primary-300/0 group-hover:bg-primary-300/20 dark:group-hover:bg-primary-300/0',
                      item.href === baseRoute &&
                        '!bg-primary-300/50 dark:bg-gradient-to-tr dark:from-primary-300 dark:to-primary-400 dark:bg-clip-text dark:text-transparent'
                    )}
                  >
                    {item.name}
                  </span>
                </UnstyledLink>
              ))}

              {searchIcon.map((button) => (
              <Tooltip interactive={false} key={button.href} content={button.text}>
                <UnstyledLink
                  className={clsx( 
                    'rounded-sm py-2 transition-colors',
                    'font-medium text-black dark:text-white',
                    'group dark:hover:text-primary-300',
                    'focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
                  )}
                  href={button.href}
                >
                  <button.icon className='mt-2 h-6 w-6 text-gray-600 transition-colors hover:text-primary-300 dark:text-gray-300 dark:hover:text-primary-300' />
                </UnstyledLink>
            </Tooltip>
           ))}      
            </div>
            
          </div>
        </div>
      </nav>
    </div>
    </header>
  );
};

const searchIcon = [
  {
    href: '/search',
    icon: HiSearch,
    id: 'HiSearch',
    text: (
      <>
        Look for a destination
      </>
    ),
  },
]

const Nav = {
  Desktop: DesktopNav,
  Mobile: MobileNav,
};

export default Nav;

