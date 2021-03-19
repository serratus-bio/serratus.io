import React from 'react';
import ExplorerBase from '../Base';
import { ThemeContext } from '../Base/ThemeContext';
import { infernoCssGradient } from '../Base/ExplorerHelpers';
import { interpolateInferno } from 'd3';

export default function RdrpExplorer({location}) {
    const searchType = 'rdrp';
    const defaultValues = {
        'family': 'Coronaviridae',
        'sequence': 'NC_001653',
        'run': '',
    };

    const theme = {
        gradientString: infernoCssGradient,
        d3InterpolateFunction: interpolateInferno,
    }

    return <ThemeContext.Provider value={theme}>
        <ExplorerBase
            searchType={searchType}
            defaultSearchLevelValues={defaultValues}
            identityDomain={[45, 100]}
            scoreDomain={[0, 100]}
            location={location}
        />
    </ThemeContext.Provider>
}
