import React from 'react'
import { ExternalLink } from 'common'

const Footer = () => {
    return (
        <footer className='bg-gray-100 px-4 py-2 border-t-2 border-gray-300 md:text-center'>
            This website is still under{' '}
            <ExternalLink
                href='https://github.com/serratus-bio/serratus.io'
                className='text-blue-600'>
                active development
            </ExternalLink>
            . If you have any issues or feedback, please{' '}
            <ExternalLink
                href='https://github.com/serratus-bio/serratus.io/issues/new'
                className='text-blue-600'>
                submit an issue on GitHub
            </ExternalLink>
            . As an open-source project, serratus.io also welcomes any contributors.
        </footer>
    )
}

export default Footer
