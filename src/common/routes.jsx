/* eslint-disable react/display-name */
import React from 'react'
import { Redirect } from 'react-router-dom'
import { Home } from '../components/Home'
import { ExplorerIntro } from '../components/Explorer/ExplorerIntro'
import { NucleotideExplorer } from '../components/Explorer/Nucleotide'
import { RdrpExplorer } from '../components/Explorer/Rdrp'
import { ToolIntro } from '../components/ToolIntro'
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
    explorerIntro: {
        path: '/explorer',
        component: ExplorerIntro,
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
    toolkit: {
        path: '/toolkit',
        component: ToolIntro,
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
        component: () => {
            window.location.href = 'https://github.com/ababaian/serratus/wiki/Access-Data-Release'
            return null
        
    },
    explorerRdrpOld: {
        path: '/explorer-rdrp',
        component: ({ location }) => <Redirect to={{ ...location, pathname: '/explorer/rdrp' }} />,
    },
    community: {
        path: '/community',
        component: () => {
            window.location.href = 'https://forms.gle/jq5V5TqvAAT7bfuf9'
            return null
        },
    },
}
