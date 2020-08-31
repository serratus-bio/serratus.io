import React from 'react';
import Select from 'react-select';
import allFamilyData from '../../data/SerratusIO_scoreID.json';
const selectOptions = Object.keys(allFamilyData).map((family) => { return { label: family, value: family } });

export default (props) => {
    const [selectValue, setSelectValue] = React.useState(props.family && { label: props.family, value: props.family });

    var selectOnChange = (selected) => {
        setSelectValue(selected);
        if (selected.length !== 0) {
            props.setFamily(selected.value);
        }
    }

    return (
        <Select
            options={selectOptions}
            value={selectValue}
            onChange={selectOnChange}
            onMenuOpen={() => setSelectValue({})}
            placeholder="Search for family" />
    )
}