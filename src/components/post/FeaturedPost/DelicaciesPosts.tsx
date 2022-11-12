import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';

import 'react-multi-carousel/lib/styles.css';

import { getDelicaciesPosts } from '@/services';

import { DelicaciesPostCard } from './index';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 768, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
}

const DelicaciesPosts = () => {
  const [featuredPost, setFeaturedPosts] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    getDelicaciesPosts().then((result) => {
      setFeaturedPosts(result)
      setDataLoaded(true)
    })
  }, [])

  const customLeftArrow = (
    <div className="arrow-btn absolute left-0 cursor-pointer rounded-full bg-primary-300 py-3 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-full text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
    </div>
  )

  const customRightArrow = (
    <div className="arrow-btn absolute right-0 cursor-pointer rounded-full bg-lime-600 py-3 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-full text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        />
      </svg>
    </div>
  )

  return (
    <div className="mb-8">
      <Carousel
        infinite
        customLeftArrow={customLeftArrow}
        customRightArrow={customRightArrow}
        responsive={responsive}
        itemClass="px-4"
      >
        {dataLoaded &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          featuredPost.map((post: any) => (
            <DelicaciesPostCard key={post.slug} post={post} />
          ))}
      </Carousel>
    </div>
  )
}

export default DelicaciesPosts