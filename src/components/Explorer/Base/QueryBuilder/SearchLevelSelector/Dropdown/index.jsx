import React from 'react';
import AsyncSelect from 'react-select/async';
import { getLoadOptions, getSelectedObject } from './GetValues';


export default function Dropdown({
        searchType, searchLevel,
        searchLevelValue, setSearchLevelValue}) {
    const [selected, setSelected] = React.useState();

    React.useEffect(() => {
        async function setSelectionAsync() {
            setSelected(await getSelectedObject(searchType, searchLevel, searchLevelValue));
        }
        setSelectionAsync();
    }, [searchType, searchLevel, searchLevelValue])

    function selectOnChange(newSelection) {
        setSelected(newSelection);
        if (newSelection.length !== 0) {
            setSearchLevelValue(newSelection.value);
        }
    }

    function onMenuOpen() {
        setSelected(null);
    }

    return (
        <AsyncSelect
            key={JSON.stringify(searchLevel)} // https://github.com/JedWatson/react-select/issues/1581#issuecomment-408625770
            cacheOptions
            defaultOptions
            value={selected}
            loadOptions={getLoadOptions(searchType, searchLevel)}
            onChange={selectOnChange}
            onMenuOpen={onMenuOpen}
            placeholder={`Type to search`} />
    )
}
