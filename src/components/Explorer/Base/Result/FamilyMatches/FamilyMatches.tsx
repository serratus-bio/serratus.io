import React from 'react'
import { FamilyMatchesPager } from './FamilyMatchesPager'
import { SequenceMatchesPager } from './SequenceMatchesPager'
import { DownloadButton, getFamilyTitle } from '../ResultHelpers'
import { DrilldownCallback } from '../Chart/types'
import { RangeFilter } from 'components/Explorer/types'
import { BaseContext } from 'components/Explorer/Base/BaseContext'

type Props = {
    familyName: string
    identityLims: RangeFilter
    scoreLims: RangeFilter
}

// for run -> family/sequence lookup
export const FamilyMatches = ({ familyName, identityLims, scoreLims }: Props) => {
    const context = React.useContext(BaseContext)
    const filters = {
        identityLims: identityLims,
        scoreLims: scoreLims,
    }
    const [sequenceResult, setSequenceResult] = React.useState<React.ReactElement>()
    const [pageTitle, setPageTitle] = React.useState('')
    let drilldownCallback: DrilldownCallback = function (runId) {
        setSequenceResult(
            <div className='max-w-4xl m-auto'>
                <div className='w-full text-center'>
                    <div className='text-xl font-bold'>{runId}</div>
                </div>
                <div className='p-6'>
                    {/* no filters for drilldown*/}
                    <SequenceMatchesPager familyName={familyName} runId={runId} />
                </div>
            </div>
        )
    }

    React.useEffect(() => {
        if (!familyName) return
        getFamilyTitle(familyName).then(setPageTitle)
    }, [familyName])

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
                            <div className='text-xl font-bold'>{familyName}</div>
                            {pageTitle && <div className='text-lg italic'>{pageTitle}</div>}
                        </div>
                    </div>
                    <div className='flex justify-center items-center my-2'>
                        <LinkButtons searchLevel='family' searchLevelValue={familyName} />
                        <DownloadButton
                            searchLevel='family'
                            searchLevelValue={familyName}
                            identityLims={identityLims}
                            scoreLims={scoreLims}
                        />
                    </div>
                </div>
                <div className='p-6'>
                    <FamilyMatchesPager
                        familyId={familyName}
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
