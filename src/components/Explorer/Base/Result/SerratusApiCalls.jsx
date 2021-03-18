import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_URL;

export const fetchSraRun = async (searchType, runId) => {
    const response = await axios.get(`${baseUrl}/summary/${searchType}/run=${runId}`);
    return response.data;
}

export const getMatchesDownloadUrl = (searchType, searchLevel, searchLevelValue, identityLims, scoreLims) => {
    var [identityMin, identityMax] = identityLims;
    var [scoreMin, scoreMax] = scoreLims;
    var params = {
        scoreMin: scoreMin,
        scoreMax: scoreMax,
        identityMin: identityMin,
        identityMax: identityMax
    };
    params[searchLevel] = searchLevelValue;
    const urlParams = new URLSearchParams(params);
    return `${baseUrl}/matches/${searchType}?${urlParams}`;
}

export const fetchPagedMatches = async (searchType, searchLevel, searchLevelValue, page, perPage, identityRange, scoreRange) => {
    var [identityMin, identityMax] = identityRange;
    var [scoreMin, scoreMax] = scoreRange;
    var params = {
        page: page,
        perPage: perPage,
        scoreMin: scoreMin,
        scoreMax: scoreMax,
        identityMin: identityMin,
        identityMax: identityMax
    };
    params[searchLevel] = searchLevelValue;
    const response = await axios.get(`${baseUrl}/matches/${searchType}/paged`, {params: params});
    return response.data;
}
