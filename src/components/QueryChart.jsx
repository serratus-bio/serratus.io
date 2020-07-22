import React from 'react';
import { withFauxDOM } from 'react-faux-dom'
import * as d3 from 'd3';
import DataSdk from '../SDK/DataSdk';
import { drawQueryResults } from '../SDK/drawQueryResults.js';
import { drawReport } from '../SDK/drawReport.js';

const dataSdk = new DataSdk();

const QueryChart = (props) => {
    const [hasResults, setHasResults] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    async function renderByGenbank(genbankAccession) {
        if (!genbankAccession) {
            return;
        }
        let results = await dataSdk.fetchSraHitsByAccession(genbankAccession);
        let hasResults = results && results.length != 0;
        setHasResults(hasResults);
        if (hasResults) {
            results = results.slice(0, 20);
            var faux = props.connectFauxDOM('div', 'chart');
            var columns = ["cvgPct", "pctId", "aln"];
            drawQueryResults(d3, faux, results, columns);
        }
        setIsLoading(false);
    }

    async function renderByFamily(family) {
        if (!family) {
            return;
        }
        let results = await dataSdk.fetchSraHitsByFamily(family);
        let hasResults = results && results.length != 0;
        setHasResults(hasResults);
        if (hasResults) {
            results = results.slice(0, 20);
            var faux = props.connectFauxDOM('div', 'chart');
            var columns = ["score", "pctId", "aln"];
            drawQueryResults(d3, faux, results, columns);
        }
        setIsLoading(false);
    }

    async function renderByRun(sraAccession) {
        if (!sraAccession) {
            return;
        }
        let results = await dataSdk.fetchSraRun(sraAccession);
        let hasResults = Boolean(results);
        setHasResults(hasResults);
        if (hasResults) {
            var faux = props.connectFauxDOM('div', 'chart');
            drawReport(d3, faux, results);
        }
        setIsLoading(false);
    }

    React.useEffect(() => {
        setIsLoading(true);
        switch (props.type) {
            case "family":
                renderByFamily(props.value);
                break;
            case "genbank":
                renderByGenbank(props.value);
                break;
            case "run":
                renderByRun(props.value);
                break;
        }
    }, [props.type, props.value]);

    let loading = (
        <div className="text-center">
            Loading... (this might take a while)
        </div>
    )

    let noResultsRun = (
        <div>
            <span>This accession has not been processed... yet.</span><br />
            <span>To request this sample be processed, please </span>
            <a href="https://github.com/ababaian/serratus/issues/new" target="_blank" rel="noopener noreferrer" className="text-blue-600">
                submit an issue on GitHub
            </a>
            <span>.</span>
        </div>
    )

    let noResults = (
        <div className="text-center">
            {props.type == "run" ? 
                noResultsRun :
                <span>Could not retrieve results for this query.</span>
            }
        </div>
    )

    return (
        <div>
            {isLoading ?
                loading :
                hasResults ?
                    props.chart :
                    noResults
            }
        </div>
    )
}

 const FauxChart = withFauxDOM(QueryChart);
export default FauxChart;
