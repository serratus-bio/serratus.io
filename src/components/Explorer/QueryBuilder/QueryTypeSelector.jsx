import React from 'react';
import ValueSelector from './Dropdown/ValueSelector';
import SearchRun from './SearchRun';
import InputOption from './InputOption';


const defaultValues = {
    'family': 'Coronaviridae',
    'genbank': 'NC_034446.1',
}

const QueryTypeSelector = ({queryType, setQueryType, queryValue, setQueryValue, goToQuery}) => {
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
                <InputOption className="mx-2" value="family" displayText="Family" checked={queryType === "family"} onChange={queryTypeChange} />
                <InputOption className="mx-2" value="genbank" displayText="GenBank" checked={queryType === "genbank"} onChange={queryTypeChange} />
                <InputOption className="mx-2" value="run" displayText="SRA Run" checked={queryType === "run"} onChange={queryTypeChange} />
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
