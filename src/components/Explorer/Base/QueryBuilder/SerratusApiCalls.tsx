import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_URL

export async function fetchMatchCounts(
    searchType: string,
    searchLevel: string,
    searchLevelValue: string
) {
    const params: { [key: string]: string } = {}
    params[searchLevel] = searchLevelValue
    const response = await axios.get(`${baseUrl}/counts/${searchType}`, {
        params: params,
    })
    return response.data
}

export type ListResult = { [key: string]: string | undefined }

export async function fetchValues(searchType: string, searchLevel: string) {
    const response = await axios.get(`${baseUrl}/list/${searchType}/${searchLevel}`)
    return response.data as ListResult
}
