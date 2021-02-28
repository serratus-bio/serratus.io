import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_URL;

export const fetchSraRun = async (runId) => {
    const response = await axios.get(`${baseUrl}/summary/nucleotide/run=${runId}`);
    return response.data;
}

export const fetchPagedMatchesByGenbank = async (genbankId, page, perPage, identityRange, scoreRange) => {
    var [identityMin, identityMax] = identityRange;
    var [scoreMin, scoreMax] = scoreRange;
    var params = {
        genbank: genbankId,
        page: page,
        perPage: perPage,
        scoreMin: scoreMin,
        scoreMax: scoreMax,
        identityMin: identityMin,
        identityMax: identityMax
    }
    const response = await axios.get(`${baseUrl}/matches/nucleotide/paged`, {params: params});
    return response.data;
}

export const fetchPagedMatchesByFamily = async (familyName, page, perPage, identityRange, scoreRange) => {
    var [identityMin, identityMax] = identityRange;
    var [scoreMin, scoreMax] = scoreRange;
    var params = {
        family: familyName,
        page: page,
        perPage: perPage,
        scoreMin: scoreMin,
        scoreMax: scoreMax,
        identityMin: identityMin,
        identityMax: identityMax
    }
    const response = await axios.get(`${baseUrl}/matches/nucleotide/paged`, {params: params});
    return response.data;
}
