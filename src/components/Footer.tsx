import React from 'react'
import { ExternalLink } from 'common'

export const Footer = () => {
    return (
        <footer className='bg-gray-50 px-10 py-2 border-t-2 border-gray-200'>
            <div className='flex gap-1 items-center justify-center'>
                Want to revolutionize virus discovery? Serratus is hiring{' '}
                <ExternalLink href='https://rrna.ca/id0001' className='text-blue-600'>
                    computational virologists
                </ExternalLink>{' '}
                and/or{' '}
                <ExternalLink href='https://rrna.ca/id0002' className='text-blue-600'>
                    software engineers
                </ExternalLink>
                .
            </div>
        </footer>
    )
}
