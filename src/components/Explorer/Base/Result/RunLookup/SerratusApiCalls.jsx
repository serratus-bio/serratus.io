import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_URL

export const fetchPagedRunMatches = async (searchType, runId, page, perPage, family = null) => {
    var params = {
        run: runId,
        page: page,
        perPage: perPage,
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
