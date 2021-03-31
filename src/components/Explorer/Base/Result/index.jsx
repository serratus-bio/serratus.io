import React from 'react'
import { MatchingRunsResult } from './MatchingRuns/Result'
import { RunLookupResult } from './RunLookup/Result'

export const Result = ({ searchLevel, searchLevelValue, identityLims, scoreLims }) => {
    if (searchLevel === 'run') {
        return <RunLookupResult runId={searchLevelValue} />
    }
    return (
        <MatchingRunsResult
            searchLevel={searchLevel}
            searchLevelValue={searchLevelValue}
            identityLims={identityLims}
            scoreLims={scoreLims}
        />
    )
}
