import React from "react";
import Plot from 'react-plotly.js';
import * as d3 from 'd3';
import rdrpPosTsv from './rdrp_pos.tsv';


export default function MapPlot({ setSelectedPoints }) {
    const [state, setState] = React.useState({ data: [], layout: layout });

    React.useEffect(() => {
        async function render() {
            setState({
                data: await getData(),
                layout: layout,
            });
        }
        render();
    }, []);

    if (!state.data || !state.data.length) return null;

    function onSelected(selectedData) {
        const points = selectedData.points.map(point => point.customdata);
        setSelectedPoints(points);
    }

    return <>
        <Plot
            data={state.data}
            layout={state.layout}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%", minHeight: "500px" }}
            onSelected={onSelected}
            onUpdate={(figure) => setState(figure)}
        />
    </>
}

const layout = {
    mapbox: { style: "open-street-map", zoom: 1 },
    margin: { t: 0, b: 0, l: 0, r: 0 },
    autosize: true,
};

async function getData() {
    const rows = await d3.tsv(rdrpPosTsv);
    function unpack(rows, key) {
        return rows.map(row => {
            if (key === 'coordinate_x' || key === 'coordinate_y') {
                // +(0~111) meters per https://www.usna.edu/Users/oceano/pguth/md_help/html/approx_equivalents.htm
                return parseFloat(row[key]) + 0.001 * Math.random();
            }
            return row[key];
        })
    };

    function getHoverText(rows) {
        return rows.map(row => {
            var text = `${row['run_id']}
                <br>Source: ${row['scientific_name']}`;
            if (row['from_text']) {
                text += `<br>Inferred location: "${row['from_text']}"`;
            }
            return text;
        })
    };

    return [{
        type: "scattermapbox",
        lon: unpack(rows, 'coordinate_x'),
        lat: unpack(rows, 'coordinate_y'),
        customdata: rows,
        text: getHoverText(rows),
        hoverinfo: "text",
        marker: { color: "Maroon", size: 4 },
        radius: 3,
    }];
}
