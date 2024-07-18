import React from "react"
import { LuDot } from "react-icons/lu"

interface SkillsCardProps {
  Technologies: String[]
  Languages: String[]
}

const SkillsCard: React.FC<SkillsCardProps> = ({ Technologies, Languages }) => {
  return (
    <div className="min-w-fit max-w-[280px] bg-slate-200 flex flex-col items-center p-3 transition-all rounded-md">
      <h1 className="w-full text-center mx-2 font-title">Skills</h1>
      <div className="w-full border-t-2 border-gray-300 my-2"></div>
      <div className="flex flex-col">
        <h1 className="flex items-center justify-start my-1">
          <LuDot className="text-gray-700" /> Technologies
        </h1>
        <div className="flex ml-4 flex-wrap max-w-[280px] gap-1">
          {Technologies.map((tech: String, index: number) => (
            <p
              key={index}
              className={`font-monoskills ${
                index % 2 === 0 ? "text-green-400" : "text-yellow-500"
              }`}
            >
              \{tech}
              {index < Technologies.length - 1 && ","}&nbsp;
            </p>
          ))}
        </div>
        <h1 className="flex items-center justify-start my-1">
          <LuDot className="text-gray-700" /> Languages
        </h1>
        <div className="flex ml-4 flex-wrap max-w-[280px]">
          {Languages.map((tech: String, index: number) => (
            <p
              key={index}
              className={`font-monoskills ${
                index % 2 === 0 ? "text-green-400" : "text-yellow-500"
              }`}
            >
              \{tech}
              {index < Languages.length - 1 && ","}&nbsp;
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SkillsCard
