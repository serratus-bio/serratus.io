import React from "react";
import { Helmet } from 'react-helmet';
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

    let headTags = (
        <Helmet>
            <title>
                Serratus | {queryValueStatic ? `${queryValueStatic}` : "Query"}
            </title>
        </Helmet>
    )

    var classesBox = " w-full m-auto md:w-3/4 lg:w-1/2 ";
    var classesBoxBorder = " sm:border sm:rounded sm:border-gray-400 sm:bg-gray-100 ";

    return (
        <div className="p-4 min-h-screen sm:bg-gray-200">
            {headTags}
            <div className={"p-4" + classesBox + classesBoxBorder}>
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
            <div className="sm:h-3"></div>
            <div className={"p-4" + classesBox + classesBoxBorder}>
                <div className="w-full flex flex-col p-6">
                    {queryValueStatic ?
                        <QueryResult type={queryTypeStatic} value={queryValueStatic} dataPromise={dataPromise} /> :
                        <QueryIntro />
                    }
                </div>
            </div>
        </div>
    )
}

export default Query;
