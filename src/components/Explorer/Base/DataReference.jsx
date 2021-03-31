import React from 'react'
import { ExternalLink } from 'common'

const DataReference = () => {
    return (
        <div className='text-gray-700 text-sm'>
            <div className='my-2'>
                Programmatic access to Serratus databases is available via the R package,{' '}
                <ExternalLink
                    href='https://github.com/serratus-bio/tantalus'
                    className='text-blue-600'>
                    Tantalus
                </ExternalLink>
                .
            </div>
            <div>If this data assists your research, please consider citing us:</div>
            <span className='text-gray-600'>
                Edgar, R. C. <i>et al</i>. Petabase-scale sequence alignment catalyses viral
                discovery. <i>bioRxiv</i> 2020.08.07.241729 (2020){' '}
            </span>
            <ExternalLink
                href='https://doi.org/10.1101/2020.08.07.241729'
                className='text-blue-600'>
                doi:10.1101/2020.08.07.241729
            </ExternalLink>
        </div>
    )
}

export default DataReference
