import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_URL;
const eutilsUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils';

export const fetchSraRun = async (runId) => {
    const response = await axios.get(`${baseUrl}/summary/nucleotide/run=${runId}`);
    return response.data
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

export const getEsearch = async (db, term) => {
    const response = await axios.get(`${eutilsUrl}/esearch.fcgi?db=${db}&term=${term}&retmax=1&usehistory=y`, { responseType: 'text' });
    return response.data;
}

export const getEsummary = async (db, entrezId) => {
    const response = await axios.get(`${eutilsUrl}/esummary.fcgi?db=${db}&id=${entrezId}`, { responseType: 'text' });
    return response.data;
}

export const tryGetSraStudyName = async (accession) => {
    try {
        // eSearch
        let db = "sra";
        let response = await getEsearch(db, accession);
        let parser = new DOMParser();
        let esearchResults = parser.parseFromString(response, 'text/xml');
        let entrezId = esearchResults
            .querySelector("eSearchResult")
            .querySelector("IdList")
            .querySelector("Id")
            .textContent;
        // eSummary
        response = await getEsummary(db, entrezId);
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

export const tryGetGenBankTitle = async (accession) => {
    try {
        // eSearch
        let db = "nuccore"
        let response = await getEsearch(db, accession);
        let parser = new DOMParser();
        let esearchResults = parser.parseFromString(response, 'text/xml');
        let entrezId = esearchResults
            .querySelector("eSearchResult")
            .querySelector("IdList")
            .querySelector("Id")
            .textContent;
        // eSummary
        response = await getEsummary(db, entrezId);
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