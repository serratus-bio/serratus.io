import React from 'react';
import { ExternalLink } from "common";
import RunChart, {
    renderChart as renderRunChart
} from './FamilyChartD3';
import { BaseContext } from 'components/Explorer/Base/BaseContext';

const ResultPage = ({searchLevel, dataPromise}) => {
    const context = React.useContext(BaseContext);
    const [hasResults, setHasResults] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    
    function loadSecondChart(name) { console.log(`${name}`) };

    React.useEffect(() => {
        if(!dataPromise) {
            return;
        }
        setIsLoading(true);

        dataPromise.then((data) => {
            setIsLoading(false);
            setHasResults(data && data.length !== 0);
            const familySectionKey = "families"
            renderRunChart(data[familySectionKey], context.result.colMap, context.result.theme.d3InterpolateFunction, loadSecondChart);
        }).catch(err => {
            // TODO: handle error
            setIsLoading(false);
        });
    }, [searchLevel, dataPromise, context.result]);

    let loading = (
        <div className="text-center">
            Loading... (this might take a while)
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
    if (!hasResults) {
        return noResultsRun
    }
    return <RunChart />
}

export default ResultPage;
