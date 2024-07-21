import Navbar from "./components/navbar";
import SideBar from "./components/sidebar";
import SkillsCard from "./components/skills";

export default function Home() {
  return (
    <div className="w-full p-4 bg-black bg-grid-white/[0.2] relative flex h-screen flex-col">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] z-20"></div>
      <Navbar />
      <div className="flex flex-col sm:flex-row flex-grow items-center sm:items-start justify-center sm:justify-start">
        <div className="hidden sm:block z-30 sm:relative sm:top-[17%] sm:left-4 sm:w-auto">
          <SideBar />
        </div>

        <div className="flex flex-col h-full items-center justify-center text-white cursor-default sm:mt-0 text-center z-auto flex-grow mx-4 sm:ml-[15%]">
          <h1 className="font-title text-3xl sm:text-5xl mb-4">
            Hello, I'm <span className="text-5xl text-green-500">Rishabh</span>
          </h1>
          <p className="font-sans text-2xl sm:text-3xl mb-4">
            A{" "}
            <span className="font-title text-yellow-400 text-3xl sm:text-4xl">
              Full Stack{" "}
            </span>
            Developer
          </p>
        </div>

        <div className="absolute right-4 m-4 min-w-[200px] h-full top-[120px] z-50 sm:static sm:flex-grow-0 hidden sm:block">
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
  );
}
