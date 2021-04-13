import axios from 'axios'
import { ResultPagination } from './types'
import { Filters } from 'components/Explorer/types'

const baseUrl = process.env.REACT_APP_API_URL

export const fetchPagedRunMatches = async (
    searchType: string,
    runId: string,
    page: number,
    perPage: number,
    filters: Filters,
    family: string | null = null
): Promise<ResultPagination> => {
    const [identityMin, identityMax] = filters.identityLims
    const [scoreMin, scoreMax] = filters.scoreLims
    const params: any = {
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
    return response.data as ResultPagination
}
