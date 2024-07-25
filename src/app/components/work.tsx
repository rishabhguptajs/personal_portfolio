"use client"

import Link from "next/link"
import React from "react"

interface WorksProps {
  name: string
  github: string
  live: string | ""
  desc: string
  tech: string[]
  id: number
  type: string
}

const WorkComponent: React.FC<WorksProps> = ({
  name,
  github,
  live = "",
  desc,
  tech = [],
  id,
  type = '',
}) => {
  return (
    <div className="w-full sm:w-[50%] cursor-default ">
      <a className="w-full">
        <div className="w-full p-4 bg-white/10 backdrop-blur-sm rounded-lg m-4">
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-white text-2xl font-monoskills">{name}</h1>
            {type.length > 0 ? (
              <p className="text-black mr-2 bg-white p-1 text-sm rounded-lg min-w-fit">
                {type}
              </p>
            ) : (
              ""
            )}
          </div>
          <p className="text-white text-sm my-1">{desc}</p>
          <div className="flex flex-row items-center justify-between">
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-sm underline"
            >
              Github
            </a>
            {live.length > 0 ? (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-sm underline"
              >
                {" "}
                Live
              </a>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-row flex-wrap items-center justify-start">
            {tech.map((t, i) => (
              <div
                key={i}
                className="text-white text-xs bg-white/10 p-1 rounded-lg m-1 hover:cursor-pointer hover:bg-white hover:text-black transition-all"
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </a>
    </div>
  )
}

export default WorkComponent
