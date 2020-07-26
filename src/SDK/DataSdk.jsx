import axios from 'axios'

export default class DataSdk {
    async fetchSraRun(sraAccession) {
        const response = await axios.get(`https://db.serratus.io/api/runs/get-run/${sraAccession}`);
        return response.data
    }

    async fetchSraHitsByAccession(genbankAccession, page) {
        const response = await axios.get(`https://db.serratus.io/api/runs/get-runs/${genbankAccession}?page=${page}`);
        return response.data;
    }

    async fetchSraHitsByFamily(familyName) {
        const response = await axios.get(`https://db.serratus.io/api/runs/get-runs-by-family/${familyName}`);
        return response.data;
    }

    async getEsearch(db, term) {
        const response = await axios.get(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=${db}&term=${term}&retmax=1&usehistory=y`, { responseType: 'text' });
        return response.data;
    }

    async getEsummary(db, entrezId) {
        const response = await axios.get(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=${db}&id=${entrezId}`, { responseType: 'text' });
        return response.data;
    }

    async tryGetSraStudyName(accession) {
        try {
            // eSearch
            let db = "sra";
            let response = await this.getEsearch(db, accession);
            let parser = new DOMParser();
            let esearchResults = parser.parseFromString(response, 'text/xml');
            let entrezId = esearchResults
                .querySelector("eSearchResult")
                .querySelector("IdList")
                .querySelector("Id")
                .textContent;
            // eSummary
            response = await this.getEsummary(db, entrezId);
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
        catch (err) {
            return;
        }
    }

    async tryGetGenBankTitle(accession) {
        try {
            // eSearch
            let db = "nuccore"
            let response = await this.getEsearch(db, accession);
            let parser = new DOMParser();
            let esearchResults = parser.parseFromString(response, 'text/xml');
            let entrezId = esearchResults
                .querySelector("eSearchResult")
                .querySelector("IdList")
                .querySelector("Id")
                .textContent;
            // eSummary
            response = await this.getEsummary(db, entrezId);
            let esummaryResults = parser.parseFromString(response, 'text/xml');
            let title = esummaryResults
                .querySelector("eSummaryResult")
                .querySelector("DocSum")
                .querySelector("Item[Name=Title]")
                .textContent;
            return title;
        }
        catch (err) {
            return;
        }
    }
}
