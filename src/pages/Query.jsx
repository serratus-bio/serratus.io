import React from "react";
import QueryResult from '../components/QueryResult';
import QueryIntro from "../components/QueryIntro";
import { useLocation } from 'react-router-dom';
import {
    getPlaceholder,
    getPageLinks,
    getTitle,
    getDataPromise,
    InputOption
} from "../helpers/QueryPageHelpers";

const queryTypes = ["family", "genbank", "run"];

const Query = (props) => {
    let queryTypeFromParam = null;
    let queryValueFromParam = null;
    var urlParams = new URLSearchParams(props.location.search);
    queryTypes.forEach(queryType => {
        var paramValue = urlParams.get(queryType);
        // TODO: mutually exclusive parameters
        if (paramValue) {
            queryTypeFromParam = queryType;
            queryValueFromParam = paramValue;
        }
    });

    // these values don't change until reload
    const queryTypeStatic = queryTypeFromParam;
    const queryValueStatic = queryValueFromParam;
    const pathNameStatic = useLocation().pathname;

    if (!queryTypeFromParam) { queryTypeFromParam = "family" }  // set default
    const [searchType, setSearchType] = React.useState(queryTypeFromParam);
    const [searchValue, setSearchValue] = React.useState("");
    const [placeholderText, setPlaceholderText] = React.useState(getPlaceholder(queryTypeFromParam));
    const [pageTitle, setPageTitle] = React.useState();
    const [queryValueCorrected, setQueryValueCorrected] = React.useState(queryValueStatic);
    const [dataPromise, setDataPromise] = React.useState();

    // clicked "Query" on navigation bar
    if (queryValueStatic && !queryValueFromParam) {
        loadQueryPage(null);
    }

    function searchOnKeyUp(e) {
        if (e.keyCode === 13) {
            loadQueryPage(e.target.value);
        }
        else {
            setSearchValue(e.target.value);
        }
    }

    function loadQueryPage(searchValue) {
        if (searchValue && !searchType) {
            // TODO: display indicator "no query type selected"
            return;
        }
        let newUrl = searchValue ? `${pathNameStatic}?${searchType}=${searchValue}` : pathNameStatic;
        window.location.href = newUrl;
    }

    function queryTypeChange(e) {
        let queryType = e.target.value;
        setPlaceholderText(getPlaceholder(queryType));
        setSearchType(queryType);
    }

    React.useEffect(() => {
        if (!queryValueStatic) {
            return;
        }
        console.log(`Loading query result page for ${queryTypeStatic}=${queryValueStatic}.`);
        setDataPromise(getDataPromise(queryTypeStatic, queryValueStatic));
        // check for AMR accession
        let valueCorrected = queryValueStatic;
        if (queryTypeStatic === "genbank") {
            let patternForAMR = /.*_\d{7}/g;
            let isFromAMR = queryValueStatic.match(patternForAMR);
            if (isFromAMR) {
                valueCorrected = valueCorrected.slice(0, valueCorrected.lastIndexOf("_"));
                setQueryValueCorrected(valueCorrected);
            }
        }
        getTitle(queryTypeStatic, queryValueStatic, valueCorrected).then(setPageTitle);
    }, [queryTypeStatic, queryValueStatic]);

    return (
        <div className="flex absolute w-screen h-screen justify-center">
            <img src="/serratus.jpg" alt="serratus mountain" className="hidden sm:block opacity-75 sm:fixed" style={{ objectFit: 'cover', minWidth: '100vh', minHeight: '100vh' }} />
            <div className="flex flex-col justify-center items-center w-full z-10 rounded-lg p-1
                sm:shadow-2xl
                lg:w-3/4 lg:mt-6 lg:bg-blue-400 lg:bg-opacity-25 lg:border lg:border-gray-600">
                <div className="w-full lg:w-5/6 bg-gray-400 border rounded-lg border-gray-600 sm:shadow-xl p-1 z-20 m-1">
                    <div className="flex flex-col items-center z-10 mt-2">
                        <div className="items-center z-10">
                            <div>
                                <InputOption className="inline mx-2" value="family" displayText="Family" checked={searchType === "family"} onChange={queryTypeChange} />
                                <InputOption className="inline mx-2" value="genbank" displayText="GenBank" checked={searchType === "genbank"} onChange={queryTypeChange} />
                                <InputOption className="inline mx-2" value="run" displayText="SRA Run" checked={searchType === "run"} onChange={queryTypeChange} />
                            </div>
                            <input className="rounded border-2 border-gray-300 px-2 m-1 sm:w-64 focus:border-blue-300 focus:outline-none" type="text" placeholder={placeholderText} onKeyUp={searchOnKeyUp} />
                            <button onClick={() => loadQueryPage(searchValue)} className="rounded bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4" type="submit">Go</button>
                        </div>
                    </div>
                    <div className="w-full text-center">
                        {queryValueStatic ?
                            <div>
                                <div className="text-xl font-bold">{queryValueStatic}</div>
                                {pageTitle ?
                                    <div className="text-lg italic">{pageTitle}</div> : null}
                            </div> : null
                        }
                    </div>
                    {queryValueStatic ?
                        <div className="flex justify-center items-center my-2">
                            {getPageLinks(queryTypeStatic, queryValueCorrected)}
                        </div> : null
                    }
                </div>
                <div className="w-full lg:w-5/6 flex flex-col flex-1 justify-center items-center bg-gray-400 border rounded-lg border-gray-600 shadow-xl m-1 sm:px-12">
                    <div className="w-full flex flex-col overflow-y-auto py-6" style={{ height: 600 }} id="style-2">
                        {queryValueStatic ?
                            <QueryResult type={queryTypeStatic} value={queryValueStatic} dataPromise={dataPromise} /> :
                            <QueryIntro />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Query;
