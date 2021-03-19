import React from 'react';
import ExplorerBase from '../Base';
import { ThemeContext } from '../Base/ThemeContext';
import { viridisCssGradient } from '../Base/ExplorerHelpers';
import { interpolateViridis } from 'd3';

export default function NucleotideExplorer({location}) {
    const searchType = 'nucleotide';
    const defaultValues = {
        'family': 'Coronaviridae',
        'sequence': 'NC_034446.1',
        'run': '',
    };

    const theme = {
        gradientString: viridisCssGradient,
        d3InterpolateFunction: interpolateViridis,
    }

    return <ThemeContext.Provider value={theme}>
        <ExplorerBase
            searchType={searchType}
            defaultSearchLevelValues={defaultValues}
            identityDomain={[75, 100]}
            scoreDomain={[0, 100]}
            location={location}
        />
    </ThemeContext.Provider>
}
