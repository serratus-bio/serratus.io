import React from 'react'
import { FamilyMatchesPager } from './FamilyMatchesPager'
import { FamilySequenceMatchesPager } from './FamilySequenceMatchesPager'
import { getRunTitle } from '../TitleHelpers'
import { DrillDownCallback } from '../MatchChart/types'
import { Filters } from 'components/Explorer/types'
import { BaseContext } from 'components/Explorer/Base/BaseContext'

type Props = {
    runId: string
    filters: Filters
}

export const RunLookup = ({ runId, filters }: Props) => {
    const context = React.useContext(BaseContext)
    const [sequenceResult, setSequenceResult] = React.useState<React.ReactElement>()
    const [pageTitle, setPageTitle] = React.useState('')
    const drillDownCallback: DrillDownCallback = function (familyId) {
        setSequenceResult(
            <div className='max-w-4xl m-auto'>
                <div className='w-full text-center'>
                    <div className='text-xl font-bold'>{familyId}</div>
                </div>
                <div className='p-6'>
                    {/* no filters for drill-down*/}
                    <FamilySequenceMatchesPager runId={runId} familyId={familyId} />
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
                    <FamilyMatchesPager
                        runId={runId}
                        filters={filters}
                        drillDownCallback={drillDownCallback}
                    />
                </div>
            </div>
            <hr className='mb-4' />
            {!sequenceResult ? instructions : sequenceResult}
        </>
    )
}
