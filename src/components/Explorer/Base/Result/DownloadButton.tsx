import React from 'react'
import { LinkButton, downloadIcon } from 'common'
import { BaseContext } from 'components/Explorer/Base/BaseContext'
import { Filters } from 'components/Explorer/types'
import { getMatchesDownloadUrl } from './SerratusApiCalls'

type Props = {
    searchLevel: string
    searchLevelValue: string
    filters: Filters
}

export const DownloadButton = ({ searchLevel, searchLevelValue, filters }: Props) => {
    const context = React.useContext(BaseContext)
    const downloadUrl = getMatchesDownloadUrl(
        context.searchType,
        searchLevel,
        searchLevelValue,
        filters
    )
    return (
        <div className='flex justify-center'>
            <LinkButton
                link={downloadUrl}
                text='Download Matches'
                icon={downloadIcon}
                download={true}
            />
        </div>
    )
}
