/* eslint-disable unused-imports/no-unused-vars */
import Link from 'next/link'
import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DelicaciesPostCard = ({ post, position }: any) => {
  return (
    <>
      <div className="relative h-72">
        <div
          className="absolute inline-block h-72 w-full rounded-lg bg-cover bg-center bg-no-repeat shadow-md"
          style={{ backgroundImage: `url('${post.featuredImage.url}')` }}
        />
        <div className="absolute h-72 w-full rounded-lg bg-gradient-to-b from-gray-400 via-gray-700 to-black bg-center opacity-50" />
        <div className="absolute flex h-full w-full flex-col items-center justify-center rounded-lg p-4">
          <p className="text-shadow mb-4 text-center text-2xl font-semibold text-primary-200">
            {post.title}
          </p>
        </div>
        <Link href={`/post/${post.slug}`}>
          <span className="absolute h-full w-full cursor-pointer" />
        </Link>
      </div>
    </>
  )
}

export default DelicaciesPostCard
