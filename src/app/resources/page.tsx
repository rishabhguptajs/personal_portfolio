import React from "react"
import Navbar from "../components/navbar"

const page = () => {
  return (
    <div className="w-full p-4 items-center bg-black bg-grid-white/[0.2] relative flex h-screen flex-col overflow-hidden">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] z-20"></div>
      <Navbar />
      <h2 className="text-white p-4 backdrop-blur-sm bg-white/10 mt-6 text-4xl rounded-lg z-50 cursor-default">
        AI Resources
      </h2>
      <div className="flex flex-col text-white flex-grow items-center justify-start max-h-[70vh] overflow-y-auto w-full sm:w-[60vw] m-4 z-50 scrollbar-hide">
        <div className="bg-white/20 w-full p-4 rounded-lg cursor-default backdrop-blur-sm">
          <div className="flex w-full justify-between">
            <h2 className="max-w-[90%]">
              1) Improving Language Understanding by Generative Pre-Training
            </h2>
            <span>
              <a href="https://s3-us-west-2.amazonaws.com/openai-assets/research-covers/language-unsupervised/language_understanding_paper.pdf" className="text-black bg-white py-1 px-2 rounded-md">
                Link
              </a>
            </span>
          </div>
          <p className="font-bold">
            Authors: Alec Radford, Karthik Narasimhan, Tim Salimans, Ilya
            Sutskever
          </p>
        </div>
        <div className="bg-white/20 w-full p-4 rounded-lg backdrop-blur-sm mt-4">
          <div className="flex w-full justify-between">
            <h2 className="max-w-[90%]">
              2) EfficientNet: Rethinking Model Scaling for Convolutional Neural
              Networks
            </h2>
            <span>
              <a href="https://arxiv.org/pdf/1905.11946.pdf" className="text-black bg-white py-1 px-2 rounded-md">
                Link
              </a>
            </span>
          </div>
          <p className="font-bold">Authors: Mingxing Tan, Quoc V. Le</p>
        </div>
        <div className="bg-white/20 w-full p-4 rounded-lg backdrop-blur-sm mt-4">
          <div className="flex w-full justify-between">
            <h2 className="max-w-[90%]">
              3) BERT: Pre-training of Deep Bidirectional Transformers for
              Language Understanding
            </h2>
            <span>
              <a href="https://arxiv.org/pdf/1810.04805.pdf" className="text-black bg-white py-1 px-2 rounded-md">
                Link
              </a>
            </span>
          </div>
          <p className="font-bold">Authors: Jacob Devlin, Ming-Wei Chang, Kenton Lee, Kristina Toutanova</p>
        </div>
        <div className="bg-white/20 w-full p-4 rounded-lg backdrop-blur-sm mt-4">
          <div className="flex w-full justify-between">
            <h2 className="max-w-[90%]">
              4) Attention is All You Need
            </h2>
            <span>
              <a href="https://arxiv.org/pdf/1706.03762.pdf" className="text-black bg-white py-1 px-2 rounded-md">
                Link
              </a>
            </span>
          </div>
          <p className="font-bold">Authors: Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Lukasz Kaiser, Illia Polosukhin</p>
        </div>
      </div>
    </div>
  )
}

export default page
