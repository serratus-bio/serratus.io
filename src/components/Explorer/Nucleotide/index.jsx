import React from 'react';
import ExplorerBase from '../Base';

export default function NucleotideExplorer({location}) {
    const searchType = 'nucleotide';
    const defaultValues = {
        'family': 'Coronaviridae',
        'genbank': 'NC_034446.1',
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
