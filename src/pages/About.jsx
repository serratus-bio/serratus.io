import React from 'react'
import { Helmet } from 'react-helmet';
import TechnologyCard from '../components/TechnologyCard';

export default () => {
  const headTags = (
    <Helmet>
      <title>Serratus | About</title>
    </Helmet>
  )
  return (
    <div>
      {headTags}
      <div className="flex absolute w-full h-screen justify-center lg:items-center overflow-y-visible overflow-x-hidden">
        <img src="/serratus.jpg" alt="serratus mountain" className="hidden sm:block opacity-75 sm:fixed" style={{ objectFit: 'cover', minWidth: '100vh', minHeight: '100vh' }} />
        <div className="flex flex-col lg:flex-row absolute pb-12">
          <TechnologyCard
            title="NCBI SRA Database"
            text="The NCBI SRA database contains over 1 million RNA-seq libraries amounting to a whopping 5.72 petabytes (yes, that prefix is right, peta-bytes) of data. It is our goal to reanalyze all of these sequences utilizing our ultra-high throughput analysis pipeline hosted on Amazon Web Service's (AWS) Cloud Computing."
            imgTop="/db.png"
            imgTopAlt="database"
            imgBottom="/ncbi.png"
            imgBottomAlt="NCBI logo"
            imgBottomLink="https://www.ncbi.nlm.nih.gov/sra" />
          <hr className="block md:hidden" />
          <TechnologyCard
            title="Cloud Architecture"
            text="Since there is a lot of data, we need a lot of computers. AWS allows us to spin up hundreds of them at a single time to process data in parallel, utilizing the same bioinformatics pipeline on each of them. Serratus is currently operational, scaling up to 250 nodes with real time tracking and cluster performance analysis, but we are not stopping there..."
            imgTop="/cloud.png"
            imgTopAlt="cloud"
            imgBottom="/aws-logo.png"
            imgBottomAlt="AWS logo"
            imgBottomLink="https://github.com/ababaian/serratus/wiki/Architecture-and-Pipeline" />
          <hr className="block md:hidden" />
          <TechnologyCard
            title="CoV Sequence Database"
            text="Once serratus is done, all resulting alignment files will be stored in a free, immediate access public database. It is our goal to provide accurate, honest data in order to continue the collaborative effort in fighting COVID-19."
            imgTop="/dbcloud.png"
            imgTopAlt="cloud db icon"
            imgBottom="/gh.png"
            imgBottomAlt="GitHub logo"
            imgBottomLink="https://github.com/ababaian/serratus/wiki/Access-Data-Release" />
        </div>
      </div>
    </div>
  )
}
