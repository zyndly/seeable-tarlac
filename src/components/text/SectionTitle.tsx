import React from 'react'

type SectionTitleProps = {
  title: string;
  subtitle: string;
}

function SectionTitle({title, subtitle}: SectionTitleProps) {
    return (
        
      <div className="overflow-x-hidden w-full pt-5  ">
        <h2 className="landingSectionTitle max-w-sm md:max-w-max mx-auto md:mx-0 text-center md:text-left relative text-primary-800 text-3xl font-bold pt-4 md:pt-0 md:w-max">
          {title}
        </h2>
        <h3 className='text-black font-normal mb-10'>
          {subtitle}
        </h3>
      </div>
    )
}

export default SectionTitle