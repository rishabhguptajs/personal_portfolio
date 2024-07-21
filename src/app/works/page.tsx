import React from 'react'
import Navbar from '../components/navbar'

interface WorksProps {
  name: string;
  github: string;
  live: string;
  desc: string;
  tech: string[];
}

const Works: React.FC<WorksProps> = ({name, github, live, desc, tech}) => {
  return (
    <div className="w-full p-4 items-center bg-black bg-grid-white/[0.2] relative flex h-screen flex-col">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] z-20"></div>
        <Navbar />
      <h1 className='text-white p-4 backdrop-blur-sm bg-white/10 mt-6 text-4xl rounded-lg z-50 cursor-default'>My Works</h1>
    </div>
  )
}

export default Works
