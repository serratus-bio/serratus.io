import React from "react";
import Plot from 'react-plotly.js';
import Plotly from 'plotly.js';

const GeoReactPlotly = () => {
    const [data, setData] = React.useState();

    var layout = {
        mapbox: { style: "open-street-map", zoom: 1 },
        coloraxis: { colorscale: "Reds" },
        title: { text: "Earthquake Magnitude" },
        autosize: true,
        margin: { t: 40, b: 0 }
    };

    React.useEffect(() => {
        Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/earthquakes-23k.csv',
            function (err, rows) {
                function unpack(rows, key) {
                    return rows.map(function (row) {
                        return row[key];
                    })
                };

                let newData = [{
                    lon: unpack(rows, 'Longitude'),
                    lat: unpack(rows, 'Latitude'),
                    radius: 3,
                    z: unpack(rows, 'Magnitude'),
                    type: "densitymapbox",
                    coloraxis: 'coloraxis',
                }];
                setData(newData);
            })
    }, []);

    return <Plot
        data={data}
        layout={layout}
        useResizeHandler={true}
        style={{ width: "100%", height: "100%", minHeight: "500px"}}
    />
}

export default GeoReactPlotly;
