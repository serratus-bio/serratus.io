import React from 'react'
import { Helmet } from 'react-helmet'
import { classesBoxBorder, ExternalLink } from 'common'

const About = () => {
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
                <p className="my-3">
                    {' '}
                    0.001% of the Earth's viruses are known to science. Emergent
                    viral diseases such as COVID-19 caused by the SARS-CoV-2
                    virus can have devastating consequences on human society. To
                    prepare for (and mitigate) the next pandemic, there is an
                    urgent need to characterize the planetary diversity of
                    viruses.
                </p>
                <p className="my-3">
                    <b>Serratus</b> is an Open Science project to uncover the
                    planetary virome, freely and openly.
                </p>
            </div>
            <hr className="block sm:hidden" />
            <div className="flex flex-col lg:flex-row">
                <AboutCard
                    title="Re-analyzing public data"
                    imgTop="/db.png"
                    imgTopAlt="database"
                    imgBottom="/ncbi.png"
                    imgBottomAlt="NCBI logo"
                    imgBottomLink="https://www.ncbi.nlm.nih.gov/sra">
                    The NCBI Sequence Read Archive database contains DNA and RNA
                    sequencing data from millions of biologically diverse
                    samples, collected over a decade from research labs across
                    the world. We have undertaken a comprehensive re-analysis of
                    the 10,000,000s gigabytes of data to catalogue every virus
                    on Earth.
                </AboutCard>
                <hr className="block sm:hidden" />
                <AboutCard
                    title="Cloud computing architecture"
                    imgTop="/cloud.png"
                    imgTopAlt="cloud"
                    imgBottom="/serratus.png"
                    imgBottomAlt="AWS logo"
                    imgBottomLink="https://github.com/ababaian/serratus/wiki/Architecture-and-Pipeline">
                    Planetary-scale data requires cloud-scale computing. The
                    engine driving <b>Serratus</b> is a new type of
                    cloud-computing architecture that we designed to process
                    petabytes of sequencing data. Using Amazon Web Services we
                    access up to 22,250 CPU allowing us to process data hundreds
                    of times faster then was possible before.
                </AboutCard>
                <hr className="block sm:hidden" />
                <AboutCard
                    title="The Open Virome"
                    imgTop="/dbcloud.png"
                    imgTopAlt="cloud db icon"
                    imgBottom="/gh.png"
                    imgBottomAlt="GitHub logo"
                    imgBottomLink="https://github.com/ababaian/serratus/wiki/Access-Data-Release">
                    Our primary goal is to generate rich and comprehensive data
                    to accelerate the global research efforts in fighting
                    SARS-CoV-2 and other emerging viral diseases. We adhere to
                    the Bermuda Principles set out originally by the Human
                    Genome Project, all data is freely and publicly available
                    within 24 hours of generation. Our goal is to advance
                    science, if you require assistance accessing any data please{' '}
                    <ExternalLink
                        className="text-blue-600"
                        href="https://github.com/ababaian/serratus/issues">
                        open an issue on our GitHub
                    </ExternalLink>{' '}
                    and we can help.
                </AboutCard>
            </div>
        </div>
    )
}

export default About

const AboutCard = ({
    imgTop,
    imgTopAlt,
    title,
    text,
    imgBottom,
    imgBottomLink,
    imgBottomAlt,
    children,
}) => {
    return (
        <div className={`m-4 sm:py-10 lg:w-1/3 ${classesBoxBorder}`}>
            <img
                className="h-24 w-24 mt-4 m-auto"
                src={imgTop}
                alt={imgTopAlt}
            />
            <div className="m-6">
                <div className="font-bold text-xl mb-2 text-center">
                    {title}
                </div>
                <p className="text-gray-700 text-base">{children}</p>
            </div>
            <div>
                <ExternalLink href={imgBottomLink}>
                    <span className="inline-block align-middle h-full"></span>
                    <img
                        className="align-middle m-auto h-20"
                        src={imgBottom}
                        alt={imgBottomAlt}
                    />
                </ExternalLink>
            </div>
        </div>
    )
}
