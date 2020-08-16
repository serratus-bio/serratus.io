import React from "react";
import { Helmet } from 'react-helmet';
import { Select } from "react-dropdown-select";
import QueryResult from '../components/QueryResult';
import QueryIntro from "../components/QueryIntro";
import Paginator from '../components/Paginator';
import DataReference from '../components/DataReference';
import { useLocation } from 'react-router-dom';
import FilterSlider from '../components/FilterSlider';
import {
    parseRange,
    constructRangeStr,
    getPlaceholder,
    getPageLinks,
    getTitle,
    getDataPromise,
    InputOption
} from "../helpers/QueryPageHelpers";
import {
    switchSize,
    classesBoxBorder
} from '../helpers/common';

import allFamilyData from '../data/SerratusIO_scoreID.json';
const familyDomain = Object.keys(allFamilyData).map((family) => { return { label: family, value: family } });

const queryTypes = ["family", "genbank", "run"];

const identityBounds = [75, 100];
const coverageBounds = [0, 100];

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
    var identityParamStr = urlParams.get("identity");
    var coverageParamStr = urlParams.get("coverage");

    // these values don't change until reload
    const queryTypeStatic = queryTypeFromParam;
    const queryValueStatic = queryValueFromParam;
    const pathNameStatic = useLocation().pathname;

    if (!queryTypeFromParam) { queryTypeFromParam = "family" }  // set default
    const [selectValues, setSelectValues] = React.useState([{ label: queryValueStatic, value: queryValueStatic }]);
    const [searchType, setSearchType] = React.useState(queryTypeFromParam);
    const searchValue = React.useRef(selectValues[0].value);
    const [placeholderText, setPlaceholderText] = React.useState(getPlaceholder(queryTypeFromParam));
    const [pageTitle, setPageTitle] = React.useState();
    const [pageNumber, setPageNumber] = React.useState(1);
    const [numberOfPages, setNumberOfPages] = React.useState(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(20);
    const [queryValueCorrected, setQueryValueCorrected] = React.useState(queryValueStatic);
    const [dataPromise, setDataPromise] = React.useState();
    const [sliderIdentityLims, setSliderIdentityLims] = React.useState(identityBounds);
    const [sliderCoverageLims, setSliderCoverageLims] = React.useState(coverageBounds);

    const willMount = React.useRef(true);
    if (willMount.current) {
        identityParamStr && setSliderIdentityLims(parseRange(identityParamStr, identityBounds));
        coverageParamStr && setSliderCoverageLims(parseRange(coverageParamStr, coverageBounds));
        willMount.current = false;
    }

    function searchOnKeyUp(e) {
        if (e.keyCode === 13) {
            loadQueryPage(e.target.value);
        }
        else {
            searchValue.current = e.target.value;
        }
    }

    function dropdownOnChange(values) {
        setSelectValues(values);
        if (values.length !== 0) {
            searchValue.current = values[0].value;
        }
    }

    function loadQueryPage() {
        if (searchValue.current && !searchType) {
            // TODO: display indicator "no query type selected"
            return;
        }
        let params = new URLSearchParams();
        if (searchValue.current) {
            params.set(searchType, searchValue.current)
        };
        var identity = constructRangeStr(...sliderIdentityLims);
        params.set('identity', identity);
        var coverage = constructRangeStr(...sliderCoverageLims);
        params.set('coverage', coverage);
        window.location.href = pathNameStatic + '?' + params.toString();
    }

    function queryTypeChange(e) {
        let queryType = e.target.value;
        setPlaceholderText(getPlaceholder(queryType));
        setSearchType(queryType);
        setPageNumber(1);
    }

    async function getNumberOfPages() {
        if (!dataPromise) return;
        var data = await dataPromise;
        setNumberOfPages(data.numberOfPages);
    }

    React.useEffect(() => {
        if (!queryValueStatic) {
            return;
        }
        setDataPromise(getDataPromise(queryTypeStatic, queryValueStatic, pageNumber, itemsPerPage, sliderIdentityLims));
    }, [queryTypeStatic, queryValueStatic, pageNumber]);

    React.useEffect(() => {
        if (!queryValueStatic) {
            return;
        }
        console.log(`Loading query result page for ${queryTypeStatic}=${queryValueStatic}.`);
        // check for AMR accession
        console.log(dataPromise);
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
    );

    return (
        <div className={`flex flex-col ${switchSize}:flex-row p-4 min-h-screen sm:bg-gray-200`}>
            {headTags}
            <div className={`flex flex-col p-4 w-full ${switchSize}:w-1/3 ${classesBoxBorder}`}>
                <div className="flex flex-col flex-grow items-center z-10 mt-2">
                    <div className="items-center z-10">
                        <div>
                            <InputOption className="inline mx-2" value="family" displayText="Family" checked={searchType === "family"} onChange={queryTypeChange} />
                            <InputOption className="inline mx-2" value="genbank" displayText="GenBank" checked={searchType === "genbank"} onChange={queryTypeChange} />
                            <InputOption className="inline mx-2" value="run" displayText="SRA Run" checked={searchType === "run"} onChange={queryTypeChange} />
                        </div>
                        {searchType === "family" ?
                            <Select options={familyDomain}
                                values={selectValues}
                                onChange={dropdownOnChange}
                                onDropdownOpen={() => setSelectValues([])}
                                placeholder={placeholderText} /> :
                            <div>
                                <input className="rounded border-2 border-gray-300 px-2 m-1 focus:border-blue-300 focus:outline-none" type="text" placeholder={placeholderText} onKeyUp={searchOnKeyUp} />
                                <button onClick={() => loadQueryPage()} className="rounded bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4" type="submit">Go</button>
                            </div>
                        }
                    </div>
                    <div className="w-full">
                        <div className="mx-2">
                            <div className="pt-6 text-center">Alignment identity (%)</div>
                            <FilterSlider id="sliderIdentity"
                                sliderRange={identityBounds}
                                sliderLims={sliderIdentityLims}
                                setSliderLims={setSliderIdentityLims} />
                        </div>
                        <div className="mx-2">
                            <div className="pt-6 text-center">Coverage</div>
                            <FilterSlider id="sliderCoverage"
                                sliderRange={coverageBounds}
                                sliderLims={sliderCoverageLims}
                                setSliderLims={setSliderCoverageLims}
                                colorGradientLims={["#3d5088", "#fce540"]} />
                        </div>
                    </div>
                    <div className="h-10" />
                    <button onClick={() => loadQueryPage()} className="rounded bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4" type="submit">Go</button>
                </div>
                <div className={`hidden ${switchSize}:block mb-auto`}>
                    <DataReference />
                </div>
            </div>
            <div className={`h-0 sm:h-3 ${switchSize}:w-3`}></div>
            <hr className="sm:hidden" />
            <div className={`p-4 w-full ${switchSize}:w-2/3 ${classesBoxBorder}`}>
                {queryValueStatic ?
                    <div>
                        <div className="w-full text-center">
                            <div>
                                <div className="text-xl font-bold">{queryValueStatic}</div>
                                {pageTitle ?
                                    <div className="text-lg italic">{pageTitle}</div> : null}
                            </div>
                        </div>
                        <div className="flex justify-center items-center my-2">
                            {getPageLinks(queryTypeStatic, queryValueCorrected)}
                        </div>
                    </div> : null}
                <div className="w-full flex flex-col p-6">
                    {queryValueStatic ?
                        <div>
                            {searchType === 'run' ?
                                <QueryResult type={queryTypeStatic} value={queryValueStatic} dataPromise={dataPromise} />
                                :
                                <div>
                                    <Paginator pageNumber={pageNumber} setPageNumber={setPageNumber} numberOfPages={numberOfPages} getNumberOfPages={getNumberOfPages} />
                                    <QueryResult type={queryTypeStatic} value={queryValueStatic} dataPromise={dataPromise} />
                                </div>
                            }
                        </div>
                        :
                        <QueryIntro />
                    }
                    <div className={`${switchSize}:hidden`}>
                        <DataReference />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Query;
