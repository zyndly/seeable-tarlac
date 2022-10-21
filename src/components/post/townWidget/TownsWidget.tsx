/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable unused-imports/no-unused-vars */
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useRef  } from 'react';

import Accent from '@/components/Accent';
import { Loader } from '@/components/post';
import Tooltip from '@/components/Tooltip';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TarlacTownsCard() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  if (router.isFallback) {
    return <Loader />;
  }


  return (
    <>
      <div ref={scrollRef} className="col-span-1 lg:col-span-3 flex flex-wrap flex-row justify-center items-start">
        {towns.map((towns) => (
          <Tooltip interactive={false} key={towns.href} content={towns.tooltip}>
            <Link href={towns.href} key={towns.href}>

                <div className='cursor-pointer bg-cover w-[180px] h-[300px] bg-dark rounded-lg m-5 overflow-hidden hover:animate-pulse'
                    style={{
                        backgroundImage: `url(${towns.background})`
                    }}
                >

                    <div className='w-full h-full bg-gradient-to-b from-black/[0.6] to-black/[0.4] flex justify-center items-center '>
                        <span className=" cursor-pointer absolute px-3 py-1 mx-2 text-white font-bold font-staatliches text-sm  rounded-full text-md border-white">
                            {`${towns.title}`}
                        </span>

                    </div>
                    
                </div>
                
            </Link>
          </Tooltip>
        ))}
      </div>
    </>
  )
}

const towns = [
  {
    title: 'Anao',
    href: '/tarlac/anao',
    background:'https://seeabletarlac.vercel.app/images/logo.png',
    tooltip: (
      <>
        <Accent className='font-medium'>See visti Anao, Tarlac</Accent>
      </>
    ),
  },

  {
    title: 'Bamban',
    href: '/tarlac/bamban',
    background:'https://seeabletarlac.vercel.app/images/logo.png',
    tooltip: (
      <>
        <Accent className='font-medium'>See the beauty of Bamban, Tarlac</Accent>
      </>
    ),
  },

  {
    title: 'Camiling',
    href: '/tarlac/camiling',
    background:'https://seeabletarlac.vercel.app/images/logo.png',
    tooltip: (
      <>
        <Accent className='font-medium'>Visit Camiling, Tarlac</Accent>
      </>
    ),
  },

  {
    title: 'Capas',
    href: '/tarlac/capas',
    background:'https://seeabletarlac.vercel.app/images/logo.png',
    tooltip: (
      <>
        <Accent className='font-medium'>See the historic town of Capas, Tarlac</Accent>
      </>
    ),
  },

  {
    title: 'Concepcion',
    href: '/tarlac/concepcion',
    background:'https://seeabletarlac.vercel.app/images/logo.png',
    tooltip: (
      <>
        <Accent className='font-medium'>Vist Concepcion, Tarlac</Accent>
      </>
    ),
  },

  {
    title: 'Gerona',
    href: '/tarlac/gerona',
    background:'https://seeabletarlac.vercel.app/images/logo.png',
    tooltip: (
      <>
        <Accent className='font-medium'>See the beauty of Gerona, Tarlac</Accent>
      </>
    ),
  },

  {
    title: 'La Paz',
    href: '/tarlac/lapaz',
    background:'https://seeabletarlac.vercel.app/images/logo.png',
    tooltip: (
      <>
        <Accent className='font-medium'>Visit La Paz, Tarlac</Accent>
      </>
    ),
  },

  {
    title: 'Mayantoc',
    href: '/tarlac/mayantoc',
    background:'https://seeabletarlac.vercel.app/images/logo.png',
    tooltip: (
      <>
        <Accent className='font-medium'>See the beauty of Mayantoc, Tarlac</Accent>
      </>
    ),
  },

  {
    title: 'Moncada',
    href: '/tarlac/moncada',
    background:'https://seeabletarlac.vercel.app/images/logo.png',
    tooltip: (
      <>
        <Accent className='font-medium'>Visit the town of Moncada, Tarlac</Accent>
      </>
    ),
  },

  {
    title: 'Paniqui',
    href: '/tarlac/paniqui',
    background:'https://seeabletarlac.vercel.app/images/logo.png',
    tooltip: (
      <>
        <Accent className='font-medium'>Visit the town of Paniqui, Tarlac</Accent>
      </>
    ),
  },

  {
    title: 'Pura',
    href: '/tarlac/pura',
    background:'https://seeabletarlac.vercel.app/images/logo.png',
    tooltip: (
      <>
        <Accent className='font-medium'>Visit Pura, Tarlac</Accent>
      </>
    ),
  },

  {
    title: 'Ramos',
    href: '/tarlac/ramos',
    background:'https://seeabletarlac.vercel.app/images/logo.png',
    tooltip: (
      <>
        <Accent className='font-medium'>Visit Ramos, Tarlac</Accent>
      </>
    ),
  },

  {
    title: 'San Clemente',
    href: '/tarlac/san-clemente',
    background:'https://seeabletarlac.vercel.app/images/logo.png',
    tooltip: (
      <>
        <Accent className='font-medium'>Visit San Clemente, Tarlac</Accent>
      </>
    ),
  },

  {
    title: 'San Jose',
    href: '/tarlac/san-jose',
    background:'https://seeabletarlac.vercel.app/images/logo.png',
    tooltip: (
      <>
        <Accent className='font-medium'>See the beauty of San Jose, Tarlac</Accent>
      </>
    ),
  },

  {
    title: 'San Manuel',
    href: '/tarlac/san-manuel',
    background:'https://seeabletarlac.vercel.app/images/logo.png',
    tooltip: (
      <>
        <Accent className='font-medium'>Visit San Manuel, Tarlac</Accent>
      </>
    ),
  },

  {
    title: 'Sta. Ignacia',
    href: '/tarlac/sta-ignacia',
    background:'https://seeabletarlac.vercel.app/images/logo.png',
    tooltip: (
      <>
        <Accent className='font-medium'>Visit Sta. Ignacia, Tarlac</Accent>
      </>
    ),
  },

  {
    title: 'Tarlac City',
    href: '/tarlac/tarlac',
    background:'https://seeabletarlac.vercel.app/images/logo.png',
    tooltip: (
      <>
        <Accent className='font-medium'>See the City of Tarlac</Accent>
      </>
    ),
  },

  {
    title: 'Victoria',
    href: '/tarlac/victoria',
    background:'https://seeabletarlac.vercel.app/images/logo.png',
    tooltip: (
      <>
        <Accent className='font-medium'>Visit Victoria, Tarlac</Accent>
      </>
    ),
  },



];