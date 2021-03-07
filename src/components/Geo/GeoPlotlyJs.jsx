import React from "react";
import Plotly from 'plotly.js';

const chartId = "myDiv"

const GeoPlotlyJs = () => {
    return <div id={chartId} />
}

export const renderChart = () => {
    Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/earthquakes-23k.csv',
        function (err, rows) {
            function unpack(rows, key) {
                return rows.map(function (row) {
                    return row[key];
                })
            };

            var data = [{
                lon: unpack(rows, 'Longitude'),
                lat: unpack(rows, 'Latitude'),
                radius: 3,
                z: unpack(rows, 'Magnitude'),
                type: "densitymapbox",
                coloraxis: 'coloraxis',
            }];

            var layout = {
                mapbox: {style: "open-street-map", zoom: 1 },
                coloraxis: { colorscale: "Reds" },
                title: { text: "Earthquake Magnitude" },
                height: 600,
                margin: { t: 40, b: 0 }
            };

            var config = { responsive: true };

            Plotly.newPlot('myDiv', data, layout, config);
        })
}

export default GeoPlotlyJs;
