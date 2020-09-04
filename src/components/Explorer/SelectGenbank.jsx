import React from 'react';
import AsyncSelect from 'react-select/async';
import genbankAccessions from './data/cov3ma.genbank.json';
// TODO: make data with genbank titles

const genbankSelectDomain = genbankAccessions.map((genbank) => { return { label: genbank, value: genbank } });

export default (props) => {
    const genbank = props.genbank;
    const setGenbank = props.setGenbank;
    const maxDropdownSize = 200;
    const [selectValue, setSelectValue] = React.useState();

    React.useEffect(() => {
        setSelectValue(genbank && { label: genbank, value: genbank })
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

    const loadOptions = (inputValue, callback) => {
        callback(filterGenbank(inputValue));
    }

    return (
        <AsyncSelect
            cacheOptions
            value={selectValue}
            loadOptions={loadOptions}
            onChange={dropdownOnChange}
            placeholder="Type to search" />
    )
}