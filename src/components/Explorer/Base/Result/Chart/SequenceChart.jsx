import React from "react";
import * as d3 from 'd3';
import {
    sectionHeight as rowHeight,
    tableShiftY,
    drawLegend,
    addHeaders,
    addColumns,
} from './ChartHelpers';
import { SequenceMatch } from '../Chart/SequenceMatch'

export class SequenceChart {
    constructor(chartId, colMap, d3InterpolateFunction) {
        this.chartId = chartId;
        this.colMap = colMap;
        this.d3InterpolateFunction = d3InterpolateFunction;
        this.component = <div id={this.chartId} />;
    }

    render(results) {
        var rootSvg = d3.select(`#${this.chartId}`)
            .append("svg")
            .attr("viewBox", `0 0 750 400`);
        this.sequencesSvg = rootSvg.append("svg")
            .attr("y", tableShiftY);

        drawLegend(this.sequencesSvg, this.d3InterpolateFunction);

        var columnHeadersG = rootSvg.append("g")
            .attr("transform", `translate(0, ${tableShiftY - rowHeight})`);
        addHeaders(columnHeadersG);

        // stats headers, tooltip
        rootSvg.append("text").attr("id", "tooltip");
        addColumns(columnHeadersG, this.colMap);

        this.addRows(results);
    }

    addRows(results) {
        results.forEach((sequence, i) => {
            const match = new SequenceMatch(this.sequencesSvg, sequence, i, this.colMap, this.d3InterpolateFunction);
            match.addLinkAndHeatmap();
            match.addStats();
            match.addJBrowseIcon();
        });
    }
}