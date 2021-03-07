import React from "react";
import Plot from 'react-plotly.js';
import Plotly from "plotly.js-basic-dist";
import dataTsv from './rdrp_pos.tsv';

const GeoReactPlotly = () => {
    const [data, setData] = React.useState();

    var layout = {
        mapbox: { style: "open-street-map", zoom: 1 },
        coloraxis: { colorscale: "RdBu" },
        title: { text: "Locations of RdRP+ BioSamples with geospatial info" },
        autosize: true,
        margin: { t: 40, b: 0 }
    };

    React.useEffect(() => {
        Plotly.d3.tsv(dataTsv,
            function (err, rows) {
                function unpack(rows, key) {
                    return rows.map(function (row) {
                        return row[key];
                    })
                };

                let newData = [{
                    lon: unpack(rows, 'coordinate_x'),
                    lat: unpack(rows, 'coordinate_y'),
                    customdata: unpack(rows, 'sra_id'),
                    radius: 3,
                    hovertemplate: '%{customdata}',
                    type: "densitymapbox",
                    coloraxis: 'coloraxis',
                }];
                console.log(`number of rows: ${newData[0].lon.length}`);
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
