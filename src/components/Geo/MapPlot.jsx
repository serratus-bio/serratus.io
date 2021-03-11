import React from "react";
import Plot from 'react-plotly.js';
import Plotly from "plotly.js-basic-dist";
import dataTsv from './rdrp_pos.tsv';

const layout = {
    mapbox: { style: "open-street-map", zoom: 1 },
    margin: { t: 0, b: 0, l: 0, r: 0 },
    autosize: true,
};

const MapPlot = ({ setSelectedPoints }) => {
    const [figureState, setFigureState] = React.useState({ data: [], layout: layout });

    React.useEffect(() => {
        Plotly.d3.tsv(dataTsv,
            function (err, rows) {
                function unpack(rows, key) {
                    return rows.map(function (row) {
                        if (key === 'coordinate_x' || key === 'coordinate_y') {
                            // +(0~111) meters per https://www.usna.edu/Users/oceano/pguth/md_help/html/approx_equivalents.htm
                            return parseFloat(row[key]) + 0.001 * Math.random();
                        }
                        return row[key];
                    })
                };

                function getHoverText(rows) {
                    return rows.map(function (row) {
                        var text = `${row['run_id']}`
                        text += `<br>lat, lon = (${row['coordinate_y']}, ${row['coordinate_x']})`;
                        if (row['from_text']) {
                            text += `<br>Inferred location: "${row['from_text']}"`;
                        }
                        return text;
                    })
                };

                const newData = [{
                    lon: unpack(rows, 'coordinate_x'),
                    lat: unpack(rows, 'coordinate_y'),
                    customdata: rows,
                    text: getHoverText(rows),
                    hoverinfo: "text",
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

export default MapPlot;
