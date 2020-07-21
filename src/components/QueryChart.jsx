import React from 'react';
import { withFauxDOM } from 'react-faux-dom'
import * as d3 from 'd3';
import DataSdk from '../SDK/DataSdk';
import { drawQueryResults } from '../SDK/drawQueryResults.js';

const dataSdk = new DataSdk();

const QueryChart = (props) => {
    const [hasResults, setHasResults] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    async function renderByAccession(accession) {
        if (!accession) {
            return;
        }
        let results = await dataSdk.fetchSraHitsByAccession(accession);
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

    React.useEffect(() => {
        setIsLoading(true);
        switch (props.type) {
            case "family":
                renderByFamily(props.value);
                break;
            case "genbank":
                renderByAccession(props.value);
                break;
        }
    }, [props.type, props.value]);

    let loading = (
        <div className="text-center">
            Loading report...
        </div>
    )

    let noResults = (
        <div className="text-center">
            <span>Could not retrieve Serratus results for this accession.</span>
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
