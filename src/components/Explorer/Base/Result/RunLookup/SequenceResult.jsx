import React from 'react';
import Paginator from '../Paginator';
import ChartController from './SequenceChartController';
import { BaseContext } from 'components/Explorer/Base/BaseContext';
import { fetchPagedRunMatches } from './SerratusApiCalls';

const SequenceResult = ({ runId, familyId }) => {
    const context = React.useContext(BaseContext);
    const perPage = 20;
    const [pageNumber, setPageNumber] = React.useState(1);
    const [dataPromise, setDataPromise] = React.useState();

    React.useEffect(() => {
        if (!runId) return;
        setDataPromise(fetchPagedRunMatches(context.searchType, runId, pageNumber, perPage, familyId));
    }, [context.searchType, runId, pageNumber, familyId]);

    // reset page number
    React.useEffect(() => {
        setPageNumber(1);
    }, [familyId]);

    return (
        <div className="max-w-4xl m-auto">
            <div className="w-full text-center">
                <div className="text-xl font-bold">{familyId}</div>
            </div>
            <div className="p-6">
                <Paginator
                    pageNumber={pageNumber}
                    perPage={perPage}
                    setPageNumber={setPageNumber}
                    dataPromise={dataPromise} />
                <ChartController
                    dataPromise={dataPromise} />
            </div>
        </div>
    )
}

export default SequenceResult;
