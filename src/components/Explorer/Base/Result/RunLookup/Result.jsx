import React from 'react';
import Paginator from '../Paginator';
import ResultPage from './FamilyChartController';
import { getTitle } from '../ResultHelpers';
import { BaseContext } from 'components/Explorer/Base/BaseContext';
import { fetchSraRun } from './SerratusApiCalls';

// for run -> family/sequence lookup
const RunLookupResult = ({searchLevel, searchLevelValue, identityLims, scoreLims}) => {
    const context = React.useContext(BaseContext);
    const perPage = 20;
    const [pageNumber, setPageNumber] = React.useState(1);
    const [dataPromise, setDataPromise] = React.useState();
    const [pageTitle, setPageTitle] = React.useState();
    const LinkButtons = context.result.LinkButtons;

    React.useEffect(() => {
        if (!searchLevelValue) {
            return;
        }
        console.log(`Loading search result page for ${searchLevel}=${searchLevelValue}.`);
        let valueCorrected = searchLevelValue;
        getTitle(searchLevel, searchLevelValue, valueCorrected).then(setPageTitle);
    }, [searchLevel, searchLevelValue]);

    React.useEffect(() => {
        if (!searchLevelValue) {
            return;
        }
        setDataPromise(fetchSraRun(context.searchType, searchLevelValue));
    }, [context.searchType, searchLevel, searchLevelValue, pageNumber, identityLims, scoreLims]);

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
                    <LinkButtons
                        searchLevel={searchLevel}
                        searchLevelValue={searchLevelValue} />
                </div>
            </div>
            <div className="p-6">
                <Paginator
                    pageNumber={pageNumber}
                    perPage={perPage}
                    setPageNumber={setPageNumber}
                    dataPromise={dataPromise} />
                <ResultPage
                    searchLevel={searchLevel}
                    dataPromise={dataPromise} />
            </div>
        </div>
    )
}

export default RunLookupResult;
