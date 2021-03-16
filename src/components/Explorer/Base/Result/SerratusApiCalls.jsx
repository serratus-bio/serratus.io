import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_URL;

export const fetchSraRun = async (runId) => {
    const response = await axios.get(`${baseUrl}/summary/nucleotide/run=${runId}`);
    return response.data;
}

export const getMatchesDownloadUrl = (searchLevel, searchLevelValue, identityLims, scoreLims) => {
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
    return `${baseUrl}/matches/nucleotide?${urlParams}`;
}

export const fetchPagedMatches = async (searchLevel, searchLevelValue, page, perPage, identityRange, scoreRange) => {
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
    const response = await axios.get(`${baseUrl}/matches/nucleotide/paged`, {params: params});
    return response.data;
}
