import React from 'react'
import { NavLink } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { classesBoxBorder } from 'common'
import { routes } from 'common/routes'

export const BetaIntro = () => {
    const headTags = (
        <Helmet>
            <title>Serratus | Beta Tools</title>
        </Helmet>
    )
    return (
        <div className='min-h-screen w-full sm:bg-gray-100 py-4'>
            {headTags}
            <div className={`py-4 px-6 mx-4 ${classesBoxBorder}`}>
                <h1 className='text-3xl font-bold text-center'>Serratus Beta Tools</h1>
                <p className='my-3 text-xl'>
                    Apart from Serratus Explorer, we have developed various tools based on our
                    existing data and analysis pipelines.
                </p>
            </div>
            <hr className='block sm:hidden' />
            <div className='flex flex-col lg:flex-row'>
                <AboutCard
                    link={routes.geo.path}
                    title='The Planetary RNA Virome'
                    imgTop='/geo_screenshot.png'
                    imgTopAlt='screenshot of geographical map of rna viruses'>
                    <p className='my-2'>
                        We searched all 16 million BioSample submissions for geographical metadata.
                        Combined with the RdRP search results, this data yields a map of RNA viruses
                        found in the SRA.
                    </p>
                </AboutCard>
                <hr className='block sm:hidden' />
                <AboutCard
                    link={routes.trees.path}
                    title='Trees and Alignments'
                    imgTop='/trees_screenshot.png'
                    imgTopAlt='trees screenshot'>
                    <p className='my-2'>
                        Serratus has pieced together both well-known and novel viruses genomes.
                        Explore the breakdown by virus order/family and download tree files.
                    </p>
                </AboutCard>
                <AboutCard
                    link={routes.palmid.path}
                    title='palmID: Viral-RdRP Analysis'
                    imgTop='/palmid_screenshot.png'
                    imgTopAlt='palmid screenshot'>
                    <p className='my-2'>
                        palmID is a contained analysis suite for viral RNA-dependent RNA polymerases
                        (RdRP) based on the “Palmprint” RNA virus barcodes described by Babaian and
                        Edgar, 2021.
                    </p>
                </AboutCard>
            </div>
        </div>
    )
}

type Props = {
    link: string
    imgTop: string
    imgTopAlt: string
    title: string
    children: any
}

const AboutCard = ({ link, imgTop, imgTopAlt, title, children }: Props) => {
    return (
        <div className={`m-4 sm:py-10 lg:w-1/3 ${classesBoxBorder}`}>
            <div className='font-bold text-xl mb-2 text-center text-blue-600'>
                <NavLink to={link}>{title}</NavLink>
            </div>
            <img className='w-5/6 m-auto' src={imgTop} alt={imgTopAlt} />
            <div className='m-6'>
                <p className='text-gray-700 text-base'>{children}</p>
            </div>
        </div>
    )
}
