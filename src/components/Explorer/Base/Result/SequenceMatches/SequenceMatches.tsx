import React from 'react'
import { SequenceMatchesPager } from './SequenceMatchesPager'
import { DownloadButton, getSequenceTitle } from '../ResultHelpers'
import { RangeFilter } from 'components/Explorer/types'
import { BaseContext } from 'components/Explorer/Base/BaseContext'

type Props = {
    sequenceId: string
    identityLims: RangeFilter
    scoreLims: RangeFilter
}

// for run -> family/sequence lookup
export const SequenceMatches = ({ sequenceId, identityLims, scoreLims }: Props) => {
    const context = React.useContext(BaseContext)
    const filters = {
        identityLims: identityLims,
        scoreLims: scoreLims,
    }
    const [pageTitle, setPageTitle] = React.useState('')

    React.useEffect(() => {
        getSequenceTitle(sequenceId).then(setPageTitle)
    }, [sequenceId])

    const LinkButtons = context.result.LinkButtons

    return (
        <>
            <div className='max-w-4xl m-auto'>
                <div>
                    <div className='w-full text-center'>
                        <div>
                            <div className='text-xl font-bold'>{sequenceId}</div>
                            {pageTitle && <div className='text-lg italic'>{pageTitle}</div>}
                        </div>
                    </div>
                    <div className='flex justify-center items-center my-2'>
                        <LinkButtons searchLevel='sequence' searchLevelValue={sequenceId} />
                        <DownloadButton
                            searchLevel='sequence'
                            searchLevelValue={sequenceId}
                            identityLims={identityLims}
                            scoreLims={scoreLims}
                        />
                    </div>
                </div>
                <div className='p-6'>
                    <SequenceMatchesPager sequenceId={sequenceId} filters={filters} />
                </div>
            </div>
        </>
    )
}
