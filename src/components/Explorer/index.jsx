import React from 'react';
import { Helmet } from 'react-helmet';
import QueryBuilder from './QueryBuilder';
import Intro from './Intro';
import QueryResult from './QueryResult';
import DataReference from './DataReference';
import { classesBoxBorder } from '../../helpers/common';
import {
    parseRange,
    queryTypes,
} from "./ExplorerHelpers";

const switchSize = "lg";  // Tailwind prefix to switch between landscape/portrait mode

const identityDomain = [75, 100];
const coverageDomain = [0, 100];

export default (props) => {
    const queryTypeStaticRef = React.useRef();
    const queryValueStaticRef = React.useRef();
    const identityLimsStaticRef = React.useRef();
    const coverageLimsStaticRef = React.useRef();

    var queryTypeFromParam = null;
    var queryValueFromParam = null;
    var identityLimsFromParam = null;
    var coverageLimsFromParam = null;
    var urlParams = new URLSearchParams(props.location.search);
    queryTypes.forEach(queryType => {
        var queryValue = urlParams.get(queryType);
        // assuming mutually exclusive parameters
        if (queryValue) {
            queryTypeFromParam = queryType;
            queryValueFromParam = queryValue;
        }
    });
    var queryPresent = queryTypeFromParam !== null;
    var identityParamStr = urlParams.get("identity");
    if (identityParamStr) identityLimsFromParam = parseRange(identityParamStr, identityDomain);
    var coverageParamStr = urlParams.get("coverage");
    if (coverageParamStr) coverageLimsFromParam = parseRange(coverageParamStr, coverageDomain);

    const willMount = React.useRef(true);
    if (willMount.current) {
        // set defaults
        if (!identityLimsFromParam) { identityLimsFromParam = identityDomain }
        if (!coverageLimsFromParam && !queryTypeFromParam) { coverageLimsFromParam = [25, 100] }
        if (!coverageLimsFromParam && queryTypeFromParam) { coverageLimsFromParam = coverageDomain }
        // family must be valid for initial chart render
        if (!queryTypeFromParam) { queryTypeFromParam = "family" }
        if (!queryValueFromParam) { queryValueFromParam = "Coronaviridae" }

        queryTypeStaticRef.current = (queryTypeFromParam);
        queryValueStaticRef.current = (queryValueFromParam);
        identityLimsStaticRef.current = (identityLimsFromParam);
        coverageLimsStaticRef.current = (coverageLimsFromParam);

        willMount.current = false;
    }

    // values that change with user input (QueryBuilder)
    const [queryType, setQueryType] = React.useState(queryTypeStaticRef.current);
    const [queryValue, setQueryValue] = React.useState(queryValueStaticRef.current);
    const identityLimsRef = React.useRef(identityLimsStaticRef.current);
    const coverageLimsRef = React.useRef(coverageLimsStaticRef.current);

    return (
        <div className={`flex flex-col ${switchSize}:flex-row p-4 min-h-screen sm:bg-gray-200`}>
            <Helmet>
                <title>Serratus | {queryValueStaticRef.current ? `${queryValueStaticRef.current}` : "Explorer"}</title>
            </Helmet>
            <div className={`flex flex-col px-4 py-2 w-full ${switchSize}:w-1/3 ${classesBoxBorder}`}>
                <QueryBuilder
                    identityLimsRef={identityLimsRef}
                    coverageLimsRef={coverageLimsRef}
                    queryType={queryType}
                    setQueryType={setQueryType}
                    queryValue={queryValue}
                    setQueryValue={setQueryValue} />
                <div className={`hidden ${switchSize}:block mb-auto text-center`}>
                    <DataReference />
                </div>
            </div>
            <div className={`h-0 sm:h-3 ${switchSize}:w-3`} />
            <hr className="sm:hidden" />
            <div className={`p-4 w-full ${switchSize}:w-2/3 ${classesBoxBorder}`}>
                {!queryPresent ?
                    <Intro /> :
                    <QueryResult
                        queryType={queryTypeStaticRef.current}
                        queryValue={queryValueStaticRef.current}
                        identityLims={identityLimsStaticRef.current}
                        coverageLims={coverageLimsStaticRef.current} />
                }
                <div className={`${switchSize}:hidden`}>
                    <DataReference />
                </div>
            </div>
        </div>
    )
}
