import axios from 'axios'

export default class TrackSdk {
    async createTrack(options) {
        const response =  await axios.post(`http://localhost:3000/musers/1/tracks`, null, options);
        return response.data;
    }
    async getTracks(name = "", skip = 0, take = 100) {
        const response = await axios.get(`http://localhost:3000/tracks?name=${name}&skip=${skip}&take=${take}`);
        return response.data;
    }
    async getSraByName(sraName) {
        const response = await axios.get(`https://localhost:44363/api/runs/get-run/${sraName}`);
        return response.data
    }

    async getSraHeatMapByName(sraName) {
        const response = await axios.get(`http://api.serratus.io/api/summary/${sraName}/coverage_heatmap.png`, { responseType: 'blob' });
            return response.data;
    }

    async updateTrack(trackId, swipe) {
        const response = await axios.put(`http://10.0.0.157:3000/musers/1/sessions/1/tracks/${trackId}`, {swipe: swipe});
        return response.data;
    }
    async deleteTrack(track) {
        const response = await axios.delete(`http://localhost:3000/tracks/${track.trackId}`);
        return response.data
    }
}
