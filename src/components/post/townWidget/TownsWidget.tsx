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
      <div ref={scrollRef} className="col-span-1 lg:col-span-3 flex flex-wrap flex-row justify-center items-start ">
        {towns.map((towns) => (
          <Tooltip interactive={false} key={towns.href} content={towns.tooltip}>
            <Link href={towns.href} key={towns.href}>

                <div className='cursor-pointer bg-cover w-[180px] h-[300px] bg-dark rounded-lg m-5 overflow-hidden hover:animate-pulse'
                    style={{
                        backgroundImage: `url(${towns.background})`,
                        backgroundPosition: 'center',
                    }}
                >

                    <div className='w-full h-full bg-gradient-to-b from-black/[0.6] to-black/[0.4] flex justify-center items-center '>
                        <span className="cursor-pointer absolute px-3 py-1 mx-2 text-white font-bold font-staatliches text-sm  rounded-full text-md border-white">
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
    background:'https://i0.wp.com/peoplaid.com/wp-content/uploads/2021/06/Anao-Municipal-Hall.jpg?fit=619%2C462&ssl=1',
    tooltip: (
      <>
        <Accent className='font-medium'>See visit Anao, Tarlac</Accent>
      </>
    ),
  },

  {
    title: 'Bamban',
    href: '/tarlac/bamban',
    background:'data:image/jpeg;base64,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',
    tooltip: (
      <>
        <Accent className='font-medium'>See the beauty of Bamban, Tarlac</Accent>
      </>
    ),
  },

  {
    title: 'Camiling',
    href: '/tarlac/camiling',
    background:'https://live.staticflickr.com/5447/9520579999_0bdcdf483d_b.jpg',
    tooltip: (
      <>
        <Accent className='font-medium'>Visit Camiling, Tarlac</Accent>
      </>
    ),
  },

  {
    title: 'Capas',
    href: '/tarlac/capas',
    background:'https://lessandra.com.ph/assets/BlogImages/hotspots-tourism-capas/capas-death-march-monument-at-macarthur-highway-in-capas-tarlac-near-affordable-house-and-lot-for-sale-in-capas-tarlac-at-camella-lessandra-capas.jpg',
    tooltip: (
      <>
        <Accent className='font-medium'>See the historic town of Capas, Tarlac</Accent>
      </>
    ),
  },

  {
    title: 'Concepcion',
    href: '/tarlac/concepcion',
    background:'https://i0.wp.com/peoplaid.com/wp-content/uploads/2021/06/Concepcion-Municipal-Hall.jpg?fit=614%2C464&ssl=1',
    tooltip: (
      <>
        <Accent className='font-medium'>Vist Concepcion, Tarlac</Accent>
      </>
    ),
  },

  {
    title: 'Gerona',
    href: '/tarlac/gerona',
    background:'https://geronatarlac.gov.ph/wp-content/uploads/2020/12/37023034_194427647906650_2722850536557641728_o-1024x768.jpg',
    tooltip: (
      <>
        <Accent className='font-medium'>See the beauty of Gerona, Tarlac</Accent>
      </>
    ),
  },

  {
    title: 'La Paz',
    href: '/tarlac/lapaz',
    background:'https://live.staticflickr.com/8505/8413509984_b193cc981d_b.jpg',
    tooltip: (
      <>
        <Accent className='font-medium'>Visit La Paz, Tarlac</Accent>
      </>
    ),
  },

  {
    title: 'Mayantoc',
    href: '/tarlac/mayantoc',
    background:'https://4.bp.blogspot.com/-fWbOpZ5QEEA/WdTi-XDPmtI/AAAAAAAAByg/WTISTCUWy-4vjguoBWdMH0gPRJH62PI7QCLcBGAs/s1600/Kalaw-Falls-Tarlac.jpg',
    tooltip: (
      <>
        <Accent className='font-medium'>See the beauty of Mayantoc, Tarlac</Accent>
      </>
    ),
  },

  {
    title: 'Moncada',
    href: '/tarlac/moncada',
    background:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/FvfMoncadaTarlac1208_14.JPG/1200px-FvfMoncadaTarlac1208_14.JPG',
    tooltip: (
      <>
        <Accent className='font-medium'>Visit the town of Moncada, Tarlac</Accent>
      </>
    ),
  },

  {
    title: 'Paniqui',
    href: '/tarlac/paniqui',
    background:'https://iorbitnews.com/wp-content/uploads/2018/03/IMG_9231.png',
    tooltip: (
      <>
        <Accent className='font-medium'>Visit the town of Paniqui, Tarlac</Accent>
      </>
    ),
  },

  {
    title: 'Pura',
    href: '/tarlac/pura',
    background:'https://iorbitnews.com/wp-content/uploads/2018/03/FLOAT.png',
    tooltip: (
      <>
        <Accent className='font-medium'>Visit Pura, Tarlac</Accent>
      </>
    ),
  },

  {
    title: 'Ramos',
    href: '/tarlac/ramos',
    background:'https://fastly.4sqi.net/img/general/600x600/26951461_gU0SFkjwm2IXVRCTdXFLEMdYBZmveyTdoy7Zyb8kejE.jpg',
    tooltip: (
      <>
        <Accent className='font-medium'>Visit Ramos, Tarlac</Accent>
      </>
    ),
  },

  {
    title: 'San Clemente',
    href: '/tarlac/san-clemente',
    background:'https://sanclementetarlac.gov.ph/wp-content/uploads/2022/04/timangguyob-falls-9-2.jpg',
    tooltip: (
      <>
        <Accent className='font-medium'>Visit San Clemente, Tarlac</Accent>
      </>
    ),
  },

  {
    title: 'San Jose',
    href: '/tarlac/san-jose',
    background:'https://thetravelad.files.wordpress.com/2016/08/img_2795.png',
    tooltip: (
      <>
        <Accent className='font-medium'>See the beauty of San Jose, Tarlac</Accent>
      </>
    ),
  },

  {
    title: 'San Manuel',
    href: '/tarlac/san-manuel',
    background:'http://media.tumblr.com/d0c4dd222acb983057002e8cd721ac8e/tumblr_inline_mk74qwTDrv1qz4rgp.jpg',
    tooltip: (
      <>
        <Accent className='font-medium'>Visit San Manuel, Tarlac</Accent>
      </>
    ),
  },

  {
    title: 'Sta. Ignacia',
    href: '/tarlac/sta-ignacia',
    background:'https://www.santaignaciatarlac.gov.ph/wp-content/uploads/photo-gallery/2019/Sta._Ignacia_Tarlac_Belenismo_2019/thumb/76227141_2467567070151976_1294972630184493056_n.jpg?bwg=1574125780',
    tooltip: (
      <>
        <Accent className='font-medium'>Visit Sta. Ignacia, Tarlac</Accent>
      </>
    ),
  },

  {
    title: 'Tarlac City',
    href: '/tarlac/tarlac',
    background:'https://live.staticflickr.com/8446/7998699296_1202bdd112_b.jpg',
    tooltip: (
      <>
        <Accent className='font-medium'>See the City of Tarlac</Accent>
      </>
    ),
  },

  {
    title: 'Victoria',
    href: '/tarlac/victoria',
    background:'https://1.bp.blogspot.com/-ugVUgYLLV6s/WFTV9kVVRcI/AAAAAAAAB8g/PTiWoYykrVc5K9v9OBpQyb3hOoVuCI2JgCLcB/s1600/Victoria%2BTarlac.jpg',
    tooltip: (
      <>
        <Accent className='font-medium'>Visit the Historic Municipality of Victoria, Tarlac</Accent>
      </>
    ),
  },



];