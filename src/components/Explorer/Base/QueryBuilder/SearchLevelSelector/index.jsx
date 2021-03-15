import React from 'react';
import Dropdown from './Dropdown';
import SearchRun from './SearchRun';


export default function SearchLevelSelector({
        searchType, defaultValues,
        searchLevel, setSearchLevel,
        searchLevelValue, setSearchLevelValue,
        viewMatches}) {
    const [values, setValues] = React.useState(defaultValues);

    const willMount = React.useRef(true);
    if (willMount.current) {
        let newValues = values;
        newValues[searchLevel] = searchLevelValue;
        setValues(newValues);
        willMount.current = false;
    }

    // update search value
    React.useEffect(() => {
        setSearchLevelValue(values[searchLevel]);
    }, [values, searchLevel, setSearchLevelValue]);

    const searchLevelChange = (e) => {
        const newSearchLevel = e.target.value;
        setSearchLevel(newSearchLevel);
        setSearchLevelValue(values[newSearchLevel]);
    }

    return (
        <div>
            <div className="flex flex-row justify-center">
                {Object.keys(defaultValues).map(type =>
                    <SearchLevelOption className="mx-2"  key={type} value={type} displayText={displayName[type]} checked={searchLevel === type} onChange={searchLevelChange} />
                )}
            </div>
            <div label="inputs">
                <div className={searchLevel !== "run" ? "visible" : "hidden"}>
                    <Dropdown
                        searchType={searchType}
                        searchLevel={searchLevel}
                        searchLevelValue={values[searchLevel]}
                        setSearchLevelValue={newValue => {setValues(oldValues => ({...oldValues, [searchLevel]: newValue}))}} />
                </div>
                <div className={searchLevel === "run" ? "visible" : "hidden"}>
                    <SearchRun
                        run={values['run']}
                        setRun={newValue => {setValues(oldValues => ({...oldValues, run: newValue}))}}
                        onEnter={viewMatches} />
                </div>
            </div>
        </div>
    )
}

const SearchLevelOption = (props) => {
    return (
        <div className={props.className}>
            <input type="radio" name="searchLevel" value={props.value} checked={props.checked}
                onChange={props.onChange} />
            <span className="ml-1">{props.displayText}</span>
        </div>
    )
}

const displayName = {
    'phylum': 'Phylum',
    'family': 'Family',
    'genbank': 'GenBank',
    'sequence': 'GenBank',
    'run': 'SRA Run',
}
