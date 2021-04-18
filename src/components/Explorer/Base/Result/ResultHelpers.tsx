import { tryGetGenBankTitle, tryGetSraStudyName } from './EntrezApiCalls'

export async function getRunTitle(run: string) {
    return await tryGetSraStudyName(run)
}

export async function getSequenceTitle(sequence: string) {
    let sequenceCorrected = getSequenceName(sequence)
    if (sequence !== sequenceCorrected) {
        let genbankTitle = await tryGetGenBankTitle(sequenceCorrected)
        return `[AMR] ${genbankTitle}`
    } else {
        return await tryGetGenBankTitle(sequence)
    }
}

export async function getFamilyTitle(family: string) {
    if (family === 'AMR') {
        return 'The Comprehensive Antibiotic Resistance Database (CARD)'
    }
    return ''
}

export function getSequenceName(sequence: string) {
    let patternForAMR = /.*_\d{7}/g
    let isFromAMR = sequence.match(patternForAMR)
    if (isFromAMR) {
        return sequence.slice(0, sequence.lastIndexOf('_'))
    }
    return sequence
}
