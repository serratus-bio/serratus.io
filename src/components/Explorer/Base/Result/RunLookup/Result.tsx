import React from 'react'
import { FamilyResult } from './FamilyResult'
import { SequenceResult } from './SequenceResult'
import { getRunTitle } from '../ResultHelpers'
import { DrilldownCallback } from '../Chart/types'
import { RangeFilter } from 'components/Explorer/types'
import { BaseContext } from 'components/Explorer/Base/BaseContext'

type Props = {
    runId: string
    identityLims: RangeFilter
    scoreLims: RangeFilter
}

// for run -> family/sequence lookup
export const RunLookupResult = ({ runId, identityLims, scoreLims }: Props) => {
    const context = React.useContext(BaseContext)
    const filters = {
        identityLims: identityLims,
        scoreLims: scoreLims,
    }
    const [sequenceResult, setSequenceResult] = React.useState<React.ReactElement>()
    const [pageTitle, setPageTitle] = React.useState()
    let drilldownCallback: DrilldownCallback = function (familyId) {
        setSequenceResult(
            <div className='max-w-4xl m-auto'>
                <div className='w-full text-center'>
                    <div className='text-xl font-bold'>{familyId}</div>
                </div>
                <div className='p-6'>
                    {/* no filters for drilldown*/}
                    <SequenceResult runId={runId} familyId={familyId} />
                </div>
            </div>
        )
    }

    React.useEffect(() => {
        if (!runId) return
        getRunTitle(runId).then(setPageTitle)
    }, [runId])

    const LinkButtons = context.result.LinkButtons

    const instructions = (
        <div className='text-center'>Click a family heatmap to view sequence-level matches</div>
    )

    return (
        <>
            <div className='max-w-4xl m-auto'>
                <div>
                    <div className='w-full text-center'>
                        <div>
                            <div className='text-xl font-bold'>{runId}</div>
                            {pageTitle && <div className='text-lg italic'>{pageTitle}</div>}
                        </div>
                    </div>
                    <div className='flex justify-center items-center my-2'>
                        <LinkButtons searchLevel='run' searchLevelValue={runId} />
                    </div>
                </div>
                <div className='p-6'>
                    <FamilyResult
                        runId={runId}
                        filters={filters}
                        drilldownCallback={drilldownCallback}
                    />
                </div>
            </div>
            <hr className='mb-4' />
            {!sequenceResult ? instructions : sequenceResult}
        </>
    )
}
