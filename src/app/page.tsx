"use client"

import Navbar from "./components/navbar"
import SideBar from "./components/sidebar"
import SkillsCard from "./components/skills"
import QuoteComponent from "./components/quote-comp"

export default function Home() {
  return (
    <div className="w-full p-4 bg-black bg-grid-white/[0.2] relative flex min-h-screen flex-col">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] z-20"></div>
      <Navbar />
      <div className="flex flex-col sm:flex-row flex-grow items-center justify-center sm:items-stretch sm:justify-start h-full">
        <div className="hidden sm:flex sm:items-center z-30 sm:relative sm:left-4 sm:w-auto">
          <SideBar />
        </div>

        <div className="flex flex-col items-center justify-center text-white cursor-default sm:mt-0 text-center z-50 flex-grow mx-4 sm:ml-[15%]">
          <img src="" alt="" />
          <h1 className="font-title text-2xl sm:text-3xl md:text-5xl mb-2 mt-4">
            Hello, I'm{" "}
            <span className="text-3xl sm:text-4xl md:text-5xl text-green-500">
              Rishabh
            </span>
          </h1>
          <p className="font-sans text-xl sm:text-2xl md:text-3xl mb-2">
            A{" "}
            <span className="font-title text-yellow-400 text-2xl sm:text-3xl md:text-4xl">
              Full Stack{" "}
            </span>
            Developer
          </p>
          <div className="mt-4 z-50">
            <QuoteComponent
              quote="One commit a day keeps the bugs away... or so they say."
              author="Rishabh"
            />
          </div>
        </div>

        <div className="sm:flex sm:items-center sm:relative sm:right-4 mt-6 sm:mt-0 min-w-[200px] z-50 sm:flex-grow-0">
          <SkillsCard
            Technologies={[
              "ReactJS",
              "NodeJS",
              "TailwindCSS",
              "MongoDB",
              "Mongoose",
              "NextUI",
              "PostgreSQL",
              "OAuth",
              "CSS",
              "HTML",
              "Bootstrap",
            ]}
            Languages={["JavaScript", "TypeScript", "Java", "Python", "C"]}
            Tools={["VS Code", "Git & GitHub", "IntelliJ IDEA"]}
          />
        </div>
      </div>
    </div>
  )
}