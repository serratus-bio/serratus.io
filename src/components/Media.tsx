import React from 'react'
import { Helmet } from 'react-helmet'
import { classesBoxBorder, ExternalLink } from 'common'

import mediaData from '../data/mediaData.json'

export const Media = () => {
    const headTags = (
        <Helmet>
            <title>Serratus | Media</title>
        </Helmet>
    )

    return (
        <div className='p-4 lg:px-24 min-h-screen sm:bg-gray-100'>
            {headTags}
            <div className={`py-4 flex justify-center items-center ${classesBoxBorder}`}>
                <h1 className='text-3xl font-bold text-center'>Media</h1>
            </div>
            <hr className='block sm:hidden' />
            <div className='sm:h-3'></div>
            <div className={`sm:px-3 ${classesBoxBorder} grid gap-2`}>
                {mediaData.coverages.map((coverage, index) => {
                    return (
                        <div key={index} className='m-4'>
                            <h2 className='text-xl mb-1 text-center md:text-left'>
                                {coverage.name}
                            </h2>

                            <div className='mt-3 mx-2 md:ml-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                {coverage.items.map((item, idx) => {
                                    return (
                                        <div key={idx}>
                                            <h3 className='font-normal'>{item.title}</h3>
                                            <div className='text-sm whitespace-pre-line italic'>
                                                {item.publisher}
                                            </div>
                                            <a
                                                href={item.url}
                                                target='_blank'
                                                rel='noopener noreferrer'
                                                className='underline text-sm text-blue-600'>
                                                Read more
                                            </a>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
                <div className='my-3'>
                    <div className='my-3'>
                        <div>
                            Serratus is a{' '}
                            <ExternalLink href='https://www.hackseq.com/' className='text-blue-600'>
                                hackseqRNA
                            </ExternalLink>{' '}
                            initiative. Project support provided kindly by the{' '}
                            <ExternalLink
                                href='https://cic.ubc.ca/projects/university-of-british-columbia-discovering-new-coronavirus-species-by-re-analyzing-all-public-rna-sequencing-data/'
                                className='text-blue-600'>
                                UBC/AWS Cloud Innovation Center
                            </ExternalLink>
                            .
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
