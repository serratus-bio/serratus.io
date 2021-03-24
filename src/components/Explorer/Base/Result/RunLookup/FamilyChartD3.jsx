/* eslint-disable no-unused-vars */
import React from "react";
import * as d3 from 'd3';

import {
    cvgCartoonMap,
    genomeBins,
    colorMap,
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
} from '../ChartHelpers';

const chartId = "runChart"

const RunChart = () => {
    return <div id={chartId} />
}

export default RunChart;

const familyNameKey = "family_id"
const familyCoverageKey = "coverage_bins"

export const renderChart = (results, colMap, d3InterpolateFunction, loadSecondChart) => {
    var chartSvg = d3.select(`#${chartId}`)
        .append("svg")
        .attr("viewBox", `0 0 750 700`);
    var familiesSvg = chartSvg.append("svg")
        .attr("y", tableShiftY);

    drawLegend(familiesSvg, d3InterpolateFunction);

    var columnTooltipSvgText = chartSvg.append("text").attr("id", "tooltip");
    var columnHeadersG = chartSvg.append("g")
        .attr("transform", `translate(0, ${tableShiftY - sectionHeight})`);
    addHeaders(columnHeadersG);
    addColumns(columnHeadersG, colMap);

    results.forEach((family, i) => {
        var familyG = familiesSvg.append("g")
            .attr("class", "family")
            .attr("rowid", `${family[familyNameKey]}`);
        drawExpandableRow({
            gElement: familyG,
            name: family[familyNameKey],
            rowType: "family",
            coverageData: getCoverageData(family, familyCoverageKey),
            rowIndex: i,
            d3InterpolateFunction: d3InterpolateFunction,
            loadSecondChart: loadSecondChart,
        });
        addColumns(familyG.select("svg"), colMap, family);
    });
}

function drawExpandableRow({gElement, name, rowType, coverageData, rowIndex, d3InterpolateFunction, loadSecondChart}) {
    var entrySvg = gElement.append("svg")
        .attr("y", rowIndex * sectionHeight)
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

    var y = d3.scaleBand()
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
            var link = `${window.location.pathname}?${rowType}=${name}`;
            var textWidth = 100;
            var textHeight = 14;
            var linkA = d3.select(this.parentNode)
                .append("a")
                .attr("xlink:href", link)
            linkA.append("rect")
                .attr("x", -textWidth)
                .attr("y", -8)
                .attr("width", textWidth)
                .attr("height", textHeight)
                .attr("fill", "black")
                .style("opacity", 0)
        });

    var heatMap = entryG.append("g")
        .attr("class", "heatmap");

    var heatSquares = heatMap.selectAll()
        .data(coverageData)
        .enter()
        .append("rect")
        .attr("x", d => x(d.bin))
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .style("fill", d => colorMap(cvgCartoonMap[d.cartoonChar], d3InterpolateFunction))

    var barBorderPath = entryG
        .append("rect")
        .attr("class", "heatmap-border")
        .attr("width", barWidth)
        .attr("height", barHeight)
        .style("fill", "none")
        .style("stroke", barBorder.color)
        .style("stroke-width", barBorder.size);

    var clickExpandRect = entryG.append("rect")
        .attr("class", "heatmap-click")
        .attr("visibility", "visible")
        .attr("width", barWidth)
        .attr("height", barHeight)
        .style("opacity", 0)
        .style('cursor', 'pointer').on("click", () => loadSecondChart(name));
}
