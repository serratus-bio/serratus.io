import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_URL

export const fetchPagedRunMatches = async (
    searchType,
    runId,
    page,
    perPage,
    identityLims,
    scoreLims,
    family = null
) => {
    const [identityMin, identityMax] = identityLims
    const [scoreMin, scoreMax] = scoreLims
    const params = {
        run: runId,
        page: page,
        perPage: perPage,
        scoreMin: scoreMin,
        scoreMax: scoreMax,
        identityMin: identityMin,
        identityMax: identityMax,
    }
    if (family) {
        // sequence-level matches
        params.family = family
    }
    // else, family-level matches
    const response = await axios.get(`${baseUrl}/matches/${searchType}/run/paged`, {
        params: params,
    })
    return response.data
}
