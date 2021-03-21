import React from 'react';
import { ExternalLink } from "common";
import GenericChart, {
    renderChart as renderGenericChart
} from './Chart/GenericChart';
import RunChart, {
    renderChart as renderRunChart
} from './Chart/RunChart';
import { BaseContext } from 'components/Explorer/Base/BaseContext';

const resultItemsKey = "result";

const ResultPage = ({searchLevel, dataPromise}) => {
    const context = React.useContext(BaseContext);
    const [hasResults, setHasResults] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    
    function loadSecondChart(name) { console.log(`${name}`) };

    React.useEffect(() => {
        if(!dataPromise) {
            return;
        }
        setIsLoading(true);

        dataPromise.then((data) => {
            setIsLoading(false);
            if (searchLevel === "run") {
                setHasResults(data && data.length !== 0);
                const familySectionKey = "families"
                renderRunChart(data[familySectionKey], context.result.colMap, context.result.theme.d3InterpolateFunction, loadSecondChart);
            }
            else {
                setHasResults(data && data[resultItemsKey].length !== 0);
                renderGenericChart(data[resultItemsKey], context.result.colMap, context.result.theme.d3InterpolateFunction);
            }
        }).catch(err => {
            setHasError(true);
            if (searchLevel === "run" && err.toString().includes(500)) {
                setHasError(false);
            }
            setIsLoading(false);
        });
    }, [searchLevel, dataPromise, context.result]);

    let loading = (
        <div className="text-center">
            Loading... (this might take a while)
        </div>
    )

    let error = (
        <div className="text-center">
            <span>This search did not return any results.</span><br />
            <span>If this is unexpected, please </span>
            <ExternalLink href="https://github.com/serratus-bio/serratus.io/issues/new" className="text-blue-600">
                submit an issue
            </ExternalLink>
            <span> on the the serratus.io GitHub.</span>
        </div>
    )

    let noResultsRun = (
        <div className="text-center">
            <span>This accession has not been processed... yet.</span><br />
            <span>To request this sample be processed, please </span>
            <ExternalLink href="https://github.com/ababaian/serratus/issues/new" className="text-blue-600">
                submit an issue
            </ExternalLink>
            <span> on the Serratus project GitHub.</span>
        </div>
    )

    if (isLoading) {
        return loading
    }
    if (searchLevel === "run") {
        if (!hasResults) {
            return noResultsRun
        }
        return <RunChart />
    }
    if (hasError || !hasResults) {
        return error
    }
    return <GenericChart />
}

export default ResultPage;
