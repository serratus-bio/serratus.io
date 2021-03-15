import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_URL;

export const fetchMatchCounts = async (searchLevel, searchLevelValue) => {
    var params = {};
    params[searchLevel] = searchLevelValue;
    const response = await axios.get(`${baseUrl}/counts/nucleotide`, {params: params});
    return response.data;
}

export const fetchValues = async (searchLevel) => {
    const response = await axios.get(`${baseUrl}/list/nucleotide/${searchLevel}`);
    return response.data;
}
