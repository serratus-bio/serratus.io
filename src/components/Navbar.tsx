import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ExternalLink } from 'common'
import { routes } from 'common/routes'
import Hamburger from 'hamburger-react'
//import { Footer } from 'components/Footer'

export const Navbar = () => {
    const [hamburgerButtonPressed, setHamburgerPressed] = useState<boolean>(false)
    return (
        <>
            <div className='min-h-full z-10'>
                <div className='flex bg-gray-50 lg:hidden justify-between items-center'>
                    <div className='w-20 h-8 m-3'>
                        <NavLink exact to={routes.home.path}>
                            <img src='/logo.png' alt='logo'></img>
                        </NavLink>
                    </div>
                    <Hamburger
                        onToggle={() => setHamburgerPressed(!hamburgerButtonPressed)}></Hamburger>
                </div>
                <div
                    className={`${
                        hamburgerButtonPressed ? 'flex flex-col' : 'hidden'
                    } lg:flex lg:flex-row bg-gray-50 sm:p-2 lg:justify-between items-center gap-y-4 z-10 border-b-2  border-gray-200 font-montserrat font-medium`}>
                    <div className='hidden w-20 h-8 lg:flex align-middle'>
                        <NavLink exact to={routes.home.path}>
                            <img src='/logo.png' alt='logo'></img>
                        </NavLink>
                    </div>

                    <div className='flex flex-col gap-y-2 lg:flex-row mt-1 mr-10 items-center'>
                        <NavLink
                            exact
                            to={routes.explorerIntro.path}
                            className='ml-10 hover:text-blue-800 transition duration-300 ease-in-out'
                            activeClassName='text-blue-600'>
                            Explorer
                        </NavLink>
                        <NavLink
                            exact
                            to={routes.toolkit.path}
                            className='ml-10 hover:text-blue-800 transition duration-300 ease-in-out'
                            activeClassName='text-blue-600'>
                            Toolkit
                        </NavLink>
                        <NavLink
                            exact
                            to={routes.about.path}
                            className='ml-10 hover:text-blue-800 rounded transition duration-300 ease-in-out'
                            activeClassName='text-blue-600'>
                            About
                        </NavLink>
                        <NavLink
                            exact
                            to={routes.team.path}
                            className='ml-10 hover:text-blue-800 transition duration-300 ease-in-out'
                            activeClassName='text-blue-600'>
                            Team
                        </NavLink>
                        <NavLink
                            exact
                            to={routes.media.path}
                            className='ml-10 hover:text-blue-800 transition duration-300 ease-in-out'
                            activeClassName='text-blue-600'>
                            Media
                        </NavLink>
                        <ExternalLink
                            href='https://www.nature.com/articles/s41586-021-04332-2'
                            className='ml-10 hover:text-blue-800 transition duration-300 ease-in-out lg:ml-6 lg:bg-white lg:font-mono lg:font-normal lg:border-2 lg:border-gray-600 lg:rounded-lg lg:p-2 lg:hover:text-blue-600 lg:hover:border-blue-600'>
                            Paper
                        </ExternalLink>
                        <ExternalLink
                            href='https://github.com/ababaian/serratus/wiki'
                            className='ml-10 hover:text-blue-800 transition duration-300 ease-in-out lg:ml-6 lg:bg-white lg:font-mono lg:font-normal lg:border-2 lg:border-gray-600 lg:rounded-lg lg:p-2 lg:hover:text-blue-600 lg:hover:border-blue-600'>
                            Wiki
                        </ExternalLink>
                    </div>
                </div>
                {/* {<Footer />} # Across-website Announcement Banner */}
            </div>
        </>
    )
}
