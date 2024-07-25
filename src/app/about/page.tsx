import React from 'react'
import Navbar from '../components/navbar'
import Head from 'next/head'

const AboutMe = () => {
  return (
    <div className="w-full p-4 bg-black bg-grid-white/[0.2] relative flex min-h-screen flex-col">

        <Head>
            <title>Rishabh Gupta's Portfolio</title>
            <meta name="description" content="Explore Rishabh Gupta's Full Stack Developer portfolio showcasing expertise in ReactJS, NodeJS, and modern web technologies." />
            <meta name="keywords" content="Rishabh Gupta, Full Stack Developer, ReactJS, NodeJS, Portfolio, Developer" />
            <meta name="author" content="Rishabh Gupta" />
            <meta property="og:title" content="Rishabh Gupta's Portfolio" />
            <meta property="og:description" content="Showcasing projects and skills of Rishabh Gupta, a Full Stack Developer" />
            <meta property="og:image" content="/assets/PROFILE_PAGE_PROFESSIONAL.jpg" />
            <meta property="og:url" content="https://rishabhguptajs.me" />
            <meta name="twitter:card" content="summary_large_image" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Person",
                        "name": "Rishabh Gupta",
                        "url": "https://rishabhguptajs.me",
                        "sameAs": [
                            "https://www.linkedin.com/in/rishabhguptajs",
                            "https://www.github.com/rishabhguptajs"
                        ]
                    })
                }}
            />
        </Head>

        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] z-20"></div>
        <Navbar />
        <div className="flex flex-col items-center justify-center text-white cursor-default sm:mt-0 text-center z-50 flex-grow mx-4">
            <h1 className="text-4xl font-bold text-white text-center">About Me</h1>
            <p className="text-white text-center mt-4">
                I am a Full Stack Developer with a passion for creating and building web applications. I have experience working with ReactJS, NodeJS, and MongoDB. I am always looking to learn new technologies and improve my skills. I am currently looking for new opportunities to work on exciting projects.
            </p>
        </div>
    </div>
  )
}

export default AboutMe
