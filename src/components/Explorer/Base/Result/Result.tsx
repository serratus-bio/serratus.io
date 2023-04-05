import React from 'react'
import { FamilyMatches } from './FamilyMatches'
import { SequenceMatches } from './SequenceMatches'
import { RunLookup } from './RunLookup'
import { RangeFilter } from 'components/Explorer/types'
import { withTabs } from './withTabs'

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
        return withTabs({
            component: <SequenceMatches sequenceId={searchLevelValue} filters={filters} />,
            searchLevel,
            searchLevelValue,
            filters,
        })
    }
    if (searchLevel === 'family') {
        return withTabs({
            component: <FamilyMatches familyName={searchLevelValue} filters={filters} />,
            searchLevel,
            searchLevelValue,
            filters,
        })
    }
    return null
}
