"use client"

import Link from "next/link"
import React, { useState } from "react"

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="rounded-md z-20 flex flex-wrap justify-between w-full bg-white/10 backdrop-blur-sm p-2 items-center">
      <span className="text-white hover:text-[#FFDE4D] cursor-pointer p-2 ml-2 font-headers text-2xl">
        <Link href="/">Rishabh.</Link>
      </span>

      <button
        onClick={handleToggle}
        className="sm:hidden text-white hover:text-[#FFDE4D] focus:outline-none"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <ul className={`${isOpen ? 'flex' : 'hidden'} flex-col sm:flex sm:flex-row w-full sm:w-auto text-white p-2 mt-2 sm:mt-0 sm:mr-2`}>
        <li className="sm:mx-2 my-2 sm:my-0">
          <Link href="/about" className="hover:underline">
            About Me
          </Link>
        </li>
        <li className="sm:mx-2 my-2 sm:my-0">
          <Link href="/works" className="hover:underline">
            Works
          </Link>
        </li>
        <li className="sm:mx-2 my-2 sm:my-0">
          <a
            href="https://drive.google.com/file/d/1_Oci-76Dwxe2UNV43ymg204bORW_6vKg/view?usp=sharing"
            target="_blank"
            className="hover:underline"
          >
            Resume
          </a>
        </li>
        <li className="sm:mx-2 my-2 sm:my-0">
          <Link href="/contact" className="hover:underline">
            Contact Me
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar