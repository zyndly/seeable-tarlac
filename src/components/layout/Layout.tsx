import * as React from 'react';

import Footer from '@/components/layout/Footer';
import Nav from '@/components/layout/Header';

import { PreloadProvider } from '@/context/PreloadContext';


export default function Layout({ children }: { children: React.ReactNode }) {
  
  const [open, setOpen] = React.useState(false);


  return (
    <>
      <Nav.Mobile open={open} setOpen={setOpen} />

      <header className='sticky top-0 z-10 bg-black'>
        <Nav.Desktop open={open} setOpen={setOpen} />
      </header>
      

        <PreloadProvider>
          <div id='skip-nav'>{children}</div>
        </PreloadProvider>
      <footer className='sticky z-10 bg-black'>
        <Footer />
      </footer>
      
    </>
  );
}