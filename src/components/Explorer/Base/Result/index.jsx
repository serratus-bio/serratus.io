import React from 'react';
import Paginator from './Paginator';
import ResultPage from './ResultPage';
import {
    getDataPromise,
    getPageLinks,
    getTitle,
    DownloadButton,
} from './ResultHelpers';

const Result = ({searchLevel, searchLevelValue, identityLims, scoreLims}) => {
    const perPage = 20;
    const [pageNumber, setPageNumber] = React.useState(1);
    const [dataPromise, setDataPromise] = React.useState();
    const [pageTitle, setPageTitle] = React.useState();
    const [searchLevelValueCorrected, setSearchLevelValueCorrected] = React.useState(searchLevelValue);
    const links = getPageLinks(searchLevel, searchLevelValueCorrected);

    React.useEffect(() => {
        if (!searchLevelValue) {
            return;
        }
        console.log(`Loading search result page for ${searchLevel}=${searchLevelValue}.`);
        // check for AMR accession
        let valueCorrected = searchLevelValue;
        if (searchLevel === "sequence") {
            let patternForAMR = /.*_\d{7}/g;
            let isFromAMR = searchLevelValue.match(patternForAMR);
            if (isFromAMR) {
                valueCorrected = valueCorrected.slice(0, valueCorrected.lastIndexOf("_"));
                setSearchLevelValueCorrected(valueCorrected);
            }
        }
        getTitle(searchLevel, searchLevelValue, valueCorrected).then(setPageTitle);
    }, [searchLevel, searchLevelValue]);

    React.useEffect(() => {
        if (!searchLevelValue) {
            return;
        }
        setDataPromise(getDataPromise(searchLevel, searchLevelValue, pageNumber, perPage, identityLims, scoreLims));
    }, [searchLevel, searchLevelValue, pageNumber, identityLims, scoreLims]);

    return (
        <div className="max-w-4xl m-auto">
            <div>
                <div className="w-full text-center">
                    <div>
                        <div className="text-xl font-bold">{searchLevelValue}</div>
                        {pageTitle && <div className="text-lg italic">{pageTitle}</div>}
                    </div>
                </div>
                <div className="flex justify-center items-center my-2">
                    {links}
                </div>
            </div>
            <div className="p-6">
                {searchLevel !== 'run' &&
                    <Paginator
                        pageNumber={pageNumber}
                        perPage={perPage}
                        setPageNumber={setPageNumber}
                        dataPromise={dataPromise} />}
                <ResultPage
                    searchLevel={searchLevel}
                    dataPromise={dataPromise} />
                {searchLevel !== 'run' &&
                    <DownloadButton
                        searchLevel={searchLevel}
                        searchLevelValue={searchLevelValue}
                        identityLims={identityLims}
                        scoreLims={scoreLims}
                    />
                }
            </div>
        </div>
    )
}

export default Result;