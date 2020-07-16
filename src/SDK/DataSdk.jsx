import axios from 'axios'

export default class TrackSdk {
    async createTrack(options) {
        const response = await axios.post(`http://localhost:3000/musers/1/tracks`, null, options);
        return response.data;
    }
    async getTracks(name = "", skip = 0, take = 100) {
        const response = await axios.get(`http://localhost:3000/tracks?name=${name}&skip=${skip}&take=${take}`);
        return response.data;
    }
    async getSraByName(sraName) {
        const response = await axios.get(`http://serratustest-dev-sumdb.us-east-1.elasticbeanstalk.com/api/runs/get-run/${sraName}`);
        return response.data
    }

    async fetchAccessionJSON(accession) {
        const response = await axios.get(`https://api.serratus.io/api/summary/${accession}`);
        return response.data;
    }

    async getSraHeatMapByName(sraName) {
        const response = await axios.get(`https://api.serratus.io/api/summary/${sraName}/coverage_heatmap.png`, { responseType: 'blob' });
        return response.data;
    }

    async updateTrack(trackId, swipe) {
        const response = await axios.put(`http://10.0.0.157:3000/musers/1/sessions/1/tracks/${trackId}`, { swipe: swipe });
        return response.data;
    }
    async deleteTrack(track) {
        const response = await axios.delete(`http://localhost:3000/tracks/${track.trackId}`);
        return response.data
    }

    async getEsearch(accession) {
        const response = await axios.get(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=sra&term=${accession}&retmax=1&usehistory=y`, { responseType: 'text' });
        return response.data;
    }

    async getEsummary(entrezId) {
        const response = await axios.get(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=sra&id=${entrezId}`, { responseType: 'text' });
        return response.data;
    }

    async getEntrezData(sra_accession) {
        // eSearch
        let response = await this.getEsearch(sra_accession);
        let parser = new DOMParser();
        let esearchResults = parser.parseFromString(response, 'text/xml');
        let entrezId = esearchResults
            .querySelector("eSearchResult")
            .querySelector("IdList")
            .querySelector("Id")
            .textContent;
        // eSummary
        response = await this.getEsummary(entrezId);
        let esummaryResults = parser.parseFromString(response, 'text/xml');
        let expXmlText = esummaryResults
            .querySelector("eSummaryResult")
            .querySelector("DocSum")
            .querySelector("Item") // first Item
            .textContent;
        // eSummary expXml
        expXmlText = '<tag>' + expXmlText + '</tag>';
        let expXml = parser.parseFromString(expXmlText, 'text/xml');
        let entrezStudyName = expXml
            .getRootNode()
            .querySelector('Study')
            .getAttribute('name')
        return entrezStudyName;
    }
}
