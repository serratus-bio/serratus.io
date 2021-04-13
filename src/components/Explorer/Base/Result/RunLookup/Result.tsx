import React from 'react'
import { FamilyResult } from './FamilyResult'
import { SequenceResult } from './SequenceResult'
import { RangeFilter } from 'components/Explorer/types'

type Props = {
    runId: string
    identityLims: RangeFilter
    scoreLims: RangeFilter
}

// for run -> family/sequence lookup
export const RunLookupResult = ({ runId, identityLims, scoreLims }: Props) => {
    const filters = {
        identityLims: identityLims,
        scoreLims: scoreLims,
    }
    const [sequenceResult, setSequenceResult] = React.useState<React.ReactElement>()
    function drilldownCallback(familyId: string) {
        setSequenceResult(
            <SequenceResult runId={runId} propFamilyId={familyId} filters={filters} />
        )
    }

    const instructions = (
        <div className='text-center'>Click a family heatmap to view sequence-level matches</div>
    )

    return (
        <>
            <FamilyResult runId={runId} filters={filters} drilldownCallback={drilldownCallback} />
            <hr className='mb-4' />
            {!sequenceResult ? instructions : sequenceResult}
        </>
    )
}
