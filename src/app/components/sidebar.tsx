"use client";

import React from 'react';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import { RiTwitterXFill } from "react-icons/ri";
import { SiLeetcode } from "react-icons/si";
import { BackgroundGradient } from './ui/background-gradient';

const SideBar: React.FC = () => {
  return (
    <BackgroundGradient animate className="rounded-[22px] max-w-sm p-[2px] dark:bg-zinc-900">
    <nav>
        {/* a sidebar for links of socials */}

        <div className='flex flex-col justify-center transition-all items-center gap-2 p-2 rounded-2xl bg-slate-800'>
            <a href='https://www.linkedin.com/in/rishabhguptajs/' target='_blank' className='text-white hover:text-[#FFDE4D] cursor-pointer p-2 font-headers text-2xl flex flex-col'>
                <FaLinkedin className=' text-blue-600' />
            </a>
            <hr className='bg-blue-400' />
            <a href='https://www.github.com/rishabhguptajs/' target='_blank' className='text-white hover:text-[#FFDE4D] cursor-pointer p-2 font-headers text-2xl'>
                <FaGithub className=' text-gray-200' />
            </a>
            <hr />
            <a href='https://www.twitter.com/rishabhguptajs/' target='_blank' className='text-white hover:text-[#FFDE4D] cursor-pointer p-2 font-headers text-2xl'>
                <RiTwitterXFill className=' text-gray-100' />
            </a>
            <hr />
            <a href='https://www.instagram.com/rishabhgupta.js/' target='_blank' className='text-white hover:text-[#FFDE4D] cursor-pointer p-2 font-headers text-2xl'>
                <FaInstagram className=' text-pink-500' />
            </a>
            <hr />
            <a href='https://www.leetcode.com/rishabhguptajs/' target='_blank' className='text-white hover:text-[#FFDE4D] cursor-pointer p-2 font-headers text-2xl'>
                <SiLeetcode className='text-amber-400' />
            </a>
        </div>
    </nav>
    </BackgroundGradient>
  )
}

export default SideBar
