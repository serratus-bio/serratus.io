import { fetchValues, ListResult } from '../../SerratusApiCalls'

export type Selection = {
    label: string
    value: string
}

export function getLoadOptions(searchType: string, searchLevel: string) {
    return getOptionsFromInputCallback(searchType, searchLevel)
}

export async function getSelectedObject(
    searchType: string,
    searchLevel: string,
    searchLevelValue: string
) {
    // data from API has {id: name/null}
    const dict = await getOptionsPromise(searchType, searchLevel)
    return getSelectionObject(searchLevelValue, dict[searchLevelValue])
}

function getOptionsFromInputCallback(searchType: string, searchLevel: string) {
    return function getFilteredOptions(inputValue: string) {
        return getOptionsPromise(searchType, searchLevel).then((data) => {
            const options = dictToSelectionObjects(data)
            return filterLabelText(options, inputValue)
        })
    }
}

function dictToSelectionObjects(dict: ListResult) {
    return Object.keys(dict).map((key) => getSelectionObject(key, dict[key]))
}

function getSelectionObject(id: string, name?: string): Selection {
    return {
        label: name ? `[${id}] ${name}` : id,
        value: id,
    }
}

const maxDropdownSize = 200

function filterLabelText(domain: Selection[], searchText: string) {
    return domain
        .filter((i) => i.label.toLowerCase().includes(searchText.toLowerCase()))
        .slice(0, maxDropdownSize)
}

// use cache for reducing API calls
const mapPromisesCache: { [key: string]: { [key: string]: Promise<ListResult> } } = {}
function getOptionsPromise(searchType: string, searchLevel: string) {
    if (!(searchType in mapPromisesCache)) {
        mapPromisesCache[searchType] = {}
    }
    if (!(searchLevel in mapPromisesCache[searchType])) {
        mapPromisesCache[searchType][searchLevel] = fetchValues(searchType, searchLevel)
    }
    return mapPromisesCache[searchType][searchLevel]
}
