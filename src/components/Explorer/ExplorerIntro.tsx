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
                    Our search space spans data deposited over 13 years from every continent and
                    ocean, and all kingdoms of life. We applied Serratus in two of many possible
                    configurations. Serratus Explorer currently serves these results in an
                    interactive web browser.
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
                        To create a collection of viral pangenomes, a comprehensive set of complete
                        and partial genomes representing the genetic diversity of each vertebrate
                        viral family, we used two approaches.
                    </p>
                    <p className='my-2'>
                        {
                            'For Coronaviridae, we combined all RefSeq (n = 64) and GenBank (n = 37,451) records matching the NCBI Nucleotid server query "txid11118[Organism:exp]" (date accessed: June 1st 2020). Sequences <200 nt were excluded as well as sequences identified to contain non-CoV contaminants during preliminary testing (such as plasmid DNA or ribosomal RNA fragments). Remaining sequences were clustered at 99% identity with UCLUST and masked by Dustmasker with --window 30 and --window 64. The final query contained 10,101 CoV sequences.'
                        }
                    </p>
                    <p className='my-2'>
                        {
                            'For all other vertebrate viral family pangenomes, RefSeq sequences (n = 2,849) were downloaded from the NCBI Nucleotide server with the query "Viruses[Organism] AND srcdb_refseq[PROP] NOT wgs[PROP] NOT cellular organisms[ORGN] NOT AC_000001:AC_999999[PACC] AND ("vhost human"[Filter] AND "vhost vertebrates"[Filter])" (date accessed: May 17th 2020). Retroviruses (n = 80) were excluded as preliminary testing yielded excessive numbers of alignments to transcribed endogenous retroviruses. Each sequence was annotated with its taxonomic family according to its RefSeq record; those for which no family was assigned by RefSeq (n = 81) were designated as "unknown".'
                        }
                    </p>
                    <p className='my-2'>
                        All AMR sequences associated with the CARD database were clustered at 95%
                        nucleotide identity and included.
                    </p>
                </AboutCard>
                <hr className='block sm:hidden' />
                <AboutCard
                    link={routes.rdrpExplorer.path}
                    title='Explore RdRP Search'
                    imgTop='/rdrp_search.png'
                    imgTopAlt='serratus rdrp search'>
                    <p className='my-2'>
                        In January 2021, we aligned 5,686,715 runs against known viral RdRP amino
                        acid sequences, completing this search within 11 days.
                    </p>
                    <p className='my-2'>
                        Viral RdRP is a hallmark gene of RNA viruses which lack a DNA stage of
                        replication. We identified RdRP by a well-conserved amino acid sub-sequence
                        we call the “palmprint”. Palmprints are delineated by three essential motifs
                        which together form the catalytic core in the RdRP structure. We constructed
                        species-like operational taxonomic units (sOTUs) by clustering palmprints at
                        a threshold of 90% amino-acid identity, chosen to approximate taxonomic
                        species.
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
