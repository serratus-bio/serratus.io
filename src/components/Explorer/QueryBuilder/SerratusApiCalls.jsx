import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_URL;

export const fetchMatchCounts = async (type, value) => {
    var params = {};
    params[type] = value;
    const response = await axios.get(`${baseUrl}/counts/nucleotide`, {params: params});
    return response.data;
}

export const fetchValues = async (type) => {
    const response = await axios.get(`${baseUrl}/list/nucleotide/${type}`);
    return response.data;
}
