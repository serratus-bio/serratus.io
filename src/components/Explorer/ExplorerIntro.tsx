import React from 'react'
import { NavLink } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { classesBoxBorder } from 'common'
import { routes } from 'common/routes'

export const ExplorerIntro = () => {
    const headTags = (
        <Helmet>
            <title>Serratus | Explorer</title>
        </Helmet>
    )
    return (
        <div className='min-h-screen w-full sm:bg-gray-100 py-4'>
            {headTags}
            <div className={`py-4 px-6 mx-4 ${classesBoxBorder}`}>
                <h1 className='text-3xl font-bold text-center'>Serratus Explorer</h1>
                <p className='my-3 text-xl'>
                    Explore the raw sequencing virome of millions of samples collected by the world
                    biological community. This data spans the past 13 years from every continent,
                    ocean and kingdom of life.
                </p>
            </div>
            <hr className='block sm:hidden' />
            <div className='flex flex-col lg:flex-row'>
                <AboutCard
                    link={routes.nucleotideExplorer.path}
                    title='Explore NT Search'
                    imgTop='/nt_search.png'
                    imgTopAlt='serratus nucleotide search'>
                    <p className='my-2'>
                        The <b>NT Search</b> is a high-sensitivity nucleotide search of known
                        complete genomes from all RefSeq vertebrate viruses (N = 2,849) (excluding
                        retroviruses) and GenBank Coronaviridae sequences (N = 10,101). Sequences
                        are masked for low-complexity regions and plasmid contaminants.
                    </p>
                    <p className='my-2'>
                        3.8 million SRA sequencing libraries were aligned to <i>cov3ma</i> using
                        <i>bowtie2</i>.
                    </p>
                    <a
                        href='https://github.com/ababaian/serratus/wiki/ref_cov3ma'
                        rel='noreferrer'
                        target='_blank'>
                        <u>
                            More detail on the <i>cov3ma</i> search query.
                        </u>
                    </a>
                </AboutCard>
                <hr className='block sm:hidden' />
                <AboutCard
                    link={routes.rdrpExplorer.path}
                    title='Explore RdRP Search'
                    imgTop='/rdrp_search.png'
                    imgTopAlt='serratus rdrp search'>
                    <p className='my-2'>
                        The <b>RdRP Search</b> is a deep search for novel RNA viruses focusing on
                        the hallmark gene RNA-dependent RNA Polymerase (RdRP). All publicly
                        available and full-length RdRP sequences were taken and clustered at 90%
                        amino-acid identity to yield <i>rdrp1</i> (N = 14,653).
                    </p>
                    <p className='my-2'>
                        5.7 million SRA sequencing libraries were aligned to <i>rdrp1</i> using
                        <i>DIAMOND</i>.
                    </p>
                    <a
                        href='https://github.com/ababaian/serratus/wiki/ref_rdrp1'
                        rel='noreferrer'
                        target='_blank'>
                        <u>
                            More detail on the <i>rdrp1</i> search query.
                        </u>
                    </a>
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
        <div className={`m-4 sm:py-10 lg:w-1/2 ${classesBoxBorder}`}>
            <div className='font-bold text-xl mb-2 text-center text-blue-600'>
                <button className='bg-gray-100 hover:bg-gray-300 mx-2 py-1 px-4 rounded'>
                    <NavLink to={link}>{title}</NavLink>
                </button>
            </div>
            <img className='m-auto' src={imgTop} alt={imgTopAlt} />
            <div className='m-6'>
                <p className='text-gray-700 text-base'>{children}</p>
            </div>
        </div>
    )
}
