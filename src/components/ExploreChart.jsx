import React from "react";
import * as d3 from 'd3';

const chartId = "chart"

export default () => {
    return <div id={chartId} className="py-2" />
}


// D3 CODE BELOW

// data-specific
const xColumn = "pctid";
const yColumn = "n";
const zColumn = "score";
const zColorLims = ["#3d5088", "#fce540"];
const xLabel = "% Identity";
const zLabel = "Count";

// initial value determined by renderChart, then updated by functions
var xLims;
var zLims;

// auto-computed
var yLims = [0, 0];  // computed after family data loaded
var zDomainValues;  // all possible z values
var familyData;  // data set by renderChart

// D3 objects
var xScale;
var yScale;
var xAxis;
var yAxis;
var chart;
var dataByZStackFiltered;
var areaGen;

export const renderChart = (data, xDomain, zDomain) => {
    familyData = data;
    xLims = xDomain;
    zLims = zDomain;
    zDomainValues = Array(zLims[1] - zLims[0] + 1).fill(zLims[0]).map((x, y) => x + y);

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

    xScale = d3.scaleLinear()
        .range([0, chartWidth]);
    xScale.domain(xDomain);
    yScale = d3.scaleLinear()
        .range([chartHeight, 0]);
    yScale.domain(yLims).nice();
    var colorScale = d3.scaleLinear()
        .range(zColorLims);
    colorScale.domain(zDomain);

    xAxis = chartG.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .attr("class", "x-axis");
    xAxis.call(d3.axisBottom(xScale).ticks(10));

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

    areaGen = d3.area()
        .x((d) => xScale(d.data.key))
        .y0((d) => yScale(d[0]))
        .y1((d) => yScale(d[1]));

    chart = chartG.selectAll(".areas")
        .data(dataByZStackFiltered)
        .join("path")
        .attr("d", areaGen)
        .attr("fill", (d) => colorScale(d.key));
}

export const updateData = (data) => {
    familyData = data;
    dataByZStackFiltered = getDataByZStack(data);
}

export const updateXLims = (begin, end) => {
    xLims = [begin, end];
    xScale.domain(xLims);
    var rangeLen = end - begin;
    var nTicks = (rangeLen < 10) ? rangeLen : 10;  // limit to whole numbers
    xAxis.call(d3.axisBottom(xScale).ticks(nTicks));
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

    if (transitionDuration === 0) {
        chart.data(dataByZStackFiltered)
            .attr("d", areaGen);
    }
    else {
        chart.data(dataByZStackFiltered).transition().duration(transitionDuration)
            .attr("d", areaGen);
    }
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
