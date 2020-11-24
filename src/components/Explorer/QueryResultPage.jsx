import React from 'react';
import { ExternalLink } from "../../helpers/common";
import Chart, {
    renderChart
} from './QueryResultChart';

export default (props) => {
    const [hasResults, setHasResults] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        if(!props.dataPromise) {
            return;
        }
        setIsLoading(true);
        props.dataPromise.then((data) => {
            data = data.items;
            let hasResults = data && data.length !== 0;
            setHasResults(hasResults);
            setIsLoading(false);
            renderChart(data);
        }).catch(err => {
            console.error(err);
            setHasError(true);
            setIsLoading(false);
        });
    }, [props.dataPromise]);

    let loading = (
        <div className="text-center">
            Loading... (this might take a while)
        </div>
    )

    let error = (
        <div className="text-center">
            <span>This query did not return any results.</span><br />
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
    if (hasError || !hasResults) {
        if (props.type === "run") {
            return noResultsRun
        }
        return error
    }
    return (
        <Chart />
    )
}
