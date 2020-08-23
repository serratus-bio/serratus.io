import React from "react";
import * as d3 from 'd3';

const chartId = "chart"

export default () => {
    return <div id={chartId} />
}


// D3 CODE BELOW

// data-specific
const xColumn = "pctid";
const yColumn = "n";
const zColumn = "score";
const zColorLims = ["#3d5088", "#fce540"];
const xLabel = "% Identity";
const zLabel = "Hit count";

// initial value determined by renderChart, then updated by functions
var xLims;
var zLims;
var familyData;

// auto-computed
var yLims = [0, 6000];  // computed after family data loaded
var xLimValues; // all x values
var zDomainValues;  // all possible z values

// D3 objects
var xScale;
var yScale;
var xAxis;
var yAxis;
var chart;
var dataByZStackFiltered;
// var areaGen;
var chartRects;

export const renderChart = (data, xDomain, zDomain) => {
    familyData = data;
    setXLims(xDomain);
    zLims = zDomain;
    zDomainValues = getAllValues(...zLims);

    var chartWidth = 300;
    var chartHeight = 150;
    var margin = { top: 10, right: 10, bottom: 33, left: 60 };
    var svgWidth = chartWidth + margin.left + margin.right;
    var svgHeight = chartHeight + margin.top + margin.bottom;

    var mainDiv = d3.select(`#${chartId}`);
    var mainSvg = mainDiv
        .append("svg")
        .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`);
    var chartG = mainSvg.append("g")
        .attr("width", chartWidth)
        .attr("height", chartHeight)
        .attr("transform",
            `translate(${margin.left}, ${margin.top})`);

    xScale = d3.scaleBand()
        .range([0, chartWidth]);
    xScale.domain(xLimValues);
    yScale = d3.scaleLinear()
        .range([chartHeight, 0]);
    yScale.domain(yLims).nice();
    var colorScale = d3.scaleLinear()
        .range(zColorLims);
    colorScale.domain(zDomain);

    xAxis = chartG.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .attr("class", "x-axis");
    xAxis.call(d3.axisBottom(xScale).tickValues(getXTicks()));

    yAxis = chartG.append("g")
        .attr("class", "y-axis");

    chartG.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -(margin.left - 15))
        .attr("x", - chartHeight / 2)
        .attr("font-size", "12px")
        .attr("fill", "currentColor")
        .style("text-anchor", "middle")
        .attr("opacity", 1)
        .text(zLabel);
    chartG.append("text")
        .attr("y", chartHeight + margin.bottom - 3)
        .attr("x", chartWidth / 2)
        .attr("font-size", "12px")
        .attr("fill", "currentColor")
        .style("text-anchor", "middle")
        .attr("opacity", 1)
        .text(xLabel);

    dataByZStackFiltered = getDataByZStack(data);

    // var maxDataY = 1.2 * d3.max(dataByZStackFiltered.map((d) => {
    //     return d3.max(d, (innerD) => {
    //         return innerD[1];
    //     });
    // }));

    // yLims = [0, maxDataY];
    // yScale.domain(yLims).nice();
    // yAxis.call(d3.axisLeft(yScale).ticks(5));

    // areaGen = d3.area()
    //     .x((d) => xScale(d.data.key))
    //     .y0((d) => yScale(d[0]))
    //     .y1((d) => yScale(d[1]));

    // chart = chartG.selectAll(".areas")
    //     .data(dataByZStackFiltered)
    //     .join("path")
    //     .attr("d", areaGen)
    //     .attr("fill", (d) => colorScale(d.key));

    chartRects = chartG.selectAll("g")
        .data(dataByZStackFiltered)
        .enter()
        .append("g")
        .attr("fill", d => colorScale(d.key));

    chart = chartRects.selectAll("rect")
        .data(d => d)
        .join("rect")
        .attr("x", (d, i) => xScale(d.data.key))
        .attr("y", d => yScale(d[1]))
        .attr("height", d => yScale(d[0]) - yScale(d[1]))
        .attr("width", xScale.bandwidth());
}

export const updateData = (data) => {
    familyData = data;
    dataByZStackFiltered = getDataByZStack(data);
}

export const updateXLims = (begin, end) => {
    setXLims([begin, end]);
    xScale.domain(xLimValues);
    xAxis.call(d3.axisBottom(xScale).tickValues(getXTicks()));
    updateStacks();
}

export const updateZLims = (begin, end) => {
    zLims = [begin, end];
    updateStacks();
}

export const updateYLims = (transitionDuration = 0) => {
    var maxDataY = 1.2 * d3.max(dataByZStackFiltered.map((d) => {
        return d3.max(d, (innerD) => {
            return innerD[1];
        });
    }));
    yLims = [0, maxDataY];
    yScale.domain(yLims).nice();
    yAxis.transition().duration(transitionDuration).call(d3.axisLeft(yScale).ticks(5));
    updateStacks(transitionDuration);
}

const updateStacks = (transitionDuration = 0) => {
    var dataFiltered = familyData.filter((d) => {
        return (
            (d[xColumn] >= xLims[0]) &&
            (d[xColumn] <= xLims[1]) &&
            (d[zColumn] >= zLims[0]) &&
            (d[zColumn] <= zLims[1])
        );
    });

    dataByZStackFiltered = getDataByZStack(dataFiltered);

    chartRects.data(dataByZStackFiltered);

    chart.attr("x", (d, i) => xScale(d.data.key))
        .attr("y", d => yScale(d[1]))
        .attr("height", d => yScale(d[0]) - yScale(d[1]))
        .attr("width", xScale.bandwidth());

    // if (transitionDuration === 0) {
    //     chart.data(dataByZStackFiltered)
    //         .attr("d", areaGen);
    // }
    // else {
    //     chart.data(dataByZStackFiltered).transition().duration(transitionDuration)
    //         .attr("d", areaGen);
    // }
}

const getDataByZStack = (dataFiltered) => {
    var dataByX = d3.nest()
        .key((d) => d[xColumn])
        .entries(dataFiltered);
    dataByX.forEach((d) => {
        d.values = d.values.reduce((collection, d) => {
            collection[d[zColumn]] = d[yColumn];
            return collection;
        }, {});
        d.ZtoY = {}
        zDomainValues.forEach(z => {
            d.ZtoY[z] = d.values[z] ? d.values[z] : 0;
        })
    });

    return d3.stack()
        .keys(zDomainValues)
        .order(d3.stackOrderReverse)
        .value((d, key) => d.ZtoY[key])(dataByX);
}

const getAllValues = (begin, end) => {
    return Array(end - begin + 1).fill(begin).map((x, y) => x + y);
}

const setXLims = (newXLims) => {
    xLims = newXLims;
    xLimValues = getAllValues(...newXLims);
}

const getXTicks = () => {
    if (xLimValues.length < 10) {
        return xLimValues;
    }
    return xLimValues.filter((d, i) => {
        if ((xLimValues[0] + i) % 2 === 0) {
            return true;
        }
        return false;
    });
}
