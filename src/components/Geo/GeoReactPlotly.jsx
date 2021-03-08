import React from "react";
import Plot from 'react-plotly.js';
import Plotly from "plotly.js-basic-dist";
import dataTsv from './rdrp_pos.tsv';

const layout = {
    mapbox: { style: "open-street-map", zoom: 1 },
    title: { text: "Locations of RdRP+ BioSamples with geospatial info" },
    margin: { t: 40, b: 0 },
    autosize: true,
};

const GeoReactPlotly = ({ setSelectedPoints }) => {
    const [figureState, setFigureState] = React.useState({ data: [], layout: layout });

    React.useEffect(() => {
        Plotly.d3.tsv(dataTsv,
            function (err, rows) {
                function unpack(rows, key) {
                    return rows.map(function (row) {
                        return row[key];
                    })
                };

                function getHoverText(rows) {
                    return rows.map(function (row) {
                        if (row['from_text']) {
                            return `${row['sra_id']}<br>geocoded text: "${row['from_text']}"`;
                        }
                        return `${row['sra_id']}`;
                    })
                };

                const newData = [{
                    lon: unpack(rows, 'coordinate_x'),
                    lat: unpack(rows, 'coordinate_y'),
                    customdata: rows,
                    text: getHoverText(rows),
                    marker: { color: "Maroon", size: 4 },
                    radius: 3,
                    type: "scattermapbox",
                    coloraxis: 'coloraxis',
                }];
                setFigureState({
                    data: newData,
                    layout: layout,
                })
            })
    }, []);

    const onSelected = (selectedData) => {
        const x = selectedData.points.map((point) => {
            return point.customdata;
        });
        setSelectedPoints(x);
    }

    if (!figureState.data || !figureState.data.length) {
        return null;
    }

    return <>
        <Plot
            onSelected={onSelected}
            data={figureState.data}
            layout={figureState.layout}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%", minHeight: "500px" }}
            onUpdate={(figure) => setFigureState(figure)}
        />
    </>
}

export default GeoReactPlotly;
