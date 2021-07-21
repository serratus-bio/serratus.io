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

export const routes = {
    home: {
        path: '/',
        component: Home,
        exact: true,
    },
    nucleotideExplorer: {
        path: '/explorer/nt',
        component: NucleotideExplorer,
    },
    rdrpExplorer: {
        path: '/explorer/rdrp',
        component: RdrpExplorer,
    },
    about: {
        path: '/about',
        component: About,
    },
    team: {
        path: '/team',
        component: Team,
    },
    jbrowse: {
        path: '/jbrowse',
        component: Jbrowse,
    },
    geo: {
        path: '/geo',
        component: Geo,
    },
    access: {
        path: '/access',
        component: Access,
    },
    explorer: {
        path: '/explorer',
        component: ({ location }) => <Redirect to={{ ...location, pathname: '/explorer/nt' }} />,
        exact: true,
    },
    explorerRdrpOld: {
        path: '/explorer-rdrp',
        component: ({ location }) => <Redirect to={{ ...location, pathname: '/explorer/rdrp' }} />,
    },
}
