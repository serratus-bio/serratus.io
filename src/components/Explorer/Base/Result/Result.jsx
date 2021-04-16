import React from 'react'
import { MatchingRunsResult } from './MatchingRuns/Result'
import { SequenceMatches } from './SequenceMatches'
import { RunLookupResult } from './RunLookup/Result'

export const Result = ({ searchLevel, searchLevelValue, identityLims, scoreLims }) => {
    if (searchLevel === 'run') {
        return (
            <RunLookupResult
                runId={searchLevelValue}
                identityLims={identityLims}
                scoreLims={scoreLims}
            />
        )
    }
    if (searchLevel === 'sequence') {
        return (
            <SequenceMatches
                sequenceId={searchLevelValue}
                identityLims={identityLims}
                scoreLims={scoreLims}
            />
        )
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
