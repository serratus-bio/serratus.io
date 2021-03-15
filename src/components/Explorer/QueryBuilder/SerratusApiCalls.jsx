import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_URL;

export const fetchMatchCounts = async (searchType, searchLevel, searchLevelValue) => {
    var params = {};
    params[searchLevel] = searchLevelValue;
    const response = await axios.get(`${baseUrl}/counts/${searchType}`, {params: params});
    return response.data;
}

export const fetchValues = async (searchType, searchLevel) => {
    const response = await axios.get(`${baseUrl}/list/${searchType}/${searchLevel}`);
    return response.data;
}
