import React from 'react'
import { Helmet } from 'react-helmet'
import { NavLink } from 'react-router-dom'
import { searchIcon, externalLinkIcon, ExternalLink } from 'common'
import { routes } from 'common/routes'

export const Home = () => {
    const headTags = (
        <Helmet>
            <title>Serratus | Home</title>
        </Helmet>
    )
    return (
        <div>
            {headTags}
            <img
                src='/serratus.jpg'
                alt='serratus mountain'
                className='object-cover h-screen w-screen fixed z-0'
            />
            <div className='h-screen w-screen fixed flex flex-col items-center justify-center'>
                <div className='flex flex-col z-10 items-center text-white px-4'>
                    <h1 className='text-5xl font-montserrat font-light mt-1'>
                        Welcome to Serratus
                    </h1>
                    <h2 className='text-xl font-thin mt-4'>
                        An open-science viral discovery platform
                    </h2>
                    <NavLink
                        to={routes.explorerIntro.path}
                        className='border border-white flex text-xl justify-center items-center w-auto  px-4 py-2 rounded-md hover:text-blue-600 hover:bg-white mt-8'>
                        {searchIcon} Explore
                    </NavLink>
                    <ExternalLink
                        className='mt-1'
                        title='Open tutorial on project wiki'
                        href='https://github.com/ababaian/serratus/wiki/Serratus-Explorer'>
                        Tutorial {externalLinkIcon}
                    </ExternalLink>
                    <h3 className='inline text-lg font-thin mt-3'>
                        <span className='font-normal'>5,696,598</span> runs processed
                        <span className='border-l border-white mx-2' />
                        <span className='font-normal'>10,167,539,273,088,080</span> nucleotides
                    </h3>
                </div>
            </div>
        </div>
    )
}
