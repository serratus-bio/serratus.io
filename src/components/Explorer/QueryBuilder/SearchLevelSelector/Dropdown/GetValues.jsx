import { fetchValues } from '../../SerratusApiCalls';


export function getLoadOptions(searchType, searchLevel) {
    return getOptionsFromInputCallback(searchType, searchLevel);
}

export function getLabel(searchLevel, searchLevelValue) {
    // TODO: add titles to label
    return searchLevelValue;
}

function getOptionsFromInputCallback(searchType, searchLevel) {
    const allOptions = fetchValues(searchType, searchLevel);
    return function getFamilyOptions(inputValue) {
        return allOptions.then(data => {
            data = listToLabels(data);
            return filterLabelText(data, inputValue);
        });
    }
}

const maxDropdownSize = 200;

function listToLabels(list) {
    return list.map(value => ({ label: value, value: value }));
}

function filterLabelText(domain, searchText) {
    return domain
        .filter(i => i.label.toLowerCase().includes(searchText.toLowerCase()))
        .slice(0, maxDropdownSize);
}
