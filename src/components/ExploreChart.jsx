import React from "react";
import * as d3 from 'd3';

export const ExploreChart = (props) => {
    const [chartLoaded, setChartLoaded] = React.useState(false);

    familyData = props.data;
    // initial values from .current
    xLims = props.sliderIdentityLimsRef.current;
    zLims = props.sliderCoverageLimsRef.current;
    zDomain = Array(zLims[1] - zLims[0] + 1).fill(zLims[0]).map((x, y) => x + y);

    React.useEffect(() => {
        if (!chartLoaded) {
            drawExploreFamilyChart(props.data);
            updateYLims();
            setChartLoaded(true);
        }
    }, [chartLoaded, props.data]);

    updateChart = (transitionDuration = 0) => {
        console.log("updateChart()");
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

    return (
        <div id="chart" className="py-2" />
    )
}

const xColumn = "pctid";
const yColumn = "n";
const zColumn = "score";

var chart;
var dataByZStackFiltered;
var areaGen;

var familyData;
var xLims;
var zLims;
var zDomain;

export var updateXLims;
export var updateZLims;
export var updateYLims;
export var updateChart;

export const drawExploreFamilyChart = (data) => {
    console.log("drawExploreFamilyChart()");

    var chartWidth = 300;
    var chartHeight = 150;
    var margin = { top: 10, right: 10, bottom: 33, left: 60 };

    var yLims = [0, 0]; // computed after family data loaded

    var zColorLims = ["#3d5088", "#fce540"];
    var xScale = d3.scaleLinear()
        .range([0, chartWidth]);
    var yScale = d3.scaleLinear()
        .range([chartHeight, 0]);
    var colorScale = d3.scaleLinear()
        .range(zColorLims);

    var mainDiv = d3.select("#chart");

    var svgWidth = chartWidth + margin.left + margin.right;
    var svgHeight = chartHeight + margin.top + margin.bottom;
    var chartSvg = mainDiv
        .append("svg")
        .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`);
    var entryG = chartSvg.append("g")
        .attr("width", chartWidth)
        .attr("height", chartHeight)
        .attr("transform",
            `translate(${margin.left}, ${margin.top})`);

    var xAxis = entryG.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .attr("class", "x-axis");
    var yAxis = entryG.append("g")
        .attr("class", "y-axis");

    updateXLims = (begin, end) => {
        console.log("updateXLims()");
        xLims = [begin, end];
        var rangeLen = end - begin;
        var nTicks = (rangeLen < 10) ? rangeLen : 10;
        xScale.domain(xLims);
        xAxis.call(d3.axisBottom(xScale).ticks(nTicks));
        updateChart();
    }

    updateZLims = (begin, end) => {
        zLims = [begin, end];
        updateChart();
    }

    updateYLims = (transitionDuration = 0) => {
        console.log("updateYLims()");
        var maxDataY = 1.2 * d3.max(dataByZStackFiltered.map(function (d) {
            return d3.max(d, function (innerD) {
                return innerD[1];
            });
        }));
        yLims = [0, maxDataY];
        yScale.domain(yLims).nice();
        yAxis.transition().duration(transitionDuration).call(d3.axisLeft(yScale).ticks(5));
        updateChart(transitionDuration);
    }

    xScale.domain(xLims);
    yScale.domain(yLims).nice();
    colorScale.domain(zLims);
    xAxis.call(d3.axisBottom(xScale).ticks(10));
    yAxis.call(d3.axisLeft(yScale).ticks(5));
    entryG.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -(margin.left - 15))
        .attr("x", - chartHeight / 2)
        .attr("font-size", "12px")
        .attr("fill", "currentColor")
        .style("text-anchor", "middle")
        .attr("opacity", 1)
        .text("Count");
    entryG.append("text")
        .attr("y", chartHeight + margin.bottom - 3)
        .attr("x", chartWidth / 2)
        .attr("font-size", "12px")
        .attr("fill", "currentColor")
        .style("text-anchor", "middle")
        .attr("opacity", 1)
        .text("% Identity");

    dataByZStackFiltered = getDataByZStack(data);

    areaGen = d3.area()
        .x((d) => xScale(d.data.key))
        .y0((d) => yScale(d[0]))
        .y1((d) => yScale(d[1]));

    chart = entryG.selectAll(".areas")
        .data(dataByZStackFiltered)
        .join("path")
        .attr("d", areaGen)
        .attr("fill", (d) => colorScale(d.key));
}

function getDataByZStack(dataFiltered) {
    console.log("getDataByZStack()");
    var dataByX = d3.nest()
        .key(function (d) { return d[xColumn]; })
        .entries(dataFiltered);
    dataByX.forEach((d) => {
        d.values = d.values.reduce((collection, d) => {
            collection[d[zColumn]] = d[yColumn];
            return collection;
        }, {});
        d.ZtoY = {}
        zDomain.forEach(z => {
            d.ZtoY[z] = d.values[z] ? d.values[z] : 0;
        })
    });

    return d3.stack()
        .keys(zDomain)
        .order(d3.stackOrderReverse)
        .value((d, key) => d.ZtoY[key])(dataByX);
}
