import React from 'react';
import { withFauxDOM } from 'react-faux-dom'
import * as d3 from 'd3';
import DataSdk from '../SDK/DataSdk';
import { drawReport } from '../SDK/drawReport.js';

const dataSdk = new DataSdk();

const ReportChart = (props) => {
    var accession = props.accession;
    const [summaryJson, setSummaryJson] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);

    async function initialRender() {
        if (!accession) {
            return;
        }

        let summaryJson = await dataSdk.fetchAccessionJSON(accession);
        setSummaryJson(summaryJson);
        setIsLoading(false);

        if (summaryJson) {
            var faux = props.connectFauxDOM('div', 'chart');
            drawReport(d3, faux, summaryJson);
        }
    }

    React.useEffect(() => {
        initialRender();
    }, []);

    let loading = (
        <div className="text-center">
            Loading report...
        </div>
    )

    let noReport = (
        <div className="text-center">
            <span>This accession has not been processed... yet.</span><br />
            <span>To request this sample be processed, please </span>
            <a href="https://github.com/ababaian/serratus/issues/new" target="_blank" rel="noopener noreferrer" className="text-blue-600">
                submit an issue on GitHub
            </a>
            <span>.</span>
        </div>
    )

    return (
        <div>
            {isLoading ?
                loading :
                summaryJson ?
                    props.chart :
                    noReport
            }
        </div>
    )
}

const FauxChart = withFauxDOM(ReportChart);
export default FauxChart;
