/* eslint-disable react/display-name */
import React from 'react'
import { Redirect } from 'react-router-dom'
import { Home } from '../components/Home'
import { NucleotideExplorer } from '../components/Explorer/Nucleotide'
import { RdrpExplorer } from '../components/Explorer/Rdrp'
import { About } from '../components/About'
import { Team } from '../components/Team'
import { Trees } from '../components/Trees'
import { Jbrowse } from '../components/Jbrowse'
import { Access } from '../components/Access'
import { Geo } from '../components/Geo'
import { Palmid } from '../components/Palmid'

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
    trees: {
        path: '/trees',
        component: Trees,
    },
    jbrowse: {
        path: '/jbrowse',
        component: Jbrowse,
    },
    geo: {
        path: '/geo',
        component: Geo,
    },
    palmid: {
        path: '/palmid',
        component: Palmid,
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
