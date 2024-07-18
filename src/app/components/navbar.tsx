"use client"

import Link from "next/link"
import React, { useState } from "react"

const Navbar: React.FC = () => {

  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen);
  }

  return (
    <nav className="rounded-md z-20 flex flex-row justify-between w-full bg-gray-800/30 backdrop-blur-sm p-2 items-center">
      <span className="text-white hover:text-[#FFDE4D] cursor-pointer p-2 ml-2 font-headers text-2xl">
        <Link href="/">Rishabh.</Link>
      </span>

      <ul className="hidden flex-row min-w-fit text-white p-2 justify-between w-[20%] mr-2 sm:flex">
        <li className="sm:mx-2">
          <Link href="/works" className="hover:underline">
            Works
          </Link>
        </li>
        <li className="sm:mx-2">
          <a
            href="https://drive.google.com/file/d/1_Oci-76Dwxe2UNV43ymg204bORW_6vKg/view?usp=sharing"
            target="_blank"
            className="hover:underline"
          >
            Resume
          </a>
        </li>
        <li className="sm:mx-2">
          <Link href="/contact" className="hover:underline">
            Contact Me
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
