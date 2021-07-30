/* eslint-disable react/display-name */
import React from 'react'
import { Redirect } from 'react-router-dom'
import { Home } from '../pages/Home'
import { NucleotideExplorer } from '../components/Explorer/Nucleotide'
import { RdrpExplorer } from '../components/Explorer/Rdrp'
import { About } from '../pages/About'
import { Team } from '../pages/Team'
import { Trees } from '../components/Trees'
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
        path: '/explorer',
        component: NucleotideExplorer,
    },
    rdrpExplorer: {
        path: '/explorer-rdrp',
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
    access: {
        path: '/access',
        component: Access,
    },
    family: {
        path: '/family',
        component: () => <Redirect to='/explorer' />,
    },
    explore: {
        path: '/explore',
        component: () => <Redirect to='/explorer' />,
    },
    query: {
        path: '/query',
        component: () => <Redirect to='/explorer' />,
    },
    nucleotideExplorer2: {
        path: '/explorer-nt',
        component: () => <Redirect to='/explorer' />,
    },
}
