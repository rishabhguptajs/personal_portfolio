import React from 'react'

interface QuoteProps{
    quote: string;
    author: string;
}

const QuoteComponent: React.FC<QuoteProps> = ({ quote, author }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm text-white text-center">
        <h1 className="text-lg">{quote}</h1>
        <h2 className="text-sm mt-2">- {author}</h2>
      </div>
    </div>
  )
}

export default QuoteComponent
