import React from 'react';
import Select from 'react-select';
import allFamilyData from '../data/SerratusIO_scoreID.json';
const selectOptions = Object.keys(allFamilyData).map((family) => { return { label: family, value: family } });

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

    return (
        <Select
            options={selectOptions}
            value={selectValue}
            onChange={selectOnChange}
            onMenuOpen={() => setSelectValue({})} />
    )
}

export default SelectFamily;
