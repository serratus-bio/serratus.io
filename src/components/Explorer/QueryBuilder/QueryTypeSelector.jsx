import React from 'react';
import ValueSelector from './Dropdown/ValueSelector';
import SearchRun from './SearchRun';


const QueryTypeSelector = ({defaultValues, queryType, setQueryType, queryValue, setQueryValue, goToQuery}) => {
    const [values, setValues] = React.useState(defaultValues);

    const willMount = React.useRef(true);
    if (willMount.current) {
        let newValues = values;
        newValues[queryType] = queryValue;
        setValues(newValues);
        willMount.current = false;
    }

    // update query value
    React.useEffect(() => {
        setQueryValue(values[queryType]);
    }, [values, queryType, setQueryValue]);

    const queryTypeChange = (e) => {
        const newQueryType = e.target.value;
        setQueryType(newQueryType);
        setQueryValue(values[newQueryType]);
    }

    return (
        <div>
            <div className="flex flex-row justify-center">
                {Object.keys(defaultValues).map(type =>
                    <InputOption className="mx-2" value={type} displayText={displayName[type]} checked={queryType === type} onChange={queryTypeChange} />
                )}
                <InputOption className="mx-2" value="run" displayText={displayName["run"]} checked={queryType === "run"} onChange={queryTypeChange} />
            </div>
            <div label="inputs">
                <div className={queryType !== "run" ? "visible" : "hidden"}>
                    <ValueSelector
                        queryType={queryType}
                        queryValue={values[queryType]}
                        setQueryValue={newValue => {setValues(oldValues => ({...oldValues, [queryType]: newValue}))}} />
                </div>
                <div className={queryType === "run" ? "visible" : "hidden"}>
                    <SearchRun
                        run={values['run']}
                        setRun={newValue => {setValues(oldValues => ({...oldValues, run: newValue}))}}
                        onEnter={goToQuery} />
                </div>
            </div>
        </div>
    )
}

export default QueryTypeSelector;

const InputOption = (props) => {
    return (
        <div className={props.className}>
            <input type="radio" name="querytype" value={props.value} checked={props.checked}
                onChange={props.onChange} />
            <span className="ml-1">{props.displayText}</span>
        </div>
    )
}

const displayName = {
    'family': 'Family',
    'genbank': 'GenBank',
    'run': 'SRA Run',
}
