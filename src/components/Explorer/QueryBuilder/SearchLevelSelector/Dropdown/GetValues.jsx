import { fetchValues } from '../../SerratusApiCalls';
import genbankEntries from '../../../data/cov3ma.genbank.json';


export function getLoadOptions(searchLevel) {
    if (searchLevel === 'family') return getFamilyOptions;
    if (searchLevel === 'genbank') return getGenbankOptions;
}

export function getLabel(searchLevel, searchLevelValue) {
    if (searchLevel === 'family') {
        return searchLevelValue;
    }
    if (searchLevel === 'genbank') {
        var info = genbankEntries[searchLevelValue];
        return `[${searchLevelValue}] ${info.title}`;
    }
}

function getFamilyOptions(inputValue) {
    return familyDomainPromise.then(data => {
        data = listToLabels(data);
        return filterLabelText(data, inputValue);
    });
}

function getGenbankOptions(inputValue, callback) {
    return callback(filterLabelText(genbankDomain, inputValue));
}

const maxDropdownSize = 200;
const familyDomainPromise = fetchValues('nucleotide', 'family');
const genbankDomain = Object.keys(genbankEntries).map(genbank => {
    const info = genbankEntries[genbank];
    return { label: `[${genbank}] ${info.title}`, value: genbank };
})

function listToLabels(list) {
    return list.map((value) => { return { label: value, value: value } });
}

function filterLabelText(domain, searchText) {
    return domain
        .filter(i => i.label.toLowerCase().includes(searchText.toLowerCase()))
        .slice(0, maxDropdownSize);
}
