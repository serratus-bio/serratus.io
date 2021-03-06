import React from 'react';
import AsyncSelect from 'react-select/async';
import genbankEntries from '../data/cov3ma.genbank.json';


const getLabel = (genbank) => {
    var info = genbankEntries[genbank];
    return `[${genbank}] ${info.title}`;
}

const genbankSelectDomain = Object.keys(genbankEntries).map((genbank) => {
    return { label: getLabel(genbank), value: genbank };
});

const SelectGenbank = (props) => {
    const genbank = props.genbank;
    const setGenbank = props.setGenbank;
    const maxDropdownSize = 200;
    const [selectValue, setSelectValue] = React.useState();

    React.useEffect(() => {
        setSelectValue(genbank && { label: getLabel(genbank), value: genbank })
    }, [genbank])

    const dropdownOnChange = (selected) => {
        setSelectValue(selected);
        if (selected.length !== 0) {
            setGenbank(selected.value);
        }
    }

    const filterGenbank = (inputValue) => {
        return genbankSelectDomain.filter(i =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        ).slice(0, maxDropdownSize);
    };

    const onMenuOpen = () => {
        setSelectValue(null);
    }

    const loadOptions = (inputValue, callback) => {
        callback(filterGenbank(inputValue));
    }

    return (
        <AsyncSelect
            cacheOptions
            defaultOptions
            value={selectValue}
            loadOptions={loadOptions}
            onChange={dropdownOnChange}
            onMenuOpen={onMenuOpen}
            placeholder={`Type to search (first ${maxDropdownSize} options displayed)`} />
    )
}

export default SelectGenbank;
