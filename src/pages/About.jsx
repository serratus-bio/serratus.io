import React from 'react'
import { Helmet } from 'react-helmet';
import AboutCard from '../components/AboutCard';
import {
  classesBoxBorder,
  ExternalLink
} from '../CommonHelpers';

export default () => {
  const headTags = (
    <Helmet>
      <title>Serratus | About</title>
    </Helmet>
  )
  return (
    <div className="min-h-screen w-full sm:bg-gray-200 py-4">
      {headTags}
      <div className={`py-4 px-6 mx-4 ${classesBoxBorder}`}>
        <h1 className="text-3xl font-bold text-center">Background</h1>
        <p className="my-3">We are in the midst a devestating pandemic. To help the global research community develop a vaccine and therapies as efficiently as possible, we are uncovering as many coronaviruses as possible.</p>
        <p className="my-3">It is critically important to catalogue all coronaviruses and their animal reservoirs, since coronaviruses can mix RNA (recombine) resulting in new viral strains, and potentially new outbreaks. Since SARS-CoV-2 is a novel virus, it is of paramount importance to identify related viruses as they are potential sources for recombination.</p>
        <p className="text-blue-600"><ExternalLink href="https://www.youtube.com/watch?v=MtZk7JEOzus">Learn more</ExternalLink></p>
      </div>
      <hr className="block sm:hidden" />
      <div className="flex flex-col lg:flex-row">
        <AboutCard
          title="Re-analyzing public data"
          text="The NCBI SRA database contains DNA and RNA sequencing data from millions of biologically diverse samples, collected over a decade from research labs across the world. We have undertaken a comprehensive re-analysis of the 10s of million gigabytes of data to catalogue every vertebrate virus in this data, especially rare or undiscovered coronaviruses."
          imgTop="/db.png"
          imgTopAlt="database"
          imgBottom="/ncbi.png"
          imgBottomAlt="NCBI logo"
          imgBottomLink="https://www.ncbi.nlm.nih.gov/sra" />
        <hr className="block sm:hidden" />
        <AboutCard
          title="Cloud computing architecture"
          text="Big data requires big computing. We've built a cloud architecture that allows us to access upto 22,250 CPU with Amazon Web Services. Using this method allows us to perform hundreds of years of computing in only a few hours and discovery these coronaviruses now."
          imgTop="/cloud.png"
          imgTopAlt="cloud"
          imgBottom="/aws-logo.png"
          imgBottomAlt="AWS logo"
          imgBottomLink="https://github.com/ababaian/serratus/wiki/Architecture-and-Pipeline" />
        <hr className="block sm:hidden" />
        <AboutCard
          title="Viral Sequence Database"
          text="Our primary goal is to generate the coronavirus data to accelerate the global research efforts in fighting SARS-CoV-2. This means sharing all data and tools immediately.
          We adhere to the Bermuda Principles set out originally by the Human Genome Project, all data is freely and publicly available within 24 hours of generation. If there is a way CoV sequence data can assist your research, please reach out and we can work towards advancing COVID-19 related applications."
          imgTop="/dbcloud.png"
          imgTopAlt="cloud db icon"
          imgBottom="/gh.png"
          imgBottomAlt="GitHub logo"
          imgBottomLink="https://github.com/ababaian/serratus/wiki/Access-Data-Release" />
      </div>
    </div>
  )
}
