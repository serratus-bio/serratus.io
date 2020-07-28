import React from 'react';
import { withFauxDOM } from 'react-faux-dom'
import * as d3 from 'd3';
import { drawQueryResults } from '../SDK/drawQueryResults.js';
import { drawRunResults } from '../SDK/drawRunResults.js';

const QueryResult = (props) => {
    const [hasResults, setHasResults] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const connectFauxDOM = props.connectFauxDOM;

    React.useEffect(() => {
        if(!props.dataPromise) {
            return;
        }
        setIsLoading(true);
        const getResultsCallback = (drawFunction, columns, hasResults) => {
            return (results) => {
                var discardNode = true;
                var faux = connectFauxDOM('div', 'chart', discardNode);
                if (hasResults) {
                    drawFunction(d3, faux, results, columns);
                }
                setHasResults(hasResults);
                setIsLoading(false);
            }
        }
        var columns;
        var callback;
        switch (props.type) {
            case "family":
                columns = ["score", "pctId", "aln"];
                props.dataPromise.then((data) => {
                    data = data.slice(0, 20);
                    let hasResults = data && data.length !== 0;
                    callback = getResultsCallback(drawQueryResults, columns, hasResults);
                    callback(data);
                }).catch(err => {
                    setHasError(true);
                    setIsLoading(false);
                });
                break;
            case "genbank":
                columns = ["cvgPct", "pctId", "aln"];
                props.dataPromise.then((data) => {
                    data = data.slice(0, 20);
                    let hasResults = data && data.length !== 0;
                    callback = getResultsCallback(drawQueryResults, columns, hasResults);
                    callback(data);
                }).catch(err => {
                    setHasError(true);
                    setIsLoading(false);
                });
                break;
            case "run":
                columns = ["score", "pctId", "aln"];
                callback = getResultsCallback(drawRunResults, columns);
                props.dataPromise.then((data) => {
                    let hasResults = Boolean(data);
                    callback = getResultsCallback(drawRunResults, columns, hasResults);
                    callback(data);
                }).catch(err => {
                    setHasError(true);
                    setIsLoading(false);
                });
                break;
            default:
        }
    }, [props.type, props.value, props.dataPromise, connectFauxDOM]);

    let loading = (
        <div className="text-center">
            Loading... (this might take a while)
        </div>
    )

    let error = (
        <div className="text-center">
            <span>Could not retrieve results for this query.</span><br />
            <span>If this is unexpected, please </span>
            <a href="https://github.com/serratus-bio/serratus.io/issues/new" target="_blank" rel="noopener noreferrer" className="text-blue-600">
                submit an issue
            </a>
            <span> on the the serratus.io GitHub.</span>
        </div>
    )

    let noResultsRun = (
        <div className="text-center">
            <span>This accession has not been processed... yet.</span><br />
            <span>To request this sample be processed, please </span>
            <a href="https://github.com/ababaian/serratus/issues/new" target="_blank" rel="noopener noreferrer" className="text-blue-600">
                submit an issue
            </a>
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
        <div className="pl-24">
            {props.chart}
        </div>
    )
}

const FauxChart = withFauxDOM(QueryResult);
export default FauxChart;
