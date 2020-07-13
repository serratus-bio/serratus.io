import React from 'react';
import { withFauxDOM } from 'react-faux-dom'
import * as d3 from 'd3';
import DataSdk from '../SDK/DataSdk';
import { drawHeatmap } from '../SDK/D3Heatmap.js';

const Heatmap = (props) => {
    var accession = props.accession;
    const dataSdk = new DataSdk();

    async function plot() {
        let summaryJson = await dataSdk.fetchAccessionJSON(accession);
        var faux = props.connectFauxDOM('div', 'chart');
        drawHeatmap(d3, faux, summaryJson);
    }

    React.useEffect(() => {
        if (!accession) {
            return;
        }
        plot();
    }, []);

    return (
        <div>
            {props.chart}
        </div>
    )
}

const FauxChart = withFauxDOM(Heatmap);
export default FauxChart;
