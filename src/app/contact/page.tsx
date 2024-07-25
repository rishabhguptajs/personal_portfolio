import React from "react"
import Navbar from "../components/navbar"
import { Label } from "../components/ui/label"
import { Input } from "../components/ui/input"

const Contact = () => {
  return (
    <div className="w-full p-4 items-center bg-black bg-grid-white/[0.2] relative flex h-screen flex-col">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] z-20"></div>
      <Navbar />

      <h1 className="text-white p-4 backdrop-blur-sm bg-white/10 mt-6 text-4xl rounded-lg z-50 cursor-default">
        Contact Me
      </h1>

      <form action="https://formsubmit.co/rishabhgupta4523@gmail.com" method="POST" className="text-white flex flex-col items-center p-4 backdrop-blur-sm bg-white/10 mt-6 text-4xl rounded-lg z-50 cursor-default">
        <div className="w-full">
          <Label className="text-white ml-1" htmlFor="email-input">
            Email{" "}
          </Label>
          <Input
            className="text-black mt-2"
            id="email-input"
            type="email"
          />
        </div>

        <div>
          <Label
            className="text-white h-fit w-fit ml-1"
            htmlFor="message-input"
          >
            Message{" "}
          </Label>
          <Input
            className="text-black mt-2 sm:w-[400px] min-w-[200px] h-32"
            id="message-input"
            type="text"
          />
        </div>

        <button className="text-[24px] font-monoskills hover:shadow-lg hover:-translate-y-1 transition-all m-4 mb-2 bg-white text-black px-3 py-2 rounded-lg w-fit">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Contact
