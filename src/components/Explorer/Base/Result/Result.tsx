import React from 'react'
import { FamilyMatches } from './FamilyMatches'
import { SequenceMatches } from './SequenceMatches'
import { RunLookup } from './RunLookup'
import { RangeFilter } from 'components/Explorer/types'

type Props = {
    searchLevel: string
    searchLevelValue: string
    identityLims: RangeFilter
    scoreLims: RangeFilter
}

export const Result = ({ searchLevel, searchLevelValue, identityLims, scoreLims }: Props) => {
    const filters = {
        identityLims: identityLims,
        scoreLims: scoreLims,
    }
    if (searchLevel === 'run') {
        return <RunLookup runId={searchLevelValue} filters={filters} />
    }
    if (searchLevel === 'sequence') {
        return <SequenceMatches sequenceId={searchLevelValue} filters={filters} />
    }
    if (searchLevel === 'family') {
        return <FamilyMatches familyName={searchLevelValue} filters={filters} />
    }
    return null
}
