import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ExternalLink } from 'common'
import { routes } from 'common/routes'

export const Navbar = () => {
    const [hamburgerButtonPressed, setHamburgerPressed] = useState<boolean>(false)
    return (
        <>
            <div className='relative min-h-full z-10'>
                <div className='absolute top-0 right-0 lg:hidden'>
                    <button
                        id='hamburger'
                        onClick={() => setHamburgerPressed(!hamburgerButtonPressed)}>
                        <img
                            className='toggle block'
                            src='https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png'
                            width='40'
                            height='40'
                        />
                    </button>
                </div>
                <div
                    className={`${
                        hamburgerButtonPressed ? 'flex flex-col' : 'hidden'
                    } lg:flex lg:flex-row w-screen  bg-gray-50 sm:p-4 items-center lg:justify-between gap-y-4 z-10 border-b-2  border-gray-200 font-montserrat font-medium`}>
                    <div className='w-20 h-8 flex justify-items-center align-middle'>
                        <NavLink exact to={routes.home.path}>
                            <img src='/logo.png' alt='logo'></img>
                        </NavLink>
                    </div>
                    <div className='flex flex-col items-center gap-y-2 lg:flex-row mt-1 mr-10'>
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
                        <ExternalLink
                            href='https://www.biorxiv.org/content/10.1101/2020.08.07.241729v2'
                            className='ml-10 hover:text-blue-800 transition duration-300 ease-in-out lg:ml-6 lg:bg-white lg:font-mono lg:font-normal lg:border-2 lg:border-gray-600 lg:rounded-lg lg:p-2 lg:hover:text-blue-600 lg:hover:border-blue-600'>
                            Preprint
                        </ExternalLink>
                        <ExternalLink
                            href='https://github.com/ababaian/serratus/wiki'
                            className='ml-10 hover:text-blue-800 transition duration-300 ease-in-out lg:ml-6 lg:bg-white lg:font-mono lg:font-normal lg:border-2 lg:border-gray-600 lg:rounded-lg lg:p-2 lg:hover:text-blue-600 lg:hover:border-blue-600'>
                            Wiki
                        </ExternalLink>
                    </div>
                </div>
            </div>
        </>
    )
}
