import React from 'react'
import { FamilyResult } from './FamilyResult'
import { SequenceResult } from './SequenceResult'

// for run -> family/sequence lookup
export const RunLookupResult = ({ runId, identityLims, scoreLims }) => {
    const [sequenceResult, setSequenceResult] = React.useState(null)
    function drilldownCallback(familyId) {
        setSequenceResult(
            <SequenceResult
                runId={runId}
                propFamilyId={familyId}
                identityLims={identityLims}
                scoreLims={scoreLims}
            />
        )
    }

    const instructions = (
        <div className='text-center'>Click a family heatmap to view sequence-level matches</div>
    )

    return (
        <>
            <FamilyResult
                runId={runId}
                identityLims={identityLims}
                scoreLims={scoreLims}
                drilldownCallback={drilldownCallback}
            />
            <hr className='mb-4' />
            {!sequenceResult ? instructions : sequenceResult}
        </>
    )
}
