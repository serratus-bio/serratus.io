import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_URL;

export const fetchSraRun = async (searchType, runId) => {
    const response = await axios.get(`${baseUrl}/summary/${searchType}/run=${runId}`);
    return response.data;
}
