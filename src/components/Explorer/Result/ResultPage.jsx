import React from 'react';
import { ExternalLink } from "../../../CommonHelpers";
import FamilyChart, {
    renderChart as renderFamilyChart
} from './Chart/FamilyChart';
import GenBankChart, {
    renderChart as renderGenBankChart
} from './Chart/GenBankChart';
import RunChart, {
    renderChart as renderRunChart
} from './Chart/RunChart';

export default (props) => {
    const [hasResults, setHasResults] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        if(!props.dataPromise) {
            return;
        }
        setIsLoading(true);

        var columns;
        switch (props.type) {
            case "family":
                columns = ["score", "pctId", "aln"];
                props.dataPromise.then((data) => {
                    data = data.items;
                    let hasResults = data && data.length !== 0;
                    setHasResults(hasResults);
                    setIsLoading(false);
                    renderFamilyChart(data, columns);
                }).catch(err => {
                    setHasError(true);
                    setIsLoading(false);
                });
                break;
            case "genbank":
                columns = ["cvgPct", "pctId", "aln"];
                props.dataPromise.then((data) => {
                    data = data.items;
                    let hasResults = data && data.length !== 0;
                    setHasResults(hasResults);
                    setIsLoading(false);
                    renderGenBankChart(data, columns);
                }).catch(err => {
                    setHasError(true);
                    setIsLoading(false);
                });
                break;
            case "run":
                columns = ["score", "pctId", "aln"];
                props.dataPromise.then((data) => {
                    let hasResults = data && data.length !== 0;
                    setHasResults(hasResults);
                    setIsLoading(false);
                    renderRunChart(data, columns);
                }).catch(err => {
                    console.log(err);
                    setHasError(true);
                    setIsLoading(false);
                });
                break;
            default:
        }
    }, [props.type, props.dataPromise]);

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
    switch (props.type) {
        case "family":
            return <FamilyChart />
        case "genbank":
            return <GenBankChart />
        case "run":
            return <RunChart />
        default:
    }
}
