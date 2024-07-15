import React from 'react';
import { FaLinkedin } from 'react-icons/fa';

const SideBar: React.FC = () => {
  return (
    <nav>
        {/* a sidebar for links of socials */}

        <div className='flex flex-col justify-center transition-all items-center gap-2 p-2 rounded-2xl hover:w-[330%]  bg-slate-800'>
            <a href='https://www.linkedin.com/in/sytem/' target='_blank' className='text-white hover:text-[#FFDE4D] cursor-pointer p-2 font-headers text-2xl flex flex-col'>
                <FaLinkedin className=' text-blue-600' />
            </a>
            <a href='https://www.linkedin.com/in/rishabhguptajs/' target='_blank' className='text-white hover:text-[#FFDE4D] cursor-pointer p-2 font-headers text-2xl'>
                <FaLinkedin className=' text-blue-600' />
            </a>
            <a href='https://www.linkedin.com/in/rishabhguptajs/' target='_blank' className='text-white hover:text-[#FFDE4D] cursor-pointer p-2 font-headers text-2xl'>
                <FaLinkedin className=' text-blue-600' />
            </a>
            <a href='https://www.linkedin.com/in/rishabhguptajs/' target='_blank' className='text-white hover:text-[#FFDE4D] cursor-pointer p-2 font-headers text-2xl'>
                <FaLinkedin className=' text-blue-600' />
            </a>
            <a href='https://www.linkedin.com/in/rishabhguptajs/' target='_blank' className='text-white hover:text-[#FFDE4D] cursor-pointer p-2 font-headers text-2xl'>
                <FaLinkedin className=' text-blue-600' />
            </a>
            <a href='https://www.linkedin.com/in/rishabhguptajs/' target='_blank' className='text-white hover:text-[#FFDE4D] cursor-pointer p-2 font-headers text-2xl'>
                <FaLinkedin className=' text-blue-600' />
            </a>
        </div>
    </nav>
  )
}

export default SideBar
