/* eslint-disable no-unused-vars */
import React from "react";
import * as d3 from 'd3';

import {
    cvgCartoonMap,
    genomeBins,
    colorMap,
    colMap,
    sectionMargin,
    sectionWidth,
    sectionHeight,
    tableShiftY,
    barWidth,
    barHeight,
    barBorder,
    drawLegend,
    addHeaders,
    addColumns,
    getCoverageData,
} from './ChartHelpers';

const chartId = "familyChart"

const sraKey = "sra_id"

export default () => {
    return <div id={chartId} />
}

export const renderChart = (results, columns) => {
    var chartSvg = d3.select(`#${chartId}`)
        .append("svg")
        .attr("viewBox", `0 0 750 500`);
    var matchSvg = chartSvg.append("svg")
        .attr("y", tableShiftY);

    drawLegend(matchSvg);

    var columnTooltipSvgText = chartSvg.append("text").attr("id", "tooltip");
    var columnHeadersG = chartSvg.append("g")
        .attr("transform", `translate(0, ${tableShiftY - sectionHeight})`);
    addHeaders(columnHeadersG);
    addColumns(columnHeadersG, columns, colMap);

    results.forEach((match, i) => {
        var coverageData = getCoverageData(match);
        var matchG = matchSvg.append("g")
            .attr("class", "sra")
            .attr("rowid", `${match[sraKey]}`);
        var matchSubGroup = drawExpandableRow(matchG, match[sraKey], "match", coverageData, i);
        addColumns(matchG.select("svg"), columns, colMap, match);
    });
}

function drawExpandableRow(gElement, name, dataBin, heatSquareData, rowIndex) {
    var y = rowIndex * sectionHeight;
    var entrySvg = gElement.append("svg")
        .attr("y", y)
        .attr("width", sectionWidth)
        .attr("height", sectionHeight)
        .attr("border", barBorder.size)
        .style("display", "block")

    var entryG = entrySvg.append("g")
        .attr("transform",
            `translate(${sectionMargin.left}, ${sectionMargin.top})`);

    var x = d3.scaleBand()
        .range([0, barWidth])
        .domain(genomeBins)
        .padding(0.01);

    y = d3.scaleBand()
        .range([0, barHeight])
        .domain([name])
        .padding(0.01);
    var yAxis = entryG.append("g")
        .call(d3.axisLeft(y));
    yAxis.select("path").remove();
    yAxis.select("line").remove();
    yAxis.selectAll("text")
        .style("font-size", 12)
        .style("fill", "blue")
        .style('cursor', 'pointer')
        .each(function (d, i) {
            var link = `/explorer?run=${name}`;
            var offsetX = 0
            var textWidth = 80;
            var textHeight = 14;
            d3.select(this.parentNode)
                .append("a")
                .attr("xlink:href", link)
                .append("rect")
                .attr("x", offsetX - textWidth)
                .attr("y", -8)
                .attr("width", textWidth)
                .attr("height", textHeight)
                .attr("fill", "black")
                .style("opacity", 0)
        });

    var heatBar = entryG.append("g")
        .attr("class", "heatbar");

    var heatSquares = heatBar.selectAll()
        .data(heatSquareData)
        .enter()
        .append("rect")
        .attr("x", d => x(d.bin))
        .attr("y", d => y(d[dataBin]))
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .style("fill", d => colorMap(cvgCartoonMap[d.cartoonChar]))

    var barBorderPath = entryG
        .append("rect")
        .attr("width", barWidth)
        .attr("height", barHeight)
        .style("fill", "none")
        .style("stroke", barBorder.color)
        .style("stroke-width", barBorder.size);

    var heatmapCover = entryG
        .append("rect")
        .attr("width", barWidth)
        .attr("height", barHeight)
        .attr("class", "heatmap-cover")
        .style("opacity", 0)
        .style("fill", "#000");
}
