import React from 'react'
import { ExplorerBase } from '../Base'
import { BaseContext } from '../Base/BaseContext'
import { infernoCssGradient } from '../Base/ExplorerHelpers'
import { interpolateInferno, interpolateYlOrRd } from 'd3'
import { Intro } from './Intro'
import { LinkButtons } from './LinkButtons'

export const RdrpExplorer = ({ location }) => {
    const context = {
        searchType: 'rdrp',
        defaultSearchLevelValues: {
            family: 'Coronaviridae',
            sequence: 'NC_001653',
            run: '',
        },
        theme: {
            gradientString: infernoCssGradient,
            d3InterpolateFunction: interpolateInferno,
        },
        intro: Intro,
        domain: {
            identity: [45, 100],
            score: [0, 100],
        },
        defaultFilterRanges: {
            identity: [45, 100],
            score: [50, 100],
        },
        result: {
            addJbrowseLinks: false,
            colMap: {
                score: {
                    name: 'Score',
                    desc: 'Assembly-prediction score',
                    valueSuffix: '',
                    size: 50,
                    domain: [0, 100],
                    fill: '#67c286',
                },
                percent_identity: {
                    name: 'Identity',
                    desc: 'Alignment identity (aa)',
                    size: 70,
                    valueSuffix: '%',
                    domain: [45, 100],
                    fill: '#fdb53c',
                },
                n_reads: {
                    name: 'Reads',
                    desc: 'Number of alignments',
                    size: 70,
                    valueSuffix: '',
                    domain: [0, 1000],
                    fill: '#658fc4',
                },
            },
            LinkButtons: LinkButtons,
            theme: {
                d3InterpolateFunction: interpolateYlOrRd,
            },
        },
    }

    return (
        <BaseContext.Provider value={context}>
            <ExplorerBase location={location} />
        </BaseContext.Provider>
    )
}
