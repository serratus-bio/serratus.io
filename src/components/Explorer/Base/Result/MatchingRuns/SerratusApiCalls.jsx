import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_URL

export const getAnalysisIndexUrl = (run_id) => {
    const params = {
        run_id: run_id,
    }
    params[run_id] = run_id
    return `${baseUrl}/index/run=${run_id}`
}

export const getAnalysisMicro = async (run_id) => {
    const AnalysisUrl = getAnalysisIndexUrl(run_id)
    const response = await axios.get({ AnalysisUrl })
    return response
}

//export const getAnalysisMicro2 = async (run_id) => {
//    const AnalysisUrl = getAnalysisIndexUrl(run_id)
//    const response = await axios.get(AnalysisUrl)
//    console.log(response)
//    return response
//}

export const getMatchesDownloadUrl = (
    searchType,
    searchLevel,
    searchLevelValue,
    identityLims,
    scoreLims
) => {
    const [identityMin, identityMax] = identityLims
    const [scoreMin, scoreMax] = scoreLims
    const params = {
        scoreMin: scoreMin,
        scoreMax: scoreMax,
        identityMin: identityMin,
        identityMax: identityMax,
    }
    params[searchLevel] = searchLevelValue
    const urlParams = new URLSearchParams(params)
    return `${baseUrl}/matches/${searchType}?${urlParams}`
}

export const fetchPagedMatches = async (
    searchType,
    searchLevel,
    searchLevelValue,
    page,
    perPage,
    identityRange,
    scoreRange
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
    }
    params[searchLevel] = searchLevelValue
    const response = await axios.get(`${baseUrl}/matches/${searchType}/paged`, {
        params: params,
    })
    return response.data
}
