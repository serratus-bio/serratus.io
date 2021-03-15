import React from 'react';
import ExplorerBase from '../Base';

export default function RdrpExplorer({location}) {
    const searchType = 'rdrp';
    const defaultValues = {
        'phylum': 'Pisuviricota',
        'family': 'Coronaviridae',
        'sequence': 'NC_001653',
        'run': '',
    };

    return <>
        <ExplorerBase
            searchType={searchType}
            defaultSearchLevelValues={defaultValues}
            location={location}
        />
    </>
}
