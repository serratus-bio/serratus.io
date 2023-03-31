import axios from 'axios'
import { ResultPagination } from './types'
import { Filters, RangeFilter } from 'components/Explorer/types'

const baseUrl = process.env.REACT_APP_API_URL

export const getAnalysisIndex = async (run_id: string) => {
    const analysisUrl = `${baseUrl}/index/run=${run_id}`
    const response = await axios.get(analysisUrl)
    return response.data
}

export const getMatchesDownloadUrl = (
    searchType: string,
    searchLevel: string,
    searchLevelValue: string,
    filters: Filters
) => {
    const [identityMin, identityMax] = filters.identityLims
    const [scoreMin, scoreMax] = filters.scoreLims
    const params = {
        scoreMin: scoreMin.toString(),
        scoreMax: scoreMax.toString(),
        identityMin: identityMin.toString(),
        identityMax: identityMax.toString(),
        [searchLevel]: searchLevelValue,
    }
    const urlParams = new URLSearchParams(params)
    return `${baseUrl}/matches/${searchType}/download?${urlParams}`
}

export const fetchPagedMatches = async (
    searchType: string,
    searchLevel: string,
    searchLevelValue: string,
    page: number,
    perPage: number,
    identityRange: RangeFilter,
    scoreRange: RangeFilter
) => {
    const [identityMin, identityMax] = identityRange
    const [scoreMin, scoreMax] = scoreRange
    const params = {
        page: page,
        perPage: perPage,
        scoreMin: scoreMin,
        scoreMax: scoreMax,
        identityMin: identityMin,
        identityMax: identityMax,
        [searchLevel]: searchLevelValue,
    }
    const response = await axios.get(`${baseUrl}/matches/${searchType}/paged`, {
        params: params,
    })
    return response.data
}

export const fetchPagedRunMatches = async (
    searchType: string,
    runId: string,
    page: number,
    perPage: number,
    filters?: Filters,
    familyId?: string,
    familyName?: string
) => {
    let params: any = {
        run: runId,
        page: page,
        perPage: perPage,
    }
    if (filters) {
        const [identityMin, identityMax] = filters.identityLims
        const [scoreMin, scoreMax] = filters.scoreLims
        params = {
            ...params,
            scoreMin: scoreMin,
            scoreMax: scoreMax,
            identityMin: identityMin,
            identityMax: identityMax,
        }
    }
    if (familyName) {
        // sequence-level matches
        params.familyName = familyName
    }
    if (familyId) {
        // sequence-level matches
        params.familyId = familyId
    }
    // else, family-level matches
    const response = await axios.get(`${baseUrl}/matches/${searchType}/run/paged`, {
        params: params,
    })
    return response.data as ResultPagination
}

export const fetchPagedGeoMatches = async (searchType: string, page: number, perPage: number) => {
    const params: any = {
        page: page,
        perPage: perPage,
    }
    const response = await axios.get(`${baseUrl}/geo/${searchType}/paged`, {
        params: params,
    })
    return response.data as ResultPagination
}

export const getPalmprintInfo = async (runId: string) => {
    const palmprintUrl = `${baseUrl}/palmprint/run=${runId}`
    const response = await axios.get(palmprintUrl)
    return response.data
}
