import { fetchValues } from '../../SerratusApiCalls';


export function getLoadOptions(searchType, searchLevel) {
    return getOptionsFromInputCallback(searchType, searchLevel);
}

export async function getSelectedObject(searchType, searchLevel, searchLevelValue) {
    // data from API has {id: name/null}
    const dict = await getOptionsPromise(searchType, searchLevel);
    return getSelectionObject(searchLevelValue, dict[searchLevelValue]);
}

function getOptionsFromInputCallback(searchType, searchLevel) {
    return function getFilteredOptions(inputValue) {
        return getOptionsPromise(searchType, searchLevel).then(data => {
            const options = dictToSelectionObjects(data);
            return filterLabelText(options, inputValue);
        });
    }
}

function dictToSelectionObjects(dict) {
    return Object.keys(dict).map(key => getSelectionObject(key, dict[key]));
}

function getSelectionObject(id, name = null) {
    return {
        label: name ? `[${id}] ${name}` : id,
        value: id,
    };
}

const maxDropdownSize = 200;

function filterLabelText(domain, searchText) {
    return domain
        .filter(i => i.label.toLowerCase().includes(searchText.toLowerCase()))
        .slice(0, maxDropdownSize);
}

// use cache for reducing API calls
const mapPromisesCache = {}
function getOptionsPromise(searchType, searchLevel) {
    if (!(searchType in mapPromisesCache)) {
        mapPromisesCache[searchType] = {}
    }
    if (!(searchLevel in mapPromisesCache[searchType])) {
        mapPromisesCache[searchType][searchLevel] = fetchValues(searchType, searchLevel);
    }
    return mapPromisesCache[searchType][searchLevel];
}
