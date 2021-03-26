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
    constructor(chartId) {
        this.chartId = chartId
        this.component = <div id={this.chartId} />
    }

    render(results, colMap, d3InterpolateFunction) {
        var rootSvg = d3.select(`#${this.chartId}`)
            .append("svg")
            .attr("viewBox", `0 0 750 400`);
        this.sequencesSvg = rootSvg.append("svg")
            .attr("y", tableShiftY);

        drawLegend(this.sequencesSvg, d3InterpolateFunction);

        var columnTooltipSvgText = rootSvg.append("text").attr("id", "tooltip");
        var columnHeadersG = rootSvg.append("g")
            .attr("transform", `translate(0, ${tableShiftY - rowHeight})`);
        addHeaders(columnHeadersG);
        addColumns(columnHeadersG, colMap);

        this.addRows(results, colMap, d3InterpolateFunction);
    }

    addRows(results, colMap, d3InterpolateFunction) {
        results.forEach((sequence, i) => {
            const match = new SequenceMatch(this.sequencesSvg, sequence, i, colMap, d3InterpolateFunction);
            match.addLinkAndHeatmap();
            match.addStats();
            match.addJBrowseIcon();
        });
    }
}