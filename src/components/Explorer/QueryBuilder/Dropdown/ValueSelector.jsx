import React from 'react';
import AsyncSelect from 'react-select/async';
import { getLoadOptions, getLabel } from './GetValues';


export default function ValueSelector({queryType, queryValue, setQueryValue}) {
    const [selected, setSelected] = React.useState();

    React.useEffect(() => {
        setSelected({
            label: getLabel(queryType, queryValue),
            value: queryValue
        })
    }, [queryType, queryValue])

    function selectOnChange(newSelection) {
        setSelected(newSelection);
        if (newSelection.length !== 0) {
            setQueryValue(newSelection.value);
        }
    }

    function onMenuOpen() {
        setSelected(null);
    }

    return (
        <AsyncSelect
            key={JSON.stringify(queryType)} // https://github.com/JedWatson/react-select/issues/1581#issuecomment-408625770
            cacheOptions
            defaultOptions
            value={selected}
            loadOptions={getLoadOptions(queryType)}
            onChange={selectOnChange}
            onMenuOpen={onMenuOpen}
            placeholder={`Type to search`} />
    )
}
