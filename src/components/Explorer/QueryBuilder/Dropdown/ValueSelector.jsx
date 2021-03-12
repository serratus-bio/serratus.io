import React from 'react';
import AsyncSelect from 'react-select/async';
import { getLoadOptions, getLabel } from './GetValues';


export default function Selector({queryType, queryValue, setQueryValue}) {
    const [selectValue, setSelectValue] = React.useState();

    React.useEffect(() => {
        setSelectValue({
            label: getLabel(queryType, queryValue),
            value: queryValue
        })
    }, [queryType, queryValue])

    function selectOnChange(selected) {
        setSelectValue(selected);
        if (selected.length !== 0) {
            setQueryValue(selected.value);
        }
    }

    function onMenuOpen() {
        setSelectValue(null);
    }

    return (
        <AsyncSelect
            key={JSON.stringify(queryType)} // https://github.com/JedWatson/react-select/issues/1581#issuecomment-408625770
            cacheOptions
            defaultOptions
            value={selectValue}
            loadOptions={getLoadOptions(queryType)}
            onChange={selectOnChange}
            onMenuOpen={onMenuOpen}
            placeholder={`Type to search`} />
    )
}
