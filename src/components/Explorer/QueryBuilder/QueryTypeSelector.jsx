import React from 'react';
import SelectFamily from './SelectFamily';
import SelectGenbank from './SelectGenbank';
import SearchRun from './SearchRun';
import InputOption from './InputOption';

const QueryTypeSelector = ({initialFamily, queryType, setQueryType, queryValue, setQueryValue, goToQuery}) => {
    const [family, setFamily] = React.useState(initialFamily);
    const [genbank, setGenbank] = React.useState();
    const [run, setRun] = React.useState();

    const willMount = React.useRef(true);
    if (willMount.current) {
        switch (queryType) {
            case "family": setFamily(queryValue); break;
            case "genbank": setGenbank(queryValue); break;
            case "run": setRun(queryValue); break;
            default:
        }
        willMount.current = false;
    }

    // update query value
    React.useEffect(() => {
        switch (queryType) {
            case "family": setQueryValue(family); break;
            case "genbank": setQueryValue(genbank); break;
            case "run": setQueryValue(run); break;
            default:
        }
    }, [family, genbank, run, queryType, setQueryValue]);

    const queryTypeChange = (e) => {
        setQueryType(e.target.value);
    }

    return (
        <div>
            <div className="flex flex-row justify-center">
                <InputOption className="mx-2" value="family" displayText="Family" checked={queryType === "family"} onChange={queryTypeChange} />
                <InputOption className="mx-2" value="genbank" displayText="GenBank" checked={queryType === "genbank"} onChange={queryTypeChange} />
                <InputOption className="mx-2" value="run" displayText="SRA Run" checked={queryType === "run"} onChange={queryTypeChange} />
            </div>
            <div label="inputs">
                <div className={queryType === "family" ? "visible" : "hidden"}>
                    <SelectFamily
                        family={family}
                        setFamily={setFamily} />
                </div>
                <div className={queryType === "genbank" ? "visible" : "hidden"}>
                    <SelectGenbank
                        genbank={genbank}
                        setGenbank={setGenbank} />
                </div>
                <div className={queryType === "run" ? "visible" : "hidden"}>
                    <SearchRun
                        run={run}
                        setRun={setRun}
                        onEnter={goToQuery} />
                </div>
            </div>
        </div>
    )
}

export default QueryTypeSelector;
