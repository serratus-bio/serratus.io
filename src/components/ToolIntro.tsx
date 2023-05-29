import React from 'react'
import { NavLink } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { classesBoxBorder, ExternalLink, externalLinkIcon } from 'common'
import { routes } from 'common/routes'

export const ToolIntro = () => {
    const headTags = (
        <Helmet>
            <title>Serratus | Toolkit</title>
        </Helmet>
    )
    return (
        <div className='min-h-screen w-full sm:bg-gray-100 py-4'>
            {headTags}
            <div className={`py-4 px-6 mx-4 ${classesBoxBorder}`}>
                <h1 className='text-3xl font-bold text-center'>Serratus Toolkit</h1>
                <p className='my-3 text-xl'></p>
            </div>
            <hr className='block sm:hidden' />

            <div className='flex flex-col lg:flex-row'>
                <AboutCard
                    link={routes.explorerIntro.path}
                    title='Serratus Explorer'
                    imgTop='/explorer_screenshot.png'
                    imgTopAlt='Explorer'>
                    <p className='my-2'>
                        Explore the raw sequencing virome of millions of samples collected by the
                        world biological community. Search by viral family, reference sequence, or
                        per sequencing library.
                    </p>
                </AboutCard>
                <AboutCard
                    link={routes.geo.path}
                    title='Planetary RNA Virome (beta)'
                    imgTop='/planetary_seq.png'
                    imgTopAlt='screenshot of geographical map of rna viruses'>
                    <p className='my-2'>
                        Navigate the geospatial distribution of RNA viruses in an interactive map.
                    </p>
                </AboutCard>
                <AboutCard
                    link={routes.host.path}
                    title='RNA Virome Targets (beta)'
                    imgTop='/virome_targets.png'
                    imgTopAlt='screenshot of rna virus targets'>
                    <p className='my-2'>Evaluate the potential hosts of RNA viruses.</p>
                </AboutCard>
                <AboutCard
                    link={routes.trees.path}
                    title='Trees and Alignments (beta)'
                    imgTop='/trees_screenshot.png'
                    imgTopAlt='trees screenshot'>
                    <p className='my-2'>
                        Wade through the procedurally phylogenetic trees and multiple-sequence
                        alignments generated from Serratus project data.
                    </p>
                </AboutCard>
            </div>

            <div className='flex flex-col lg:flex-row'>
                <hr className='block sm:hidden' />
                <AboutCard
                    link='https://github.com/rcedgar/palmscan'
                    external={true}
                    title='palmscan: RdRP Barcode Identification'
                    imgTop='/palm_structure_figure.png'
                    imgTopAlt='palmprint structure'>
                    <p className='my-2'>
                        Ultra-fast detection of viral RNA-dependent RNA Polymerases (RdRP) using
                        position-specific scoring matrices to generate RdRP-palmprints.
                    </p>
                </AboutCard>
                <AboutCard
                    link='https://github.com/rcedgar/palmdb'
                    external={true}
                    title='palmDB: RdRP Palmprint Database'
                    imgTop='/palmdb_icon.png'
                    imgTopAlt='palmdb icon'>
                    <p className='my-2'>
                        A database of RdRP-Palmprints from 145,000+ species of RNA viruses
                        identified from all sources.
                    </p>
                </AboutCard>
                <AboutCard
                    link={routes.palmid.path}
                    title='palmID: Viral-RdRP Analysis'
                    imgTop='/palmid_screenshot.png'
                    imgTopAlt='palmid screenshot'>
                    <p className='my-2'>
                        <i>palmID</i> is an web-tool/analysis suite for user-input RdRP sequences.
                        The palmprint-barcode is identified and used to cross-reference
                        <i>palmDB</i>, and all <i>Serratus</i> sequences. (i.e BLAST for Serratus)
                    </p>
                </AboutCard>
            </div>
        </div>
    )
}

type Props = {
    link: string
    external?: boolean
    imgTop: string
    imgTopAlt: string
    title: string
    children: any
}

const AboutCard = ({ link, external, imgTop, imgTopAlt, title, children }: Props) => {
    return (
        <div className={`m-4 sm:py-10 lg:w-1/3 ${classesBoxBorder}`}>
            <div className='font-bold text-xl mb-2 text-center text-blue-600'>
                {!external && <NavLink to={link}>{title}</NavLink>}
                {external && (
                    <ExternalLink href={link}>
                        {title} {externalLinkIcon}
                    </ExternalLink>
                )}
            </div>
            <img className='w-5/6 m-auto' src={imgTop} alt={imgTopAlt} />
            <div className='m-6'>
                <p className='text-gray-700 text-base'>{children}</p>
            </div>
        </div>
    )
}
