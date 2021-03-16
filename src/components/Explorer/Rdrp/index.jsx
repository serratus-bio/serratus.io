import React from 'react';
import ExplorerBase from '../Base';

export default function RdrpExplorer({location}) {
    const searchType = 'rdrp';
    const defaultValues = {
        'family': 'Coronaviridae',
        'sequence': 'NC_001653',
        'run': '',
    };

    return <>
        <ExplorerBase
            searchType={searchType}
            defaultSearchLevelValues={defaultValues}
            identityDomain={[45, 100]}
            scoreDomain={[0, 100]}
            location={location}
        />
    </>
}
