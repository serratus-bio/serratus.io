import axios from 'axios'
import { constructRangeStr } from './ExplorerHelpers';

const baseUrl = process.env.REACT_APP_API_URL;
const eutilsUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils';

export const fetchSraRun = async (sraAccession) => {
    const response = await axios.get(`${baseUrl}/api/run/get-run/${sraAccession}`);
    return response.data
}

export const fetchSraMatchesByAccession = async (genbankAccession, pageNumber, itemsPerPage, identityRange, coverageRange) => {
    var identity = constructRangeStr(...identityRange);
    var coverage = constructRangeStr(...coverageRange);
    const response = await axios.get(`${baseUrl}/api/genbank/get-runs/${genbankAccession}?page=${pageNumber}&itemsPerPage=${itemsPerPage}&pctId=${identity}&cvgPct=${coverage}`);
    return response.data;
}

export const fetchSraMatchesByFamily = async (familyName, pageNumber, itemsPerPage, identityRange, coverageRange) => {
    var identity = constructRangeStr(...identityRange);
    var coverage = constructRangeStr(...coverageRange);
    const response = await axios.get(`${baseUrl}/api/family/get-runs/${familyName}?page=${pageNumber}&itemsPerPage=${itemsPerPage}&pctId=${identity}&score=${coverage}`);
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