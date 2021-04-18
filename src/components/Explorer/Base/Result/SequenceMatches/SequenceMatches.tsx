import React from 'react'
import { SequenceMatchesPager } from './SequenceMatchesPager'
import { DownloadButton } from '../DownloadButton'
import { getSequenceTitle } from '../ResultHelpers'
import { Filters } from 'components/Explorer/types'
import { BaseContext } from 'components/Explorer/Base/BaseContext'

type Props = {
    sequenceId: string
    filters: Filters
}

export const SequenceMatches = ({ sequenceId, filters }: Props) => {
    const context = React.useContext(BaseContext)
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
                            filters={filters}
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
