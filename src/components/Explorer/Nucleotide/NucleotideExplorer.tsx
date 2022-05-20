import React from 'react'
import { ExplorerBase } from '../Base'
import { BaseContext, BaseContextType } from '../Base/BaseContext'
import { viridisCssGradient } from '../Base/ExplorerHelpers'
import { interpolateViridis, interpolateYlGnBu } from 'd3'
import { Intro } from './Intro'
import { LinkButtons } from './LinkButtons'

type Props = {
    location: Location
}

export const NucleotideExplorer = ({ location }: Props) => {
    const context: BaseContextType = {
        searchType: 'nucleotide',
        defaultSearchLevelValues: {
            family: 'Coronaviridae',
            sequence: 'NC_034446.1',
            run: '',
        },
        theme: {
            gradientString: viridisCssGradient,
            d3InterpolateFunction: interpolateViridis,
        },
        intro: Intro,
        domain: {
            identity: [75, 100],
            score: [0, 100],
        },
        defaultFilterRangesBySearchLevel: {
            family: {
                identity: [75, 100],
                score: [50, 100],
            },
            sequence: {
                identity: [75, 100],
                score: [50, 100],
            },
            run: {
                identity: [75, 100],
                score: [0, 100],
            },
        },
        result: {
            addJbrowseLinks: true,
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
                    desc: 'Average read-alignment identity (nt)',
                    size: 70,
                    valueSuffix: '%',
                    domain: [75, 100],
                    fill: '#fdb53c',
                },
                n_reads: {
                    name: 'Reads',
                    desc: 'Number of aligned reads (bowtie2)',
                    size: 70,
                    valueSuffix: '',
                    domain: [0, 1000],
                    fill: '#658fc4',
                },
            },
            LinkButtons: LinkButtons,
            theme: {
                d3InterpolateFunction: interpolateYlGnBu,
            },
        },
    }

    return (
        <BaseContext.Provider value={context}>
            <ExplorerBase location={location} />
        </BaseContext.Provider>
    )
}
