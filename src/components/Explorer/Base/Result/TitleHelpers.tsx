import { tryGetGenBankTitle, tryGetSraStudyName } from './EntrezApiCalls'

export async function getRunTitle(runId: string) {
    return await tryGetSraStudyName(runId)
}

export async function getSequenceTitle(sequenceId: string) {
    const sequenceIdCorrected = getCorrectedSequenceId(sequenceId)
    if (sequenceId !== sequenceIdCorrected) {
        const genbankTitle = await tryGetGenBankTitle(sequenceIdCorrected)
        return `[AMR] ${genbankTitle}`
    } else {
        return await tryGetGenBankTitle(sequenceId)
    }
}

export async function getFamilyTitle(family: string) {
    if (family === 'AMR') {
        return 'The Comprehensive Antibiotic Resistance Database (CARD)'
    }
    return ''
}

function getCorrectedSequenceId(sequenceId: string) {
    const patternForAMR = /.*_\d{7}/g
    const isFromAMR = sequenceId.match(patternForAMR)
    if (isFromAMR) {
        return sequenceId.slice(0, sequenceId.lastIndexOf('_'))
    }
    return sequenceId
}
