import React from 'react';
import { withFauxDOM } from 'react-faux-dom'
import * as d3 from 'd3';
import DataSdk from '../SDK/DataSdk';
import { drawQueryResults } from '../SDK/drawQueryResults.js';

const dataSdk = new DataSdk();

const QueryChart = (props) => {
    const [hasResults, setHasResults] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    async function renderChart(accession) {
        if (!accession) {
            return;
        }
        let results = await dataSdk.fetchSraHitsByAccession(accession);
        let hasResults = results && results.length != 0;
        setHasResults(hasResults);
        if (hasResults) {
            results = results.slice(0, 20);
            var faux = props.connectFauxDOM('div', 'chart');
            drawQueryResults(d3, faux, results);
        }
        setIsLoading(false);
    }

    React.useEffect(() => {
        renderChart(props.accession);
    }, [props.accession]);

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
