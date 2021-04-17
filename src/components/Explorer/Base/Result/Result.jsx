import React from 'react'
import { FamilyMatches } from './FamilyMatches'
import { SequenceMatches } from './SequenceMatches'
import { RunLookup } from './RunLookup'

export const Result = ({ searchLevel, searchLevelValue, identityLims, scoreLims }) => {
    if (searchLevel === 'run') {
        return (
            <RunLookup runId={searchLevelValue} identityLims={identityLims} scoreLims={scoreLims} />
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
    if (searchLevel === 'family') {
        return (
            <FamilyMatches
                familyName={searchLevelValue}
                identityLims={identityLims}
                scoreLims={scoreLims}
            />
        )
    }
    return null
}
