import Navbar from "./components/navbar"
import SideBar from "./components/sidebar"

export default function Home() {
  return (
    <div className="w-full p-4 bg-black bg-grid-white/[0.2] relative flex h-[100vh] flex-col">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] z-20"></div>
      <Navbar />
      <div>
        <div className="fixed bottom-4 hidden sm:block z-30">
          <SideBar />
        </div>

        <div className="text-white cursor-default mt-[10%] text-center z-30">
          <h1 className="font-title text-3xl">
            Hello, I'm <span className="text-5xl text-green-500">Rishabh</span>
          </h1>
          <p className="font-sans text-2xl m-2">
            A{" "}
            <span className="font-title text-yellow-400 text-3xl">
              Full Stack
            </span>{" "}
            Developer
          </p>
        </div>
      </div>
    </div>
  )
}
