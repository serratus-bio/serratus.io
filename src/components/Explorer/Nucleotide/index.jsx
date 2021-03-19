import React from 'react';
import ExplorerBase from '../Base';
import { BaseContext } from '../Base/BaseContext';
import { viridisCssGradient } from '../Base/ExplorerHelpers';
import { interpolateViridis, interpolateYlGnBu } from 'd3';

export default function NucleotideExplorer({location}) {
    const context = {
        searchType: 'nucleotide',
        defaultSearchLevelValues: {
            'family': 'Coronaviridae',
            'sequence': 'NC_034446.1',
            'run': '',
        },
        theme: {
            gradientString: viridisCssGradient,
            d3InterpolateFunction: interpolateViridis,
        },
        domain: {
            identity: [75, 100],
            score: [0, 100],
        },
        result: {
            theme: {
                d3InterpolateFunction: interpolateYlGnBu,
            },
        },
    };

    return <BaseContext.Provider value={context}>
        <ExplorerBase location={location} />
    </BaseContext.Provider>
}
