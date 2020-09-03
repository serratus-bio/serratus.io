import React from 'react';
import { Helmet } from 'react-helmet';
import QueryBuilder from '../components/Explorer/QueryBuilder';
import Intro from '../components/Explorer/Intro';
import QueryResult from '../components/Explorer/QueryResult';
import DataReference from '../components/DataReference';

import {
    parseRange
} from "../helpers/ExplorerHelpers";

import {
    switchSize,
    queryTypes,
    classesBoxBorder
} from '../helpers/common';

const identityDomain = [75, 100];
const coverageDomain = [0, 100];

export default (props) => {
    let queryTypeFromParam = null;
    let queryValueFromParam = null;
    let identityLimsFromParam = null;
    let coverageLimsFromParam = null;
    const willMount = React.useRef(true);
    if (willMount.current) {
        var urlParams = new URLSearchParams(props.location.search);
        queryTypes.forEach(queryType => {
            var queryValue = urlParams.get(queryType);
            // assuming mutually exclusive parameters
            if (queryValue) {
                queryTypeFromParam = queryType;
                queryValueFromParam = queryValue;
            }
        });
        var identityParamStr = urlParams.get("identity");
        if (identityParamStr) identityLimsFromParam = parseRange(identityParamStr, identityDomain);
        var coverageParamStr = urlParams.get("coverage");
        if (coverageParamStr) coverageLimsFromParam = parseRange(coverageParamStr, coverageDomain);
        willMount.current = false;
    }
    const queryPresent = Boolean(queryTypeFromParam);
    const queryTypeStatic = queryTypeFromParam;
    const queryValueStatic = queryValueFromParam;
    const identityLimsStatic = identityLimsFromParam;
    const coverageLimsStatic = coverageLimsFromParam;

    // set defaults
    if (!queryTypeFromParam) { queryTypeFromParam = "family" }
    if (!identityLimsFromParam) { identityLimsFromParam = [0, 100] }
    if (!coverageLimsFromParam) { coverageLimsFromParam = [25, 100] }

    // values that change with user input (QueryBuilder)
    const [queryType, setQueryType] = React.useState(queryTypeFromParam);
    const queryValueRef = React.useRef();
    const identityLimsRef = React.useRef(identityLimsFromParam);
    const coverageLimsRef = React.useRef(coverageLimsFromParam);

    return (
        <div className={`flex flex-col ${switchSize}:flex-row p-4 min-h-screen sm:bg-gray-200`}>
            <Helmet>
                <title>Serratus | {queryValueStatic ? `${queryValueStatic}` : "Explorer"}</title>
            </Helmet>
            <div className={`flex flex-col px-4 py-2 w-full ${switchSize}:w-1/3 ${classesBoxBorder}`}>
                <QueryBuilder
                    identityLimsRef={identityLimsRef}
                    coverageLimsRef={coverageLimsRef}
                    queryType={queryType}
                    setQueryType={setQueryType}
                    queryValueRef={queryValueRef} />
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
                        queryType={queryTypeStatic}
                        queryValue={queryValueStatic}
                        identityLims={identityLimsStatic}
                        coverageLims={coverageLimsStatic} />
                }
                <div className={`${switchSize}:hidden`}>
                    <DataReference />
                </div>
            </div>
        </div>
    )
}
