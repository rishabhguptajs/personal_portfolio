"use client"

import Link from "next/link"
import React from "react"

const Navbar: React.FC = () => {
  return (
    <nav className="rounded-md z-20 flex flex-row justify-between w-full bg-slate-800 p-2 items-center">
      <span className="text-white hover:text-[#FFDE4D] cursor-pointer p-2 ml-2 font-headers text-2xl">
        <Link href="/">Rishabh.</Link>
      </span>

      <ul className="flex flex-row text-white p-2 justify-between w-[20%] mr-2">
        <li>
          <Link href="/works" className="hover:underline">
            Works
          </Link>
        </li>
        <li>
          <a
            href="https://drive.google.com/file/d/1_Oci-76Dwxe2UNV43ymg204bORW_6vKg/view?usp=sharing"
            target="_blank"
            className="hover:underline"
          >
            Resume
          </a>
        </li>
        <li>
          <Link href="/contact" className="hover:underline">
            Contact Me
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
