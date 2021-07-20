/* eslint-disable react/display-name */
import React from 'react'
import { Redirect } from 'react-router-dom'
import { Home } from '../pages/Home'
import { NucleotideExplorer } from '../components/Explorer/Nucleotide'
import { RdrpExplorer } from '../components/Explorer/Rdrp'
import { About } from '../pages/About'
import { Team } from '../pages/Team'
import { Jbrowse } from '../pages/Jbrowse'
import { Access } from '../pages/Access'
import { Geo } from '../components/Geo'

export const routes = [
    {
        path: '/',
        component: Home,
        exact: true,
    },
    {
        path: '/explorer',
        component: NucleotideExplorer,
    },
    {
        path: '/explorer-rdrp',
        component: RdrpExplorer,
    },
    {
        path: '/about',
        component: About,
    },
    {
        path: '/team',
        component: Team,
    },
    {
        path: '/jbrowse',
        component: Jbrowse,
    },
    {
        path: '/geo',
        component: Geo,
    },
    {
        path: '/access',
        component: Access,
    },
    {
        path: '/family',
        component: () => <Redirect to='/explorer' />,
    },
    {
        path: '/explore',
        component: () => <Redirect to='/explorer' />,
    },
    {
        path: '/query',
        component: () => <Redirect to='/explorer' />,
    },
    {
        path: '/explorer-nt',
        component: () => <Redirect to='/explorer' />,
    },
]
