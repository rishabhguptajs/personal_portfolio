import Image from "next/image";
import Navbar from "./components/navbar";
import SideBar from "./components/sidebar";

export default function Home() {
  return (
    <div className="m-4">
      <Navbar />
      <div className="fixed bottom-4">
        <SideBar />
      </div>
    </div>
  )
}
