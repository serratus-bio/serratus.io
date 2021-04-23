import axios, { AxiosRequestConfig } from 'axios'
import { parse } from 'fast-xml-parser'

// can't use jsdom due to https://github.com/jsdom/webidl-conversions/issues/37
const fastXmlParserOptions = { attributeNamePrefix: '_', ignoreAttributes: false }

const eUtilsUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils'
const requestConfig: AxiosRequestConfig = { responseType: 'text' }

async function getESearchXmlResponse(db: string, term: string) {
    const urlParams = new URLSearchParams({
        db: db,
        term: term,
        retmax: '1',
        usehistory: 'y',
    })
    const response = await axios.get(`${eUtilsUrl}/esearch.fcgi?${urlParams}`, requestConfig)
    return <string>response.data
}

async function getESummaryXmlResponse(db: string, eSearchId: string) {
    const urlParams = new URLSearchParams({
        db: db,
        id: eSearchId,
    })
    const response = await axios.get(`${eUtilsUrl}/esummary.fcgi?${urlParams}`, requestConfig)
    return <string>response.data
}

export async function tryGetSraStudyName(runId: string) {
    try {
        // eSearch
        const db = 'sra'
        const eSearchXml = await getESearchXmlResponse(db, runId)
        const eSearchObject = parse(eSearchXml, fastXmlParserOptions)
        const eSearchId = eSearchObject?.eSearchResult?.IdList?.Id
        // eSummary
        if (!eSearchId) throw 'Invalid Entrez search.'
        const eSummaryXml = await getESummaryXmlResponse(db, eSearchId)
        const eSummaryObject = parse(eSummaryXml, fastXmlParserOptions)
        const expXmlText = eSummaryObject?.eSummaryResult?.DocSum?.Item[0]?.['#text']
        // eSummary expXml
        if (!expXmlText) throw 'Unable to retrieve ExpXml from Entrez search.'
        const expObject = parse(decode(expXmlText), fastXmlParserOptions)
        const entrezStudyName: string = expObject?.Study?._name
        if (!entrezStudyName) throw 'Unable to retrieve study name from Entrez search.'
        return entrezStudyName || ''
    } catch (err) {
        console.info(err)
        return ''
    }
}

export async function tryGetGenBankTitle(genbankId: string) {
    try {
        // eSearch
        const db = 'nuccore'
        const eSearchXml = await getESearchXmlResponse(db, genbankId)
        const eSearchObject = parse(eSearchXml, fastXmlParserOptions)
        const eSearchId = eSearchObject?.eSearchResult?.IdList?.Id
        // eSummary
        if (!eSearchId) throw 'Invalid Entrez search.'
        const eSummaryXml = await getESummaryXmlResponse(db, eSearchId)
        const eSummaryObject = parse(eSummaryXml, fastXmlParserOptions)
        const title: string = eSummaryObject?.eSummaryResult?.DocSum?.Item?.filter(
            (item: any) => item['_Name'] === 'Title'
        )[0]?.['#text']
        if (!title) throw 'Unable to retrieve title from Entrez search.'
        return title
    } catch (err) {
        console.info(err)
        return ''
    }
}

// from https://stackoverflow.com/a/1248916
function decode(encoded: string) {
    return encoded
        .replace(/&gt;/g, '>')
        .replace(/&lt;/g, '<')
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&amp;/g, '&')
}
