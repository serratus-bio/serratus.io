import React from 'react';
import Paginator from './Paginator';
import ResultPage from './ResultPage';
import {
    getDataPromise,
    getPageLinks,
    getTitle,
} from './ResultHelpers';

export default (props) => {
    const queryType = props.queryType;
    const queryValue = props.queryValue;
    const identityLims = props.identityLims;
    const coverageLims = props.coverageLims;

    const itemsPerPage = 20;
    const [pageNumber, setPageNumber] = React.useState(1);
    const [dataPromise, setDataPromise] = React.useState();
    const [pageTitle, setPageTitle] = React.useState();
    const [queryValueCorrected, setQueryValueCorrected] = React.useState(queryValue);
    const links = getPageLinks(queryType, queryValueCorrected);

    React.useEffect(() => {
        if (!queryValue) {
            return;
        }
        console.log(`Loading query result page for ${queryType}=${queryValue}.`);
        // check for AMR accession
        let valueCorrected = queryValue;
        if (queryType === "genbank") {
            let patternForAMR = /.*_\d{7}/g;
            let isFromAMR = queryValue.match(patternForAMR);
            if (isFromAMR) {
                valueCorrected = valueCorrected.slice(0, valueCorrected.lastIndexOf("_"));
                setQueryValueCorrected(valueCorrected);
            }
        }
        getTitle(queryType, queryValue, valueCorrected).then(setPageTitle);
    }, [queryType, queryValue]);

    React.useEffect(() => {
        if (!queryValue) {
            return;
        }
        setDataPromise(getDataPromise(queryType, queryValue, pageNumber, itemsPerPage, identityLims, coverageLims));
    }, [queryType, queryValue, pageNumber, identityLims, coverageLims]);

    return (
        <div className="max-w-4xl m-auto">
            <div>
                <div className="w-full text-center">
                    <div>
                        <div className="text-xl font-bold">{queryValue}</div>
                        {pageTitle && <div className="text-lg italic">{pageTitle}</div>}
                    </div>
                </div>
                <div className="flex justify-center items-center my-2">
                    {links}
                </div>
            </div>
            <div className="p-6">
                {queryType !== 'run' &&
                    <Paginator
                        pageNumber={pageNumber}
                        setPageNumber={setPageNumber}
                        dataPromise={dataPromise} />}
                <ResultPage
                    type={queryType}
                    value={queryValue}
                    dataPromise={dataPromise} />
            </div>
        </div>
    )
}
