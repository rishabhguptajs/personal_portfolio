"use client";

import React from 'react'
import Navbar from '../components/navbar'
import WorkComponent from '../components/work'
import { Projects } from '../assets/workdata';

const Works: React.FC = () => {
  return (
    <div className="w-full p-4 items-center bg-black bg-grid-white/[0.2] relative flex max-h-screen flex-col">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] z-20"></div>
      <Navbar />
      <h1 className='text-white p-4 backdrop-blur-sm bg-white/10 mt-6 text-2xl sm:text-4xl rounded-lg z-50 cursor-default text-center'>My Works</h1>

      <div className="flex flex-col flex-grow items-center justify-start max-h-[70vh] overflow-y-auto w-full sm:w-full md:w-4/5 lg:w-3/4 xl:w-[90%] m-4 z-50 scrollbar-hide">
        {Projects.map((project, i) => (
          <WorkComponent key={i} id={i} {...project} />
        ))}
      </div>
    </div>
  )
}

export default Works