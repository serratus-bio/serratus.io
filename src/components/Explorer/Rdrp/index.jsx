import React from 'react';
import ExplorerBase from '../Base';
import { BaseContext } from '../Base/BaseContext';
import { infernoCssGradient } from '../Base/ExplorerHelpers';
import { interpolateInferno, interpolateYlOrRd } from 'd3';

export default function RdrpExplorer({location}) {
    const context = {
        searchType: 'rdrp',
        defaultSearchLevelValues: {
            'family': 'Coronaviridae',
            'sequence': 'NC_001653',
            'run': '',
        },
        theme: {
            gradientString: infernoCssGradient,
            d3InterpolateFunction: interpolateInferno,
        },
        domain: {
            identity: [45, 100],
            score: [0, 100],
        },
        result: {
            theme: {
                d3InterpolateFunction: interpolateYlOrRd,
            },
        },
    };

    return <BaseContext.Provider value={context}>
        <ExplorerBase location={location} />
    </BaseContext.Provider>
}
