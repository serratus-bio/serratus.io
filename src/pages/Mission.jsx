import React from 'react'

const About = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <img src="/serratus.jpg" alt="serratus mountain" className="invisible sm:visible sm:fixed z-0 opacity-75" style={{ objectFit: 'cover', minWidth: '100vh', minHeight: '100vh' }} />
      <div className="w-screen flex flex-col justify-center items-center z-10">
        <h1 className="text-5xl text-black font-normal text-center bg-white p-6 rounded-lg shadow-2xl z-20">Why Serratus?</h1>
        <h1 className="text-xl text-black font-light text-center w-3/4 lg:w-3/5 mt-8 bg-white p-6 rounded-lg shadow-2xl z-20">
          <strong>The world needs us. </strong>
              We are currently in a pandemic and we are ill-equiped.
              The quality of the sequencing data available for SARS-Cov-2 (COVID-19) is not in good condition,
              with only ~43% of coronaviruses having complete genomes.
              It is also likely that many more viruses in the same family have yet to be discovered.
              Serratus is here to help, but how?
        </h1>
        <div className="z-20">
          <iframe title="youtube-intro" width="640" height="300" className="mt-12 shadow-2xl rounded-lg z-20" src="https://www.youtube.com/embed/MtZk7JEOzus" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
      </div>
    </div>
  )
}

export default About;
