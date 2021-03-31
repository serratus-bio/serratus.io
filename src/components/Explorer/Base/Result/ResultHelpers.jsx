import React from 'react'
import { LinkButton, downloadIcon } from 'common'
import { tryGetGenBankTitle, tryGetSraStudyName } from './EntrezApiCalls'
import { getMatchesDownloadUrl } from './MatchingRuns/SerratusApiCalls'
import { BaseContext } from 'components/Explorer/Base/BaseContext'

export async function getRunTitle(run) {
    return await tryGetSraStudyName(run)
}

export async function getSequenceTitle(sequence) {
    let sequenceCorrected = getSequenceName(sequence)
    if (sequence !== sequenceCorrected) {
        let genbankTitle = await tryGetGenBankTitle(sequenceCorrected)
        return `[AMR] ${genbankTitle}`
    } else {
        return await tryGetGenBankTitle(sequence)
    }
}

export async function getFamilyTitle(family) {
    if (family === 'AMR') {
        return 'The Comprehensive Antibiotic Resistance Database (CARD)'
    }
    return null
}

export function getSequenceName(sequence) {
    let patternForAMR = /.*_\d{7}/g
    let isFromAMR = sequence.match(patternForAMR)
    if (isFromAMR) {
        return sequence.slice(0, sequence.lastIndexOf('_'))
    }
    return sequence
}

export const DownloadButton = ({
    searchLevel,
    searchLevelValue,
    identityLims,
    scoreLims,
}) => {
    const context = React.useContext(BaseContext)
    const downloadUrl = getMatchesDownloadUrl(
        context.searchType,
        searchLevel,
        searchLevelValue,
        identityLims,
        scoreLims
    )
    return (
        <div className="flex justify-center">
            <LinkButton
                link={downloadUrl}
                text="Download Matches"
                icon={downloadIcon}
                download={true}
            />
        </div>
    )
}
