import React from 'react';
import MatchingRunsResult from './MatchingRuns/Result';
import RunLookupResult from './RunLookup/Result';

const Result = ({ searchLevel, searchLevelValue, identityLims, scoreLims }) => {
    if (searchLevel === "run") {
        return <>
            <RunLookupResult
                searchLevel={searchLevel}
                searchLevelValue={searchLevelValue}
                identityLims={identityLims}
                scoreLims={scoreLims}
            />
        </>
    }
    return <>
        <MatchingRunsResult
            searchLevel={searchLevel}
            searchLevelValue={searchLevelValue}
            identityLims={identityLims}
            scoreLims={scoreLims}
        />
    </>
}

export default Result;
