import React from 'react';
import AsyncSelect from 'react-select/async';
import { fetchValues } from './SerratusApiCalls';

const maxDropdownSize = 200;

const listToLabels = (list) => {
    return list.map((value) => { return { label: value, value: value } });
}

const filterText = (domain, searchText) => {
    return domain.filter(i =>
        i.toLowerCase().includes(searchText.toLowerCase())
    ).slice(0, maxDropdownSize);
};

const loadOptions = (inputValue, callback) => {
    fetchValues('family').then((data) => {
        data = data.sort((a, b) => a.localeCompare(b))
        data = filterText(data, inputValue);
        callback(listToLabels(data));
    });
}

const SelectFamily = (props) => {
    const family = props.family;
    const setFamily = props.setFamily;
    const [selectValue, setSelectValue] = React.useState();

    React.useEffect(() => {
        setSelectValue({ label: family, value: family })
    }, [family])

    var selectOnChange = (selected) => {
        setSelectValue(selected);
        if (selected.length !== 0) {
            setFamily(selected.value);
        }
    }

    const onMenuOpen = () => {
        setSelectValue(null);
    }

    return (
        <AsyncSelect
            cacheOptions
            defaultOptions
            value={selectValue}
            loadOptions={loadOptions}
            onChange={selectOnChange}
            onMenuOpen={onMenuOpen}
            placeholder={`Type to search`} />
    )
}

export default SelectFamily;
