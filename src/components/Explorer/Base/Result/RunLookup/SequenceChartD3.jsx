/* eslint-disable no-unused-vars */
import React from "react";
import * as d3 from 'd3';

import {
    sectionHeight as rowHeight,
    tableShiftY as headerTextHeight,
    drawLegend,
    addHeaders,
    addColumns,
} from '../ChartHelpers';
import { SequenceMatch } from '../ChartClasses'

const chartId = "run-sequence-lookup-chart"

const Chart = () => {
    return <div id={chartId} />
}

export default Chart;

export const renderChart = (results, colMap, d3InterpolateFunction) => {
    var mainSvg = d3.select(`#${chartId}`)
        .append("svg")
        .attr("viewBox", `0 0 750 400`);
    var sequencesSvg = mainSvg.append("svg")
        .attr("y", headerTextHeight);

    drawLegend(sequencesSvg, d3InterpolateFunction);

    var columnTooltipSvgText = mainSvg.append("text").attr("id", "tooltip");
    var columnHeadersG = mainSvg.append("g")
        .attr("transform", `translate(0, ${headerTextHeight - rowHeight})`);
    addHeaders(columnHeadersG);
    addColumns(columnHeadersG, colMap);

    results.forEach((sequence, i) => {
        const match = new SequenceMatch(sequencesSvg, sequence, i, colMap, d3InterpolateFunction);
        match.addLinkAndHeatmap();
        match.addStats();
    });
}
