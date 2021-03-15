import React from 'react';
import AsyncSelect from 'react-select/async';
import { getLoadOptions, getLabel } from './GetValues';


export default function ValueSelector({searchLevel, searchLevelValue, setSearchLevelValue}) {
    const [selected, setSelected] = React.useState();

    React.useEffect(() => {
        setSelected({
            label: getLabel(searchLevel, searchLevelValue),
            value: searchLevelValue
        })
    }, [searchLevel, searchLevelValue])

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
            loadOptions={getLoadOptions(searchLevel)}
            onChange={selectOnChange}
            onMenuOpen={onMenuOpen}
            placeholder={`Type to search`} />
    )
}
